<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('home');
});


Route::group(array('prefix' => 'api/v1'), function() {
	Route::resource('painel', 'painel');
    Route::resource('receitas', 'receitas');
    Route::resource('despesas', 'despesas');
    Route::resource('servicos', 'servicos');
    Route::resource('clientes', 'clientes');
});


