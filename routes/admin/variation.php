<?php
Route::post('/variation/get', 'App\Http\Controllers\Admin\VariationController@get');
Route::post('/variation/store', 'App\Http\Controllers\Admin\VariationController@store');
Route::post('/variation/edit', 'App\Http\Controllers\Admin\VariationController@edit');
Route::post('/variation/delete', 'App\Http\Controllers\Admin\VariationController@delete');
