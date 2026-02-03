<?php

namespace App\Http\Requests\AdminPanel\Exercise;

use App\Enums\Exercises\ExerciseType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ExerciseStore extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * @return array<string, ValidationRule|array|string>
	 */
	public function rules(): array
	{
		return [
			'title' => 'required|string|max:255',
			'description' => 'nullable|string',
			'type' => ['required', 'string', 'in:' . implode(',', array_column(ExerciseType::cases(), 'value'))],
			'data' => 'array',
			'is_active' => 'sometimes|boolean',
		];
	}
}
