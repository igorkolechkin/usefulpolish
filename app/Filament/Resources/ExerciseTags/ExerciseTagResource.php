<?php

namespace App\Filament\Resources\ExerciseTags;

use App\Filament\Resources\ExerciseTags\Pages\CreateExerciseTag;
use App\Filament\Resources\ExerciseTags\Pages\EditExerciseTag;
use App\Filament\Resources\ExerciseTags\Pages\ListExerciseTags;
use App\Filament\Resources\ExerciseTags\Schemas\ExerciseTagForm;
use App\Filament\Resources\ExerciseTags\Tables\ExerciseTagsTable;
use App\Models\ExerciseTag;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class ExerciseTagResource extends Resource
{
    protected static ?string $model = ExerciseTag::class;

    protected static string|UnitEnum|null $navigationGroup = 'Exercises';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return ExerciseTagForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ExerciseTagsTable::configure($table);
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
            'index' => ListExerciseTags::route('/'),
            'create' => CreateExerciseTag::route('/create'),
            'edit' => EditExerciseTag::route('/{record}/edit'),
        ];
    }
}
