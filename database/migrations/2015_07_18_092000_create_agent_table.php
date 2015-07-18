<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Models\Agent;

class CreateAgentTable extends Migration
{
    private $tableName = 'Agent';
    
    
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable($this->tableName)) return;
        
        Schema::create($this->tableName, function(Blueprint $table)
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

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop($this->tableName);
    }
}
