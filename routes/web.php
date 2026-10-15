<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\ExerciseController;
use App\Http\Controllers\Dashboard\VocabularyEntryController;

Route::inertia('/', 'site/home')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
	Route::inertia('/dashboard', 'dashboard/main')->name('dashboard.main');
	Route::get('/exercises', [ExerciseController::class, 'index'])->name('dashboard.exercises');
	Route::get('/exercises/{exercise:slug}', [ExerciseController::class, 'show'])->name('dashboard.exercises.show');

    Route::get('/dictionary', [VocabularyEntryController::class, 'index'])->name('dashboard.dictionary.index');
    Route::get('/dictionary/cards', [VocabularyEntryController::class, 'cards'])->name('dashboard.dictionary.cards');
    Route::post('/dictionary', [VocabularyEntryController::class, 'store'])->name('dashboard.dictionary.store');
    Route::get('/dictionary/{entry}', [VocabularyEntryController::class, 'show'])->name('dashboard.dictionary.show');
    Route::patch('/dictionary/{entry}', [VocabularyEntryController::class, 'update'])->name('dashboard.dictionary.update');
    Route::delete('/dictionary/{entry}', [VocabularyEntryController::class, 'destroy'])->name('dashboard.dictionary.destroy');
});

require __DIR__ . '/settings.php';
