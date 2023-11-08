<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileManagerController;

//login
Route::get('/login', 'App\Http\Controllers\Admin\LoginController@index')->name('login');
Route::post('/do_login', 'App\Http\Controllers\Admin\LoginController@do_login')->name('do_login');
Route::get('/logout', 'App\Http\Controllers\Admin\LoginController@logout')->name('logout');

//error log viewer
Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);

Route::get('filemanager', [FileManagerController::class, 'index'])->middleware('auth');

//Admin block
Route::middleware('auth')->group(function () {
    include 'admin/welcome.php';
    include 'admin/dashboard.php';
    include 'admin/system.php';
    include 'admin/product_category.php';
    include 'admin/user.php';
    include 'admin/role.php';
    include 'admin/branch.php';
    include 'admin/brand.php';
    include 'admin/unit.php';
    include 'admin/variation.php';
    include 'admin/tag.php';
    include 'admin/product.php';
    include 'admin/currency.php';
    include 'admin/product_unit_variation.php';
    include 'admin/product_composite.php';
    include 'admin/setting.php';
    include 'admin/student.php';
    include 'admin/group.php';
    include 'admin/blog.php';
    include 'admin/promotion.php';
    include 'admin/slider.php';


    include 'admin/position.php';
    include 'admin/telegram_bot.php';
    include 'admin/module.php';
});

Route::get('/{vue_capture}', function () {
    return view('pages.welcome');
})->where('vue_capture', '.*')->middleware('auth');
