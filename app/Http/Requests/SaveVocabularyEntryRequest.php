<?php

namespace App\Http\Requests;

use App\Models\VocabularyEntry;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Validator;

class SaveVocabularyEntryRequest extends FormRequest
{
    public function authorize(): bool
    {
        $entry = $this->route('entry');

        return $entry instanceof VocabularyEntry
            ? $this->user()->can('update', $entry)
            : $this->user()->can('create', VocabularyEntry::class);
    }

    protected function prepareForValidation(): void
    {
        if (is_string($this->input('word'))) {
            $this->merge(['word' => VocabularyEntry::normalizeWord($this->input('word'))]);
        }

        foreach (['translation', 'example'] as $field) {
            if (is_string($this->input($field))) {
                $value = Str::trim($this->input($field));
                $this->merge([$field => $value === '' ? null : $value]);
            }
        }
    }

    /** @return array<string, array<int, string>> */
    public function rules(): array
    {
        return [
            'word' => ['required', 'string', 'max:255'],
            'translation' => ['required', 'string', 'max:5000'],
            'example' => ['nullable', 'string', 'max:5000'],
        ];
    }

    /** @return array<int, \Closure> */
    public function after(): array
    {
        return [function (Validator $validator): void {
            if ($validator->errors()->has('word')) {
                return;
            }

            $entry = $this->route('entry');
            $query = $this->user()->vocabularyEntries()
                ->where('word_key', VocabularyEntry::wordKey($this->input('word')));

            if ($entry instanceof VocabularyEntry) {
                $query->whereKeyNot($entry->id);
            }

            if ($query->exists()) {
                $validator->errors()->add('word', 'Це слово вже є у вашому словнику.');
            }
        }];
    }
}
