<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\UserInfoController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
//     auth()->user()->tokens()->delete();
//     return response()->json(['message' => 'Logged out successfully']);
// });

Route::controller(AuthController::class)->group(function () {
    // Route::post('login', 'login');
    // Route::post('register', 'register');
    Route::post('register', [AuthController::class, 'createUser']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::controller(BlogController::class)->group(function () {
    Route::post('blog', [BlogController::class, 'index']);
    // Route::post('login', [AuthController::class, 'login']);
    // Route::post('logout', [AuthController::class, 'logout']);
});


// Route::resource('blog', BlogController::class)->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('uploadImg', [UserInfoController::class, 'uploadImg']);
});
