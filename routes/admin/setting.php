<?php
Route::post('/setting/get', 'App\Http\Controllers\Admin\SettingController@get');
Route::post('/setting/store', 'App\Http\Controllers\Admin\SettingController@store');
Route::post('/setting/edit', 'App\Http\Controllers\Admin\SettingController@edit');
Route::post('/setting/delete', 'App\Http\Controllers\Admin\SettingController@delete');
