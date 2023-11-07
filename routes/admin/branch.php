<?php
Route::post('/branch/get','App\Http\Controllers\Admin\BranchController@get');
Route::post('/branch/store','App\Http\Controllers\Admin\BranchController@store');
Route::post('/branch/edit','App\Http\Controllers\Admin\BranchController@edit');
Route::post('/branch/delete','App\Http\Controllers\Admin\BranchController@delete');
Route::post('/branch/print','App\Http\Controllers\Admin\BranchController@print');
Route::post('/branch/excel','App\Http\Controllers\Admin\BranchController@downloadListExcel');

Route::post('/branch/upload_images','App\Http\Controllers\Admin\BranchController@uploadImages');
Route::post('/branch/delete_images','App\Http\Controllers\Admin\BranchController@deleteImages');
