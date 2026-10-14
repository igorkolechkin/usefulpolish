<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\VocabularyEntry */
class VocabularyEntryResource extends JsonResource
{
    /** @return array{id: int, word: string, translation: string, created_at: ?string, updated_at: ?string} */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'word' => $this->word,
            'translation' => $this->translation,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
