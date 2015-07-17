<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Agent model class
 *
 * Represents the Agent states
 */
class Agent extends Model
{
    const CREATED_AT = 'dateCreated';
    const UPDATED_AT = 'dateUpdated';

    //
    protected $table = 'Agent';
    protected $primaryKey = 'agentID';
    protected $fillable = [];
    protected $dates = ['dateCreated', 'dateUpdated'];
    
    
    /**
     * Find agent by fbID and parent Agent UserID
     *
     * @param string $ID (Facebook's user is a string, yes)
     * @param int $userID
     * 
     * @return User/null
     */
    public static function getByFBUser($ID, $userID)
    {
        return Agent::where('fbID', '=', $ID)
            ->where('agentOf', '=', $userID)
            ->first();
    }
}