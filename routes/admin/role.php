<?php
Route::post('/role/get','App\Http\Controllers\Admin\RoleController@get');
Route::post('/role/store','App\Http\Controllers\Admin\RoleController@store');
Route::post('/role/edit','App\Http\Controllers\Admin\RoleController@edit');
Route::post('/role/delete','App\Http\Controllers\Admin\RoleController@delete');
Route::post('role/get_by_user_type', 'App\Http\Controllers\Admin\RoleController@getByUserType');
Route::post('role/get_update', 'App\Http\Controllers\Admin\RoleController@getUpdate');
