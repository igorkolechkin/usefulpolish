import { Link, useForm } from '@inertiajs/react'
import { BookOpen, Plus, Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { index, store, update, destroy } from '@/routes/dashboard/dictionary'

type Entry = {
    id: number
    word: string
    translation: string
}

type Props = {
    entries: { data: Entry[]; current_page: number; last_page: number; total: number }
    search: string
}

const primaryButton = 'inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 font-bold text-white hover:bg-brand-hover disabled:cursor-default disabled:opacity-60'
const secondaryButton = 'inline-flex min-h-12 items-center justify-center rounded-xl px-4 py-2 font-medium text-secondary hover:bg-blue-soft disabled:cursor-default disabled:opacity-60'

function EntryEditor({ entry, onClose, onSaved }: { entry: Entry | null; onClose: () => void; onSaved: () => void }) {
    const form = useForm({ word: entry?.word ?? '', translation: entry?.translation ?? '' })
    const submit = (event: FormEvent) => {
        event.preventDefault()
        const options = { preserveScroll: true, onSuccess: onSaved }
        if (entry) {
            form.patch(update.url(entry.id), options)
        } else {
            form.post(store.url(), options)
        }
    }

    return (
        <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold">{entry ? 'Редагувати слово' : 'Нове слово'}</h2>
            <form onSubmit={submit} className="mt-6">
                <fieldset disabled={form.processing} className="space-y-5">
                    <label className="block space-y-2">
                        <span className="block font-medium text-secondary">Слово або вираз польською</span>
                        <input name="word" type="text" maxLength={255} value={form.data.word} onChange={event => form.setData('word', event.target.value)} className="w-full rounded-xl border border-control-border bg-white px-4 py-3 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15" />
                        {form.errors.word && <span className="block text-sm text-error">{form.errors.word}</span>}
                    </label>
                    <label className="block space-y-2">
                        <span className="block font-medium text-secondary">Переклад</span>
                        <input name="translation" type="text" maxLength={5000} value={form.data.translation} onChange={event => form.setData('translation', event.target.value)} className="w-full rounded-xl border border-control-border bg-white px-4 py-3 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15" />
                        {form.errors.translation && <span className="block text-sm text-error">{form.errors.translation}</span>}
                    </label>
                    <div className="flex flex-wrap gap-3">
                        <button type="submit" disabled={form.processing} className={primaryButton}>{form.processing ? 'Зберігаємо…' : 'Зберегти слово'}</button>
                        <button type="button" onClick={onClose} disabled={form.processing} className={secondaryButton}>Скасувати</button>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}

function DictionarySearch({ search }: { search: string }) {
    const form = useForm({ search })
    return (
        <form onSubmit={event => { event.preventDefault(); form.get(index.url(), { preserveState: false, preserveScroll: true }) }} className="space-y-2">
            <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-white px-5 py-3 focus-within:border-secondary">
                    <Search className="size-5 shrink-0 text-quiet" />
                    <input type="search" name="search" maxLength={255} value={form.data.search} onChange={event => form.setData('search', event.target.value)} placeholder="Пошук слова або перекладу…" className="min-h-7 w-full min-w-0 bg-transparent outline-none" />
                </label>
                <button type="submit" disabled={form.processing} className="min-h-13 rounded-xl border border-control-border px-6 py-3 font-medium text-secondary hover:bg-white disabled:opacity-60">{form.processing ? 'Шукаємо…' : 'Знайти'}</button>
                {search && <Link href={index()} className={secondaryButton}>Усі слова</Link>}
            </div>
            {form.errors.search && <p className="text-sm text-error">{form.errors.search}</p>}
        </form>
    )
}

export default function Dictionary({ entries, search }: Props) {
    const [editor, setEditor] = useState<Entry | null | undefined>(undefined)
    const [pendingDelete, setPendingDelete] = useState<number | null>(null)
    const [message, setMessage] = useState('')
    const deletion = useForm({})

    const openEditor = (entry: Entry | null) => {
        setEditor(entry)
        setPendingDelete(null)
        setMessage('')
        window.scrollTo({ top: 0 })
    }
    const deleteEntry = (entry: Entry) => {
        deletion.delete(destroy.url(entry.id), {
            preserveScroll: true,
            onSuccess: () => {
                setPendingDelete(null)
                if (editor?.id === entry.id) setEditor(undefined)
                setMessage('Слово видалено.')
            },
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-xl text-quiet">Ваші польські слова, переклади та приклади.</p>
                {editor === undefined && <button type="button" onClick={() => openEditor(null)} className={primaryButton}><Plus className="size-5" />Додати слово</button>}
            </div>
            {message && <p className="rounded-xl bg-success-soft px-5 py-3 text-success">{message}</p>}
            {editor !== undefined && <EntryEditor key={editor?.id ?? 'new'} entry={editor} onClose={() => setEditor(undefined)} onSaved={() => { setMessage(editor ? 'Зміни збережено.' : 'Слово додано.'); setEditor(undefined) }} />}
            <DictionarySearch key={search} search={search} />
            <p className="text-sm text-quiet">{search ? 'Знайдено записів' : 'Усього записів'}: {entries.total}</p>
            {entries.data.length > 0 ? (
                <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-white">
                    {entries.data.map(entry => (
                        <li key={entry.id} className="p-5 sm:p-6">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-xl font-bold wrap-anywhere">{entry.word}</h2>
                                    <p className="mt-2 whitespace-pre-wrap wrap-anywhere">{entry.translation}</p>
                                </div>
                                <div className="flex shrink-0 items-start gap-1">
                                    <button type="button" disabled={editor !== undefined || deletion.processing} onClick={() => openEditor(entry)} className={secondaryButton}>Редагувати</button>
                                    <button type="button" disabled={editor !== undefined || deletion.processing} onClick={() => { setPendingDelete(entry.id); setMessage('') }} className="min-h-12 rounded-xl px-4 py-2 font-medium text-error hover:bg-error-soft disabled:opacity-60">Видалити</button>
                                </div>
                            </div>
                            {pendingDelete === entry.id && (
                                <div className="mt-4 rounded-xl bg-error-soft p-4">
                                    <p className="wrap-anywhere text-error">Видалити «{entry.word}» зі словника?</p>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        <button type="button" disabled={deletion.processing} onClick={() => deleteEntry(entry)} className="min-h-12 rounded-xl bg-error px-4 py-2 font-bold text-white disabled:opacity-60">{deletion.processing ? 'Видаляємо…' : 'Так, видалити'}</button>
                                        <button type="button" disabled={deletion.processing} onClick={() => setPendingDelete(null)} className={secondaryButton}>Скасувати</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="rounded-3xl border border-border bg-white px-6 py-12 text-center">
                    <BookOpen className="mx-auto size-10 text-secondary" strokeWidth={1.5} />
                    <h2 className="mt-4 text-2xl font-bold">{search ? 'Слів не знайдено' : 'Ваш словник поки порожній'}</h2>
                    <p className="mt-3 text-quiet">{search ? 'Спробуйте інший запит або відкрийте всі слова.' : 'Додайте перше слово або вираз, який хочете запам’ятати.'}</p>
                </div>
            )}
            {entries.last_page > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                    {entries.current_page > 1 ? <Link href={index({ query: { search, page: entries.current_page - 1 } })} className={secondaryButton}>← Назад</Link> : <span />}
                    <p className="text-sm text-quiet">Сторінка {entries.current_page} з {entries.last_page}</p>
                    {entries.current_page < entries.last_page ? <Link href={index({ query: { search, page: entries.current_page + 1 } })} className={secondaryButton}>Далі →</Link> : <span />}
                </div>
            )}
        </div>
    )
}

Dictionary.layout = { title: 'Мій словник' }
