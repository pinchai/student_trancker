<?php
Route::post('/score/get','App\Http\Controllers\Admin\ScoreController@get');
Route::post('/score/store','App\Http\Controllers\Admin\ScoreController@store');
Route::post('/score/setToAll','App\Http\Controllers\Admin\ScoreController@setScoreToAll');
Route::post('/score/edit','App\Http\Controllers\Admin\ScoreController@edit');
Route::post('/score/delete','App\Http\Controllers\Admin\ScoreController@delete');
Route::post('/score/update_student_score','App\Http\Controllers\Admin\ScoreController@updateStudentScore');
Route::post('/score/update_student_full_score','App\Http\Controllers\Admin\ScoreController@updateStudentFullScore');
