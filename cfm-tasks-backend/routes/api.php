<?php

use App\Http\Controllers\Api\V1\DeveloperController;
use App\Http\Controllers\Api\V1\TaskController;
use App\Http\Controllers\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();

});

//Public Routes
Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function(){
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/tasks',[TaskController::class, 'index']);
    Route::get('/tasks/{id}',[TaskController::class, 'show']);

    Route::get('/developers',[DeveloperController::class, 'index']);
    Route::get('/developers/{id}',[DeveloperController::class, 'show']);
});

//Protected Routes
Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1', 'middleware' => ['auth:sanctum']], function(){
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/tasks',[TaskController::class, 'store']);
    Route::get('/tasks/search/{title}', [TaskController::class, 'search']);
    Route::get('/tasks/search/{title}/{developerId}', [TaskController::class, 'searchByDeveloperId']);
    Route::patch('/tasks/{id}',[TaskController::class, 'update']);
    Route::delete('/tasks/{id}',[TaskController::class, 'destroy']);

    //Routes for testing purpose only, to be deleted on prod
    Route::patch('developers/{id}', [DeveloperController::class, 'update']);
});