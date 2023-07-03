<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    // Route::post('login', 'login');
    // Route::post('register', 'register');
    Route::post('register', [AuthController::class, 'createUser']);
    Route::post('login', [AuthController::class, 'loginUser']);
});

// Route::group(['middleware' => 'api'], function ($router) {
//     Route::post('/signup', [UserController::class, 'signup']);
// });
