<?php
Route::post('/product_unit_variation/get', 'App\Http\Controllers\Admin\ProductUnitVariationController@get');
Route::post('/product_unit_variation/getByFilter', 'App\Http\Controllers\Admin\ProductUnitVariationController@getByFilter');
Route::post('/product_unit_variation/store', 'App\Http\Controllers\Admin\ProductUnitVariationController@store');
Route::post('/product_unit_variation/edit', 'App\Http\Controllers\Admin\ProductUnitVariationController@edit');
Route::post('/product_unit_variation/delete', 'App\Http\Controllers\Admin\ProductUnitVariationController@delete');
Route::post('/product_unit_variation/getDetailByFilter', 'App\Http\Controllers\Admin\ProductUnitVariationController@getDetailByFilter');
