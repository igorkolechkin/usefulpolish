<?php

namespace App\Filament\Resources\ExerciseTags\Pages;

use App\Filament\Resources\ExerciseTags\ExerciseTagResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListExerciseTags extends ListRecords
{
    protected static string $resource = ExerciseTagResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
