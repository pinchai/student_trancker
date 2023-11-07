<?php
Route::post('/position/get','App\Http\Controllers\Admin\PositionController@get');
Route::post('/position/store','App\Http\Controllers\Admin\PositionController@store');
Route::post('/position/update','App\Http\Controllers\Admin\PositionController@update');
Route::post('/position/delete','App\Http\Controllers\Admin\PositionController@delete');
