<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\UsersController;




Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::controller(UsersController::class)->group(function (){
    Route::get('searchUser', 'searchUser');
    Route::post('registerUser', 'registerUser');
    Route::get('getUsers', 'getUsers');
    Route::patch('updateUser', 'updateUser');
    Route::delete('deleteUser', 'deleteUser');
});


