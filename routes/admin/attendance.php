<?php
Route::post('/attendance/get','App\Http\Controllers\Admin\AttendanceController@get');
Route::post('/attendance/store','App\Http\Controllers\Admin\AttendanceController@store');
Route::post('/attendance/edit','App\Http\Controllers\Admin\AttendanceController@edit');
Route::post('/attendance/delete','App\Http\Controllers\Admin\AttendanceController@delete');
