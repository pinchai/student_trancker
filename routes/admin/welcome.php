<?php
//Get View
Route::get('/welcome', function () {
    return view('pages.welcome');
})->name('welcome');
