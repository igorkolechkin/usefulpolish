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
                ->where('is_active', true)
                ->select(['id', 'title', 'slug', 'is_active'])
                ->with('tags:id,title,slug')
                ->latest()
                ->get(),
        ]);
    }

    public function show(Exercise $exercise): Response
    {
        abort_unless($exercise->is_active, 404);

        return Inertia::render('dashboard/exercise', [
            'exercise' => [
                'title' => $exercise->title,
                'data' => $exercise->data,
            ]
        ]);
    }
}
