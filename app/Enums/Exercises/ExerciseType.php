<?php

namespace App\Enums\Exercises;

enum ExerciseType: string
{
	case CHOICE_ONE = 'choice_one';
	case WORD_IN_SENTENCE = 'word_in_sentence';

	public function text(): string
	{
		return match($this) {
			self::CHOICE_ONE => '1 з 4',
			self::WORD_IN_SENTENCE => 'Слово у реченнi',
		};
	}
}