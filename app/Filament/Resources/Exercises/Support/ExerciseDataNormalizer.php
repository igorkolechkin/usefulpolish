<?php

namespace App\Filament\Resources\Exercises\Support;

class ExerciseDataNormalizer
{
    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public static function normalize(array $data): array
    {
        $items = collect($data['items'] ?? [])
            ->map(fn (array $item): array => self::normalizeItem($item))
            ->values()
            ->all();

        return [
            'items' => $items,
        ];
    }

    /**
     * @param  array<string, mixed>  $item
     * @return array<string, mixed>
     */
    private static function normalizeItem(array $item): array
    {
        return array_filter($item, fn ($value): bool => filled($value));
    }
}
