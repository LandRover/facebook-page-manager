<?php

use App\Models\Agent;
use App\Utils\Definitions;
use Illuminate\Database\Seeder;

class AgentTableSeeder extends Seeder
{
    private $agentTable = 'Agent';
    
    
    /**
     * Generates initial table data for Agent. Cleans up the table prior to adding.
     * Used only for development mode.
     *
     * @todo Prevent running if debug = false!
     * @return void
     */
    public function run()
    {
        DB::table($this->agentTable)->truncate();
        
        $fbUserID = rand(1111111111, 9999999999);
        
        Agent::create([
            'fbID' => $fbUserID,
            'agentOf' => 1,
            'accessToken' => md5($fbUserID) . md5($fbUserID),
            'name' => 'Agent Generated',
            'email' => 'agent.generated@gmail-sample-777.com',
            'gender' => 'male',
            'age' => rand(16,99),
            'enabled' => true
        ]);
    }
}