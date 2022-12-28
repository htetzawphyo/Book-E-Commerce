<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Author\AuthorController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function() {
    Route::controller(AuthController::class)->group(function() {
        Route::get('/profile', 'profile');
    });
});

Route::controller(AuthController::class)->group(function() {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::controller(AuthorController::class)->group(function() {
    Route::get('/authors', 'index');
    Route::post('/authors', 'store');
    Route::get('/authors/{author}', 'show');
    Route::put('/authors/{author}', 'update');
    Route::delete('/authors/{author}', 'destroy');
});