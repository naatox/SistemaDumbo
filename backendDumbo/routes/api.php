<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\UsersController;



// Rutas para el controlador AuthController
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

// Rutas para el controlador UsersController
Route::controller(UsersController::class)->group(function (){
    Route::get('searchUser', 'searchUser');
    Route::post('registerUser', 'registerUser');
    Route::get('getUsers', 'getUsers');
    Route::patch('updateUser', 'updateUser');
    Route::delete('deleteUser', 'deleteUser');
});

Route::get('login', function (){
    return response()->json([
        'message' => 'No se ha iniciado sesión'
    ], 401);
})->name('login');
