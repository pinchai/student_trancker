<?php
Route::post('/brand/get', 'App\Http\Controllers\Admin\BrandController@get');
Route::post('/brand/store', 'App\Http\Controllers\Admin\BrandController@store');
Route::post('/brand/edit', 'App\Http\Controllers\Admin\BrandController@edit');
Route::post('/brand/delete', 'App\Http\Controllers\Admin\BrandController@delete');
