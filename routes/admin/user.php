<?php
Route::post('/user/get', 'App\Http\Controllers\Admin\UserController@get');
Route::post('/user/getForBackup', 'App\Http\Controllers\Admin\UserController@getForBackup');
Route::post('/user/store', 'App\Http\Controllers\Admin\UserController@store');
Route::post('/user/edit', 'App\Http\Controllers\Admin\UserController@edit');
Route::post('/user/update_profile', 'App\Http\Controllers\Admin\UserController@updateProfile');
Route::post('/user/delete', 'App\Http\Controllers\Admin\UserController@delete');
Route::post('/user/getUserPermissionData', 'App\Http\Controllers\Admin\UserController@getUserPermissionData');
