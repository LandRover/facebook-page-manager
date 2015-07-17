<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Session;

class IndexController extends Controller
{
    /**
     * Generates homepage
     * 
     * @todo Should be redesigned completely... tmp.
     * @return Response
     */
    public function index()
    {
        $userID = null;
        $agentID = null;
        
        if (Session::has('agentID'))
        {
            $agentID = Session::get('agentID');
            
            return view('agent'); //AGENT ACCESS GRANTED
        } else
        if (Session::has('userID') && Session::get('agentID'))
        {
            $userID = Session::get('userID');
            $agentID = Session::get('agentID');
            //$userConfig = \App\UserConfig::where('UserID', $userID)->first();
            
            return view('app'); // admin panel.
        }
        
        return view('welcome');
    }
}