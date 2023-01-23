<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Author\AuthorController;
use App\Http\Controllers\Api\Book\BookController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['isAdmin'])->group(function () {
    // Book controller
    Route::controller(BookController::class)->group(function() {
        Route::get('/books', 'index');
        Route::post('/books', 'store');
        Route::get('/books/{book}', 'show');
        Route::put('/books/{book}', 'update');
        Route::delete('/books/{book}', 'destroy');
    });

    // Author controller
    Route::controller(AuthorController::class)->group(function() {
        Route::get('/authors', 'index');
        Route::post('/authors', 'store');
        Route::get('/authors/{author}', 'show');
        Route::put('/authors/{author}', 'update');
        Route::delete('/authors/{author}', 'destroy');
    });

    Route::controller(AuthController::class)->group(function() {
        Route::get('/users', 'users');
    });
});

Route::middleware('auth:sanctum')->group(function() {
    Route::controller(AuthController::class)->group(function() {
        Route::get('/profile', 'profile');
    });
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);  
});
 
Route::controller(AuthController::class)->group(function() {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});