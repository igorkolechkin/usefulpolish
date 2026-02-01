<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminPanel;

Route::middleware(['auth', 'is_admin'])
	->prefix('admin-panel')
	->name('admin.')
	->group(function () {
		Route::get('/', fn () => Inertia::render('Admin/Home'))->name('home');
		Route::resource('exercises', AdminPanel\ExerciseController::class);
});