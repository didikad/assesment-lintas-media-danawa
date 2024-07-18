<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('pages.home');
});

// Auth::routes();

Route::get('/login', [App\Http\Controllers\Auth\LoginController::class, 'login_user']);


Route::get('/register', function(){
    return view('pages.auth.register');
});

Route::get('/dashboard', function(){
    return view('pages.dashboard');
})->middleware('auth');

Route::get('/profile', function(){
    return view('pages.profile');
})->middleware('auth');

Route::post('/profile', [App\Http\Controllers\ProfileController::class, 'updateData'])->middleware('auth');
Route::get('/profile/data', [App\Http\Controllers\ProfileController::class, 'getData'])->middleware('auth');

Route::post('api/login', [App\Http\Controllers\LoginApiController::class,'login']);
Route::post('api/register', [App\Http\Controllers\RegisterApiController::class,'create_user']);
Route::post('/logout', [App\Http\Controllers\LoginApiController::class, 'logout']);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
