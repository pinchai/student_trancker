<?php
Route::post('/unit/get', 'App\Http\Controllers\Admin\UnitController@get');
Route::post('/unit/store', 'App\Http\Controllers\Admin\UnitController@store');
Route::post('/unit/edit', 'App\Http\Controllers\Admin\UnitController@edit');
Route::post('/unit/delete', 'App\Http\Controllers\Admin\UnitController@delete');
