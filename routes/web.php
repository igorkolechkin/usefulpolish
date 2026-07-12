<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\ExerciseController;

Route::inertia('/', 'site/home')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
	Route::inertia('/dashboard', 'dashboard/main')->name('dashboard.main');
	Route::get('/exercises', [ExerciseController::class, 'index'])->name('dashboard.exercises');
	Route::get('/exercises/{exercise:slug}', [ExerciseController::class, 'show'])->name('dashboard.exercises.show');
});

require __DIR__ . '/settings.php';
