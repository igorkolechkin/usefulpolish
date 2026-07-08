<?php

namespace App\Filament\Resources\ExerciseTags\Pages;

use App\Filament\Resources\ExerciseTags\ExerciseTagResource;
use Filament\Resources\Pages\CreateRecord;

class CreateExerciseTag extends CreateRecord
{
    protected static string $resource = ExerciseTagResource::class;

    public function canCreateAnother(): bool
    {
        return false;
    }
}
