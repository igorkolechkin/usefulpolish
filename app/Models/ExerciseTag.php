<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ExerciseTag extends Model
{
    protected $fillable = [
        'title',
        'slug',
    ];

    public function exercises(): BelongsToMany
    {
        return $this->belongsToMany(Exercise::class);
    }
}
