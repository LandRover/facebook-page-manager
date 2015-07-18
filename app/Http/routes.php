<?php

/**
 * Application Routes
 * 
*/

Route::get('/', [
    'as' => 'GOTO_HOMEPAGE',
    'uses' => 'IndexController@index'
]);

Route::get('/login', 'LoginController@fbLogin'); // regular login, creates user if doesnt exist.
Route::get('/join/{userHash}', 'LoginController@fbLogin'); // agent join, hash is required.

