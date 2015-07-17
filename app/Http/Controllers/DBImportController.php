<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

use App\Models\User;
use App\Models\Agent;
use App\Utils\Definitions;

/**
 * DB Structure importer class.
 *
 * Creates the schema and imports initial data. Should be called once.
 *
 * @todo Prevent public access from this object.
 */
class DBImportController extends Controller
{
    /**
     * Main entry point, generates the tables and schema
     *
     * @return Response
     */
    public function createSchema()
    {
        if (!Schema::hasTable('User'))
        {
            Schema::create('User', function($table)
            {
                $table->increments('userID');
                $table->string('fbID', 32)->default('');
                $table->string('userHash', 32)->default('');
                $table->string('name', 255)->default('');
                $table->string('email', 255)->default('');
                $table->integer('userType');
                $table->dateTime('lastLogin')->default('0000-00-00 00:00:00');
                $table->boolean('enabled');
                $table->index('userHash');
                $table->timestamp(User::CREATED_AT);
                $table->timestamp(User::UPDATED_AT);
            });
        }
        
        if (!Schema::hasTable('Agent'))
        {
            Schema::create('Agent', function($table)
            {
                $table->increments('agentID');
                $table->integer('agentOf')->unsigned();
                $table->foreign('agentOf')->references('userID')->on('User');
                $table->string('fbID', 255)->default('');
                $table->string('accessToken', 255)->default('');
                $table->string('name', 255)->default('');
                $table->string('email', 255)->default('');
                $table->string('gender', 255)->default('');
                $table->string('age', 255)->default('');
                $table->string('ageRange', 255)->default('');
                $table->boolean('enabled');
                $table->timestamp(Agent::CREATED_AT);
                $table->timestamp(Agent::UPDATED_AT);
            });
        }
        
        $this->insertInitialData();
        
        return redirect()->route('GOTO_HOMEPAGE');
    }
    
    
    /**
    * Insert initial data to the schema.
    */
    public function insertInitialData()
    {
        // Insert default user
        $User = new User;
        $User->userType = Definitions::USER_TYPE_MEMBER;
        $User->fbID = 1234567890;
        $User->name = 'Guest';
        $User->email = 'Guest@'.$_SERVER['SERVER_NAME'];
        $User->enabled = true;
        $User->userHash()
             ->save();
        
        // Agent
        $Agent = new Agent;
        $Agent->fbID = $User->fbID;
        $Agent->agentOf = $User->userID;
        $Agent->name = $User->name;
        $Agent->enabled = true;
        $Agent->save();
    }
}