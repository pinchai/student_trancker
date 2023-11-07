<?php
Route::post('/blog/get','App\Http\Controllers\Admin\BlogController@get');
Route::post('/blog/store','App\Http\Controllers\Admin\BlogController@store');
Route::post('/blog/edit','App\Http\Controllers\Admin\BlogController@edit');
Route::post('/blog/delete','App\Http\Controllers\Admin\BlogController@delete');

Route::post('/blog/upload_images','App\Http\Controllers\Admin\BlogController@uploadImages');
Route::post('/blog/delete_images','App\Http\Controllers\Admin\BlogController@deleteImages');
