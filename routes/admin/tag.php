<?php
Route::post('/tag/get', 'App\Http\Controllers\Admin\TagController@get');
Route::post('/tag/store', 'App\Http\Controllers\Admin\TagController@store');
Route::post('/tag/edit', 'App\Http\Controllers\Admin\TagController@edit');
Route::post('/tag/delete', 'App\Http\Controllers\Admin\TagController@delete');
