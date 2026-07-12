<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'site/home')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'dashboard/main')->name('dashboard.main');
	Route::inertia('/dashboard/exercises', 'dashboard/exercises')->name('dashboard.exercises');
});

require __DIR__.'/settings.php';
