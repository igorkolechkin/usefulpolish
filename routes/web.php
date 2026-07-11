<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'site/home')->name('home');
Route::inertia('/dashboard', 'dashboard/main')->name('dashboard.main'); // обернуть в проверку авторизации
Route::inertia('/dashboard/exercises', 'dashboard/exercises')->name('dashboard.exercises'); // обернуть в проверку авторизации
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/settings.php';
