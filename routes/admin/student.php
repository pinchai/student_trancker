<?php
Route::post('/student/get','App\Http\Controllers\Admin\StudentController@get');
Route::post('/student/getByGroupId','App\Http\Controllers\Admin\StudentController@getByGroupId');
Route::post('/student/store','App\Http\Controllers\Admin\StudentController@store');
Route::post('/student/import','App\Http\Controllers\Admin\StudentController@import');
Route::post('/student/edit','App\Http\Controllers\Admin\StudentController@edit');
Route::post('/student/delete','App\Http\Controllers\Admin\StudentController@delete');
Route::post('/student/delete_attendance','App\Http\Controllers\Admin\StudentController@deleteAttendance');
