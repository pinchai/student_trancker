<?php
Route::post('/transaction_reference_file/get','App\Http\Controllers\Admin\TransactionReferenceFileController@get');
Route::post('/transaction_reference_file/store','App\Http\Controllers\Admin\TransactionReferenceFileController@store');
Route::post('/transaction_reference_file/delete','App\Http\Controllers\Admin\TransactionReferenceFileController@delete');
