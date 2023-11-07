<?php
Route::post('/product_category/get', 'App\Http\Controllers\Admin\ProductCategoryController@get');
Route::post('/product_category/store', 'App\Http\Controllers\Admin\ProductCategoryController@store');
Route::post('/product_category/edit', 'App\Http\Controllers\Admin\ProductCategoryController@edit');
Route::post('/product_category/delete', 'App\Http\Controllers\Admin\ProductCategoryController@delete');
