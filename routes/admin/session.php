<?php
Route::post('/session/get','App\Http\Controllers\Admin\SessionController@get');
Route::post('/session/store','App\Http\Controllers\Admin\SessionController@store');
Route::post('/session/edit','App\Http\Controllers\Admin\SessionController@edit');
Route::post('/session/delete','App\Http\Controllers\Admin\SessionController@delete');
