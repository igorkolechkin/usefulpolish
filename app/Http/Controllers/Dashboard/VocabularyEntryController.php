<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveVocabularyEntryRequest;
use App\Http\Resources\VocabularyEntryResource;
use App\Models\VocabularyEntry;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

class VocabularyEntryController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', VocabularyEntry::class);
        $filters = $request->validate(['search' => ['nullable', 'string', 'max:255']]);
        $search = VocabularyEntry::normalizeWord($filters['search'] ?? '');

        return VocabularyEntryResource::collection(
            $request->user()->vocabularyEntries()
                ->when($search !== '', function (Builder $query) use ($search): void {
                    $query->where(function (Builder $query) use ($search): void {
                        $pattern = '%'.addcslashes($search, '%_\\').'%';
                        $query->whereLike('word', $pattern)->orWhereLike('translation', $pattern);
                    });
                })
                ->latest('id')
                ->paginate(30)
                ->withQueryString(),
        );
    }

    public function show(VocabularyEntry $entry): VocabularyEntryResource
    {
        Gate::authorize('view', $entry);

        return new VocabularyEntryResource($entry);
    }

    public function store(SaveVocabularyEntryRequest $request): VocabularyEntryResource
    {
        $entry = $request->user()->vocabularyEntries()->make($request->validated());
        $this->saveEntry($entry);

        return new VocabularyEntryResource($entry);
    }

    public function update(SaveVocabularyEntryRequest $request, VocabularyEntry $entry): VocabularyEntryResource
    {
        $entry->fill($request->validated());
        $this->saveEntry($entry);

        return new VocabularyEntryResource($entry);
    }

    public function destroy(VocabularyEntry $entry): Response
    {
        Gate::authorize('delete', $entry);
        $entry->delete();

        return response()->noContent();
    }

    private function saveEntry(VocabularyEntry $entry): void
    {
        try {
            $entry->save();
        } catch (UniqueConstraintViolationException $exception) {
            $duplicateExists = VocabularyEntry::query()
                ->where('user_id', $entry->user_id)
                ->where('word_key', $entry->word_key)
                ->when($entry->exists, fn (Builder $query): Builder => $query->whereKeyNot($entry->id))
                ->exists();

            if (! $duplicateExists) {
                throw $exception;
            }

            throw ValidationException::withMessages(['word' => 'Це слово вже є у вашому словнику.']);
        }
    }
}
