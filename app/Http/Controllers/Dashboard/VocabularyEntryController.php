<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveVocabularyEntryRequest;
use App\Http\Resources\VocabularyEntryResource;
use App\Models\VocabularyEntry;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class VocabularyEntryController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection|InertiaResponse|RedirectResponse
    {
        Gate::authorize('viewAny', VocabularyEntry::class);
        $filters = $request->validate(['search' => ['nullable', 'string', 'max:255']]);
        $search = VocabularyEntry::normalizeWord($filters['search'] ?? '');

        $entries = $request->user()->vocabularyEntries()
            ->when($search !== '', function (Builder $query) use ($search): void {
                $query->where(function (Builder $query) use ($search): void {
                    $pattern = '%'.addcslashes($search, '%_\\').'%';
                    $query->whereLike('word', $pattern)->orWhereLike('translation', $pattern);
                });
            })
            ->latest('id')
            ->paginate(30)
            ->withQueryString();

        if ($request->expectsJson()) {
            return VocabularyEntryResource::collection($entries);
        }

        if ($entries->currentPage() > $entries->lastPage()) {
            return to_route('dashboard.dictionary.index', ['search' => $search, 'page' => $entries->lastPage()]);
        }

        return Inertia::render('dashboard/dictionary', [
            'entries' => $entries->through(fn (VocabularyEntry $entry): array => (new VocabularyEntryResource($entry))->resolve($request)),
            'search' => $search,
        ]);
    }

    public function show(VocabularyEntry $entry): VocabularyEntryResource
    {
        Gate::authorize('view', $entry);

        return new VocabularyEntryResource($entry);
    }

    public function cards(Request $request): InertiaResponse
    {
        Gate::authorize('viewAny', VocabularyEntry::class);

        $entries = $request->user()->vocabularyEntries()
            ->latest('id')
            ->get(['id', 'word', 'translation'])
            ->map(fn (VocabularyEntry $entry): array => [
                'id' => $entry->id,
                'word' => $entry->word,
                'translation' => $entry->translation,
            ]);

        return Inertia::render('dashboard/dictionaryCards', ['entries' => $entries]);
    }

    public function store(SaveVocabularyEntryRequest $request): VocabularyEntryResource|RedirectResponse
    {
        $entry = $request->user()->vocabularyEntries()->make($request->validated());
        $this->saveEntry($entry);

        return $request->expectsJson()
            ? new VocabularyEntryResource($entry)
            : to_route('dashboard.dictionary.index');
    }

    public function update(SaveVocabularyEntryRequest $request, VocabularyEntry $entry): VocabularyEntryResource|RedirectResponse
    {
        $entry->fill($request->validated());
        $this->saveEntry($entry);

        return $request->expectsJson()
            ? new VocabularyEntryResource($entry)
            : back();
    }

    public function destroy(Request $request, VocabularyEntry $entry): Response|RedirectResponse
    {
        Gate::authorize('delete', $entry);
        $entry->delete();

        return $request->expectsJson() ? response()->noContent() : back();
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
