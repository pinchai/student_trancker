<?php
Route::post('/telegram_bot/get','App\Http\Controllers\Admin\TelegramBotController@get');
Route::post('/telegram_bot/store','App\Http\Controllers\Admin\TelegramBotController@store');
Route::post('/telegram_bot/update','App\Http\Controllers\Admin\TelegramBotController@update');
Route::post('/telegram_bot/delete','App\Http\Controllers\Admin\TelegramBotController@delete');
Route::post('/telegram_bot/sendTest','App\Http\Controllers\Admin\TelegramBotController@sendTest');
