<?php

namespace App\Filament\Resources\Exercises\Pages;

use App\Filament\Resources\Exercises\ExerciseResource;
use App\Filament\Resources\Exercises\Support\ExerciseDataNormalizer;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditExercise extends EditRecord
{
    protected static string $resource = ExerciseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['data'] = ExerciseDataNormalizer::normalize($data['data'] ?? []);

        return $data;
    }
}
