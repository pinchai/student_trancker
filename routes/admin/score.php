<?php
Route::post('/score/get','App\Http\Controllers\Admin\ScoreController@get');
Route::post('/score/store','App\Http\Controllers\Admin\ScoreController@store');
Route::post('/score/edit','App\Http\Controllers\Admin\ScoreController@edit');
Route::post('/score/delete','App\Http\Controllers\Admin\ScoreController@delete');
