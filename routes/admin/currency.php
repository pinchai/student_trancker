<?php
Route::post('/currency/get', 'App\Http\Controllers\Admin\CurrencyController@get');
Route::post('/currency/store', 'App\Http\Controllers\Admin\CurrencyController@store');
Route::post('/currency/update', 'App\Http\Controllers\Admin\CurrencyController@update');
Route::post('/currency/delete', 'App\Http\Controllers\Admin\CurrencyController@delete');
