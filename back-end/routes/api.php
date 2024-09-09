<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiAuthentication;
use App\Http\Controllers\ApiMemberController;
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
// Route API
// routes/api.php
Route::post('/login', [ApiAuthentication::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [ApiAuthentication::class, 'destroy']);
    // Member's Routes
    Route::post('/create', [ApiMemberController::class, 'create']);
    Route::get('/members', [ApiMemberController::class, 'index']);
    Route::put('/edit/{id}', [ApiMemberController::class, 'update']);
    Route::delete('/remove/{id}', [ApiMemberController::class, 'delete']);
});
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
