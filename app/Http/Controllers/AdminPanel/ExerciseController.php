<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminPanel\Exercise\ExerciseStore;
use App\Models\Exercise;
use Illuminate\Http\Request;
use App\Enums\Exercises\ExerciseType;
use Inertia\Inertia;

class ExerciseController extends Controller
{
	public function index()
	{
		$exercises = Exercise::latest()->get();
		return Inertia::render('Admin/Exercises/Main', compact('exercises'))->with('message', 'Exercise added successfully.');
	}

	public function create()
	{
		$exerciseTypes = collect(ExerciseType::cases())->map(fn ($type) => [
			'value' => $type->value,
			'name' => $type->text(),
		]);

		return Inertia::render('Admin/Exercises/AddNew', compact('exerciseTypes'));
	}

	public function store(ExerciseStore $request)
	{
		$request->validated();

		Exercise::create([
			'title' => $request->title,
			'description' => $request->description ?? '',
			'type' => $request->type,
			'data' => $request->data,
			'is_active' => $request->is_active ?? true
		]);

		return redirect()->route('admin.exercises.index')
			->with('success', 'Упражнение успешно создано!');
	}

	/**
	 * Форма редактирования
	 */
	public function edit(Exercise $exercise)
	{
		$types = ExerciseType::cases();
//		return view('admin.exercises.edit', compact('exercise', 'types'));
	}

	public function show(Exercise $exercise)
	{
		return Inertia::render('Admin/Exercises/Exercise', compact('exercise'));
	}
	/**
	 * Обновляем упражнение
	 */
	public function update(Request $request, Exercise $exercise)
	{
		$request->validate([
			'title' => 'required|string|max:255',
			'description' => 'nullable|string',
			'type' => ['required', 'string', 'in:' . implode(',', array_column(ExerciseType::cases(), 'value'))],
			'data' => 'required|array',
			'is_active' => 'sometimes|boolean',
		]);

		$exercise->update([
			'title' => $request->title,
			'description' => $request->description ?? '',
			'type' => $request->type,
			'data' => $request->data,
			'is_active' => $request->is_active ?? true,
		]);

		return redirect()->route('admin.exercises.index')
			->with('success', 'Упражнение успешно обновлено!');
	}

	/**
	 * Удаляем упражнение
	 */
	public function destroy(Exercise $exercise)
	{
		$exercise->delete();

		return redirect()->route('admin.exercises.index')
			->with('success', 'Упражнение успешно удалено!');
	}
}
