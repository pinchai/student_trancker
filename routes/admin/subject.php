<?php
Route::post('/subject/get','App\Http\Controllers\Admin\SubjectController@get');
Route::post('/subject/store','App\Http\Controllers\Admin\SubjectController@store');
Route::post('/subject/edit','App\Http\Controllers\Admin\SubjectController@edit');
Route::post('/subject/delete','App\Http\Controllers\Admin\SubjectController@delete');
