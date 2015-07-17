<?php namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Agent;
use App\Utils\Time;
use App\Utils\Definitions;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Libraries\FBAuthentication;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Request;

use App\Exceptions\FBRequestException;
use App\Exceptions\FBAuthenticationTokenException;
use App\Exceptions\FBAuthenticationTokenInvalidException;

use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;

/**
 * Login class is responsible for handling the logins - currently services only facebook logins.
 * for both Agent logins and User logins
 */
class LoginController extends Controller
{
    /**
     * Agent token refresh/signup and member login/signup are done via this login method.
     * Flow splits into 2 possible login options:
     * 
     * 1. Agent:
     *    When agent is referred to an entry link, which usually looks like: \\domain.com/join/team_id_md5_hash
     *    The flow in this case is:
     *      1. Find the hash's owener - userid
     *          * if hash not found - throws.
     *      2. Create new agent
     *      3. Store long lived token in the db
     * 
     * 2. Member: (Each member is also an Agent. An Agent of itself.)
     *      1. Hash is null - not an agent flow
     *      2. Token not found in the url
     *      3. User redirected to the loginUrl provided by the SDK
     *      4. After approval redirectd back to the same path and enters this method again with same params
     *          * Only this time _GET['code'] && _GET['state'] are not empty.
     *      5. Fetch data from the current logged in user from FB, retrives FBUserID and other params
     *      6. Update/Create new User and Agent with long lived token
     *
     * All actions evenutally redirect to the homepage (/)
     * 
     * @param LaravelFacebookSdk $fb
     * @param string/null $agentHash
     * @return Response
     */
    public function fbLogin(LaravelFacebookSdk $fb, $agentHash = null)
    {
        // only active on minimal login - join flow.
        if (!is_null($agentHash))
        {
            $Agent = User::getByHash($agentHash);
            
            if (is_null($Agent))
            {
                dd(['Hash not found', $agentHash]);
            }
        }
        
        $currentUrl = Request::path();
        $fbAuth = new FBAuthentication($fb);
        
        // extract token from url
        try
        {
            $accessToken = $fbAuth->getAccessTokenFromRedirect($currentUrl);
        } catch(FBAuthenticationTokenException $e)
        {
            //@todo add loggs
            // failed to auth
            return redirect('/')-with('message', array(
                'message' => 'auth failed',
                'type' => 'fatal'
            ));
        } catch(FBAuthenticationTokenInvalidException $e)
        {
            $loginUrl = $fb->getLoginUrl(
                Config::get('laravel-facebook-sdk.default_scope'),
                $currentUrl
            );
            
            return redirect()->to($loginUrl);
        }
        
        // extend token
        try
        {
            $accessToken = $fbAuth->extendAccessToken($accessToken);
        } catch(FBAuthenticationTokenException $e)
        {
            //@todo add loggs
            // failed to auth
            return redirect('/')-with('message', array(
                'message' => 'token failed',
                'type' => 'fatal'
            ));
        }
        
        $fb->setDefaultAccessToken($accessToken);
        
        // create user from FB object
        try
        {
            $fbUserObj = $fbAuth->getUser();
            
            $this->create([
                'fbID' => $fbUserObj->getProperty('id'),
                'name' => $fbUserObj->getProperty('name'),
                'email' => $fbUserObj->getProperty('email'),
                'gender' => $fbUserObj->getProperty('gender'),
                'ageRange' => $fbUserObj->getProperty('age_range'),
                'accessToken' => $accessToken
            ], $agentHash);
            
        } catch(FBRequestException $e)
        {
            //@todo add loggs
        }
        
        return redirect()->route('GOTO_HOMEPAGE');
    }

    
    /**
     * Creates user/agent from a FBUser object - updates if found in the local db.
     *
     * @param array $fbUser
     * @param string/null $agentHash
     */
    private function create($fbUser, $agentHash = null)
    {
        $User = $this->getUser($fbUser, $agentHash);
        $Agent = $this->getAgent($fbUser, $User->userID);
        
        // when agent not found, meaning it's a member - store it.
        if (is_null($agentHash))
            Session::put('userID', $User->userID);
        
        Session::put('agentID', $Agent->agentID);
    }
    
    
    /**
     * Getter for Agent.
     * Since 1 agent can be controlled from 2 diffrent members, in theory. Token should be
     * updated for all the fbIDs found in the system.
     *
     * @param array $fbUser
     * @param int $parentUserID
     * @return Agent instance
     */
    private function getAgent($fbUser, $parentUserID)
    {
        try
        {
            $Agent = Agent::getByFBUser($fbUser['fbID'], $parentUserID);
            
            if (!is_null($Agent))
            {
                // update token for all users
                Agent::where('fbID', $fbUser['fbID'])
                    ->update(['accessToken' => $fbUser['accessToken']]);
                
                return $Agent;
            }
            
            $Agent = new Agent;
            $Agent->agentOf = $parentUserID;
            $Agent->fbID = $fbUser['fbID'];
            $Agent->accessToken = $fbUser['accessToken'];
            $Agent->name = $fbUser['name'];
            $Agent->email = $fbUser['email'];
            $Agent->gender = $fbUser['gender'];
            $Agent->ageRange = $fbUser['ageRange'];
            $Agent->enabled = true;
            $Agent->save();
            
        } catch(\PDOException $e) {
            //@todo add loggs
        }
        
        return $Agent;
    }
    
    
    /**
     * Getter for User.
     * Extracts the user from the table or creates one from the $fbUser data
     *
     * @param array $fbUser
     * @param string/null $agentHash
     * @return Agent instance
     */
    private function getUser($fbUser, $agentHash = null)
    {
        // agent hash is detected, return the parent user. We do not store users for agents by design.
        if (!is_null($agentHash))
        {
            return User::getByHash($agentHash);
        }
        
        $User = User::getByFB($fbUser['fbID']);
        
        if (!is_null($User))
        {
            User::where('userID', $User->userID)
                ->update(['lastLogin' => Time::getDateTime()]);
            
            return $User;
        }
        
        try
        {
            $User = new User;
            $User->userType = Definitions::USER_TYPE_MEMBER;
            $User->fbID = $fbUser['fbID'];
            $User->name = $fbUser['name'];
            $User->email = $fbUser['email'];
            $User->lastLogin = Time::getDateTime();
            $User->enabled = true;
            $User->userHash()
                 ->save();
            
        } catch(\PDOException $e) {
            //@todo add loggs
        }
        
        return $User;
    }
}