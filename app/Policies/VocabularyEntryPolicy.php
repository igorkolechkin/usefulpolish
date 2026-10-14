<?php

namespace App\Policies;

use App\Models\User;
use App\Models\VocabularyEntry;

class VocabularyEntryPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function view(User $user, VocabularyEntry $entry): bool
    {
        return $entry->user_id === $user->id;
    }

    public function update(User $user, VocabularyEntry $entry): bool
    {
        return $this->view($user, $entry);
    }

    public function delete(User $user, VocabularyEntry $entry): bool
    {
        return $this->view($user, $entry);
    }
}
