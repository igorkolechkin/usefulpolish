<?php

namespace App\Filament\Resources\ExerciseTags\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Illuminate\Support\Str;

class ExerciseTagForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('General')
                    ->schema([
                        TextInput::make('title')
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? '')))
                            ->required(),
                        TextInput::make('slug')
                            ->required()
                            ->unique(table: 'exercise_tags', column: 'slug', ignoreRecord: true),
                    ])
                    ->columns(2)
            ]);
    }
}
