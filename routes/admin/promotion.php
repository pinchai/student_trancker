<?php
Route::post('/promotion/get','App\Http\Controllers\Admin\PromotionController@get');
Route::post('/promotion/store','App\Http\Controllers\Admin\PromotionController@store');
Route::post('/promotion/edit','App\Http\Controllers\Admin\PromotionController@edit');
Route::post('/promotion/delete','App\Http\Controllers\Admin\PromotionController@delete');

Route::post('/promotion/upload_images','App\Http\Controllers\Admin\PromotionController@uploadImages');
Route::post('/promotion/delete_images','App\Http\Controllers\Admin\PromotionController@deleteImages');
