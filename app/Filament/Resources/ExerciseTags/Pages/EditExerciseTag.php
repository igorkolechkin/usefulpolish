<?php

namespace App\Filament\Resources\ExerciseTags\Pages;

use App\Filament\Resources\ExerciseTags\ExerciseTagResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditExerciseTag extends EditRecord
{
    protected static string $resource = ExerciseTagResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
