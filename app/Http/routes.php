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

Route::group(['prefix' => 'dbimport'], function() {
    Route::get('/', [
        'as' => 'GOTO_DB_IMPORT',
        'uses' => 'DBImportController@createSchema'
    ]);
    
    Route::get('insert', [
        'as' => 'GOTO_DB_INSERT',
        'uses' => 'DBImportController@insertInitialData'
    ]);
});