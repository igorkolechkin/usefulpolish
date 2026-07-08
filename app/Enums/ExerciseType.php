<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum ExerciseType: string implements HasLabel
{
    case ChooseWord = 'choose_word';
    case ArrangeWords = 'arrange_words';

    public function getLabel(): string
    {
        return match ($this) {
            self::ChooseWord => 'Choose word',
            self::ArrangeWords => 'Arrange words',
        };
    }
}
