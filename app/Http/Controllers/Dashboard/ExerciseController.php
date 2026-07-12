<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use Inertia\Inertia;
use Inertia\Response;

class ExerciseController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/exercises', [
            'exercises' => Exercise::query()
                ->select(['id', 'title', 'slug', 'is_active'])
                ->with('tags:id,title,slug')
                ->latest()
                ->get(),
        ]);
    }

    public function show(Exercise $exercise): Response
    {
        return Inertia::render('dashboard/exercise', [
            'exercise' => [
                'title' => $exercise->title,
                'data' => $exercise->data,
            ]
        ]);
    }
}
