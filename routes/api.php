<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'mobile'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    //customer
    Route::get('/get-customer', [CustomerController::class, 'getCustomer']);
    Route::get('/store-customer/{name}/{gender}', [CustomerController::class, 'storeCustomer']);
    Route::get('/update-customer/{id}/{name}/{gender}', [CustomerController::class, 'updateCustomer']);
    Route::get('/delete-customer/{id}', [CustomerController::class, 'deleteCustomer']);
});

Route::group([
    'middleware' => 'auth:mobile',
    'prefix' => 'mobile'
], function ($router) {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

/**** Front Block ***/
Route::group(['prefix' => 'front'], function ($router) {
    Route::post('/home', [HomeController::class, 'getHome']);
});
