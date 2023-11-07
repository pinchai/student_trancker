<?php
Route::post('/employee/get','App\Http\Controllers\Admin\EmployeeController@get');
Route::post('/employee/store','App\Http\Controllers\Admin\EmployeeController@store');
Route::post('/employee/edit','App\Http\Controllers\Admin\EmployeeController@edit');
Route::post('/employee/delete','App\Http\Controllers\Admin\EmployeeController@delete');
