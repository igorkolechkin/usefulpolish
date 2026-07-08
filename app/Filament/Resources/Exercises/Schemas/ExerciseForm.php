<?php

namespace App\Filament\Resources\Exercises\Schemas;

use App\Enums\ExerciseType;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Enums\Alignment;
use Illuminate\Support\Str;

class ExerciseForm
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
                            ->unique(table: 'exercises', column: 'slug', ignoreRecord: true),
                        Select::make('tags')
                            ->relationship('tags', 'title')
                            ->multiple()
                            ->preload()
                            ->searchable(),
                        Toggle::make('is_active')
                            ->default(true)
                            ->onColor('success')
                            ->inline(false)
                            ->required(),
                    ])
                    ->columns(2),
                Section::make('Exercise content')
                    ->schema([
                        Repeater::make('data.items')
                            ->label('List')
                            ->schema([
                                Select::make('type')
                                    ->options(ExerciseType::class)
                                    ->native(false)
                                    ->live()
                                    ->afterStateUpdated(function (Set $set): void {
                                        $set('sentence', null);
                                        $set('options', []);
                                        $set('correct_answer', null);
                                        $set('answer', null);
                                    })
                                    ->required(),
                                Group::make(fn (Get $get): array => match (self::getExerciseTypeValue($get('type'))) {
                                    ExerciseType::ChooseWord->value => [
                                        Textarea::make('sentence')
                                            ->label('Sentence')
                                            ->required(),
                                        Repeater::make('options')
                                            ->label('Options')
                                            ->simple(
                                                TextInput::make('value')
                                                    ->required(),
                                            )
                                            ->addActionLabel('Add option')
                                            ->addActionAlignment(Alignment::Start)
                                            ->required(),
                                        TextInput::make('correct_answer')
                                            ->label('Correct answer')
                                            ->required(),
                                    ],
                                    ExerciseType::ArrangeWords->value => [
                                        Textarea::make('sentence')
                                            ->label('Sentence')
                                            ->required(),
                                    ],
                                    default => [],
                                })
                                    ->key(fn (Get $get): string => 'exercise-item-data-'.(self::getExerciseTypeValue($get('type')) ?? 'empty')),
                            ])
                            ->collapsible()
                            ->collapsed()
                            ->itemLabel(fn (array $state): ?string => self::getExerciseItemLabel($state))
                            ->addActionLabel('Add item')
                            ->addActionAlignment(Alignment::Start)
                            ->required(),
                    ]),
            ]);
    }

    private static function getExerciseTypeValue(mixed $type): ?string
    {
        if ($type instanceof ExerciseType) {
            return $type->value;
        }

        return is_string($type) ? $type : null;
    }

    private static function getExerciseItemLabel(array $state): ?string
    {
        $type = self::getExerciseTypeValue($state['type'] ?? null);
        $typeLabel = $type ? ExerciseType::tryFrom($type)?->getLabel() : null;
        $sentence = $state['sentence'] ?? null;

        return collect([$typeLabel, $sentence])
            ->filter()
            ->join(': ');
    }
}
