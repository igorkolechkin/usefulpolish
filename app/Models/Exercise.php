<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Enums\Exercises\ExerciseType;

class Exercise extends Model
{
	protected $fillable = [ 'title', 'description', 'type', 'slug', 'data', 'is_active' ];

	protected $casts = [
		'data' => 'array'
	];

	/**
	 * Booted method — событие при создании модели
	 * Автоматически генерируем уникальный slug на основе заголовка
	 */
	protected static function booted(): void
	{
		static::creating(function ($exercise) {
			$exercise->slug = self::generateUniqueSlug($exercise->title);

			if (!in_array($exercise->type, array_column(ExerciseType::cases(), 'value'))) {
				throw new \InvalidArgumentException("Неприпустимий тип вправи: {$exercise->type}");
			}
		});
	}

	public static function generateUniqueSlug(string $title): string
	{
		$slug = Str::slug($title);
		$original = $slug;
		$count = 1;

		while (self::where('slug', $slug)->exists()) {
			$slug = $original . '-' . $count;
			$count++;
		}

		return $slug;
	}

	public function getTypeEnumAttribute(): ExerciseType
	{
		return ExerciseType::from($this->type);
	}

	public function scopeActive($query)
	{
		return $query->where('is_active', true);
	}
}
