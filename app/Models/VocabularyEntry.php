<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use Normalizer;

class VocabularyEntry extends Model
{
    /** @use HasFactory<\Database\Factories\VocabularyEntryFactory> */
    use HasFactory;

    protected $fillable = ['word', 'translation'];

    protected $hidden = ['word_key'];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['user_id' => 'integer'];
    }

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function normalizeWord(string $word): string
    {
        return Str::squish(Normalizer::normalize($word, Normalizer::FORM_C) ?: $word);
    }

    public static function wordKey(string $word): string
    {
        return hash('sha256', Str::lower(self::normalizeWord($word)));
    }

    /** @return Attribute<string, string> */
    protected function word(): Attribute
    {
        return Attribute::make(
            set: fn (string $value): array => [
                'word' => self::normalizeWord($value),
                'word_key' => self::wordKey($value),
            ],
        );
    }
}
