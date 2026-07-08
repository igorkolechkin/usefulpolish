<?php

namespace App\Filament\Resources\Exercises;

use App\Filament\Resources\Exercises\Pages\CreateExercise;
use App\Filament\Resources\Exercises\Pages\EditExercise;
use App\Filament\Resources\Exercises\Pages\ListExercises;
use App\Filament\Resources\Exercises\Schemas\ExerciseForm;
use App\Filament\Resources\Exercises\Tables\ExercisesTable;
use App\Models\Exercise;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class ExerciseResource extends Resource
{
    protected static ?string $model = Exercise::class;

    protected static string|UnitEnum|null $navigationGroup = 'Exercises';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return ExerciseForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ExercisesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListExercises::route('/'),
            'create' => CreateExercise::route('/create'),
            'edit' => EditExercise::route('/{record}/edit'),
        ];
    }
}
