<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PromoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // product route
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);


    Route::post('/promos', [PromoController::class, 'store']);
    Route::put('/promos/{id}', [PromoController::class, 'update']);
    Route::delete('/promos/{id}', [PromoController::class, 'destroy']);

    Route::get('/admins', [AdminController::class, 'index']);       // List admin
    Route::post('/admins', [AdminController::class, 'store']);      // Tambah admin
    Route::put('/admins/{id}', [AdminController::class, 'update']); // Update admin
    Route::delete('/admins/{id}', [AdminController::class, 'destroy']); // Hapus admin
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products', [ProductController::class, 'index']);

Route::get('/promos', [PromoController::class, 'index']);
Route::get('/promos/{id}', [PromoController::class, 'show']);
