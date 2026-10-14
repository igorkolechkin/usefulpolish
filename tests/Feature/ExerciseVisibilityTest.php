<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Database\Factories\ExerciseFactory;
use Inertia\Testing\AssertableInertia as Assert;

class ExerciseVisibilityTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

    public function test_catalogue_only_sends_active_exercises(): void
    {
        $activeExercise = ExerciseFactory::new()->create();
        ExerciseFactory::new()->inactive()->create();

        $this->get(route('dashboard.exercises'))
            ->assertOk()
            ->assertInertia(fn (Assert $page): Assert => $page
                ->component('dashboard/exercises')
                ->has('exercises', 1)
                ->where('exercises.0.id', $activeExercise->id)
                ->where('exercises.0.is_active', true)
            );
    }

    public function test_active_exercise_can_be_opened_by_slug(): void
    {
        $exercise = ExerciseFactory::new()->create();

        $this->get(route('dashboard.exercises.show', $exercise->slug))
            ->assertOk()
            ->assertInertia(fn (Assert $page): Assert => $page
                ->component('dashboard/exercise')
                ->where('exercise.title', $exercise->title)
                ->where('exercise.data', $exercise->data)
            );
    }

    public function test_inactive_exercise_returns_not_found_by_direct_link(): void
    {
        $exercise = ExerciseFactory::new()->inactive()->create();

        $this->get(route('dashboard.exercises.show', $exercise->slug))
            ->assertNotFound();
    }

    public function test_catalogue_is_empty_when_all_exercises_are_inactive(): void
    {
        ExerciseFactory::new()->inactive()->create();

        $this->get(route('dashboard.exercises'))
            ->assertOk()
            ->assertInertia(fn (Assert $page): Assert => $page
                ->component('dashboard/exercises')
                ->has('exercises', 0)
            );
    }
}
