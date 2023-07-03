<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\UserInfoController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:sanctum')->post('/logout', function () {
//     auth()->user()->tokens()->delete();

//     return response()->json(['message' => 'Logged out successfully']);
// });

Route::controller(AuthController::class)->group(function () {
    // Route::post('login', 'login');
    // Route::post('register', 'register');
    Route::post('register', [AuthController::class, 'createUser']);
    Route::post('login', [AuthController::class, 'loginUser']);
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('uploadImg', [UserInfoController::class, 'uploadImg']);
});

// Route::group(['middleware' => 'api'], function ($router) {
//     Route::post('/signup', [UserController::class, 'signup']);
// });
