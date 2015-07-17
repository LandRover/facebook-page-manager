<?php namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

/**
 * User model class
 *
 * Represents the User states
 */
class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;
    
    const CREATED_AT = 'dateCreated';
    const UPDATED_AT = 'dateUpdated';
    
    protected $table = 'User';
    protected $primaryKey = 'userID';
    protected $guarded = ['userID', 'lastLogin'];
    protected $dates = ['dateCreated', 'dateUpdated', 'lastLogin'];
    
    
    /**
     * Encode and store hash, based on fbID
     * 
     * @return this
     */
    public function userHash()
    {
        $this->userHash = md5(md5($this->fbID));
        
        return $this;
    }
    
    
    /**
     * Finds user based on facebook userid.
     *
     * @param string $ID
     * @return User/null
     */
    public static function getByFB($ID)
    {
        return User::where('fbID', '=', $ID)->first();
    }
    
    
    /**
     * Finds user based on hash
     * 
     * @param string $userHash
     * @return User/null
     */
    public static function getByHash($userHash)
    {
        return User::where('userHash', '=', $userHash)->first();
    }
}