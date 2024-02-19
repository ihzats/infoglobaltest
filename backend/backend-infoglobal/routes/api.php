<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\InventoryController;


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


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [LoginController::class, 'login']);
Route::get('users', [UserController::class, 'index']);


Route::get('inventory', [InventoryController::class, 'index']);
Route::get('inventory/{id}', [InventoryController::class, 'show']);
Route::post('inventory/addnew', [InventoryController::class, 'store']);
Route::put('inventory/update/{id}', [InventoryController::class, 'update']);
Route::delete('inventory/delete/{id}', [InventoryController::class, 'destroy']);