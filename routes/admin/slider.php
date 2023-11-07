<?php
Route::post('/slider/get','App\Http\Controllers\Admin\SliderController@get');
Route::post('/slider/store','App\Http\Controllers\Admin\SliderController@store');
Route::post('/slider/edit','App\Http\Controllers\Admin\SliderController@edit');
Route::post('/slider/delete','App\Http\Controllers\Admin\SliderController@delete');

Route::post('/slider/upload_images','App\Http\Controllers\Admin\SliderController@uploadImages');
Route::post('/slider/delete_images','App\Http\Controllers\Admin\SliderController@deleteImages');
