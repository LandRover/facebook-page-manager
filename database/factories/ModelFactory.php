<?php

use App\Utils\Definitions;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
*/

/**
 * User Object factory model, generates default values for quickly testing the DB.
 */
$factory->define(App\Models\User::class, function ($faker) {
    return [
        'fbID' => int_random(10),
        'userHash' => md5(str_random(10)),
        'name' => $faker->name,
        'email' => $faker->email,
        'userType' => Definitions::USER_TYPE_MEMBER,
        'enabled' => true
    ];
});


/**
 * Agent Object factory model, generates default Agent object in the DB
 *
 * @todo agentOf should be dynamicly assigned for the User
 */
$factory->define(App\Models\Agent::class, function ($faker) {
    return [
        'agentOf' => 1,
        'fbID' => int_random(10),
        'accessToken' => md5(str_random(10)) . md5(str_random(10)),
        'name' => $faker->name,
        'email' => $faker->email,
        'gender' => 'male',
        'age' => int_random(2),
        'enabled' => true
    ];
});