import { Link, useForm } from '@inertiajs/react'
import * as Dialog from '@radix-ui/react-dialog'
import { BookOpen, Plus, X } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import Input from '@/components/formElements/input'
import Button from '@/components/ui/button'
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

const secondaryButton =
    'inline-flex min-h-12 items-center justify-center rounded-xl px-4 py-2 font-medium text-secondary hover:bg-blue-soft disabled:cursor-default disabled:opacity-60'
const dialogContent =
    'fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[24px] border border-border bg-white p-6 shadow-xl sm:p-8'

function DictionaryDialog({
    title,
    processing,
    onClose,
    children,
}: {
    title: string
    processing: boolean
    onClose: () => void
    children: ReactNode
}) {
    return (
        <Dialog.Root open>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-secondary/40" />
                <Dialog.Content className={dialogContent}>
                    <div className="flex items-center justify-between gap-4">
                        <Dialog.Title asChild>
                            <p className="text-2xl leading-tight font-bold text-secondary">
                                {title}
                            </p>
                        </Dialog.Title>
                        <button
                            type="button"
                            title="Закрити"
                            onClick={onClose}
                            disabled={processing}
                            className="flex size-11 shrink-0 items-center justify-center rounded-xl text-quiet hover:bg-canvas hover:text-secondary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-default disabled:opacity-60"
                        >
                            <X className="size-5" />
                        </button>
                    </div>
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

function EntryEditor({
    entry,
    onClose,
    onSaved,
}: {
    entry: Entry | null
    onClose: () => void
    onSaved: () => void
}) {
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
        <DictionaryDialog
            title={entry ? 'Редагувати слово' : 'Нове слово'}
            processing={form.processing}
            onClose={onClose}
        >
            <Dialog.Description className="mt-2 text-quiet">
                Вкажіть слово польською та його переклад.
            </Dialog.Description>
            <form onSubmit={submit} className="mt-8">
                <fieldset disabled={form.processing} className="space-y-5">
                    <Input
                        label="Слово або вираз польською"
                        name="word"
                        type="text"
                        maxLength={255}
                        value={form.data.word}
                        onChange={event => form.setData('word', event.target.value)}
                        error={form.errors.word}
                    />
                    <Input
                        label="Переклад"
                        name="translation"
                        type="text"
                        maxLength={255}
                        value={form.data.translation}
                        onChange={event => form.setData('translation', event.target.value)}
                        error={form.errors.translation}
                    />
                    <div className="mt-8 flex justify-center">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={form.processing}
                        >
                            Зберегти слово
                        </Button>
                    </div>
                </fieldset>
            </form>
        </DictionaryDialog>
    )
}

function DeleteEntryDialog({
    entry,
    onClose,
    onDeleted,
}: {
    entry: Entry
    onClose: () => void
    onDeleted: () => void
}) {
    const deletion = useForm({})

    const deleteEntry = () => {
        deletion.delete(destroy.url(entry.id), {
            preserveScroll: true,
            onSuccess: onDeleted,
        })
    }

    return (
        <DictionaryDialog
            title="Видалити слово?"
            processing={deletion.processing}
            onClose={onClose}
        >
            <Dialog.Description className="mt-2 text-ink">
                Слово <span className="text-xl font-bold wrap-anywhere">«{entry.word}»</span> буде видалено зі словника.
            </Dialog.Description>
            <div className="mt-8 flex justify-center">
                <Button
                    type="button"
                    variant="primary"
                    disabled={deletion.processing}
                    onClick={deleteEntry}
                    className="w-full bg-error hover:bg-error/90"
                >
                    Так, видалити
                </Button>
            </div>
        </DictionaryDialog>
    )
}

function DictionarySearch({ search }: { search: string }) {
    const form = useForm({ search })
    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                form.get(index.url(), { preserveState: false, preserveScroll: true })
            }}
            className="space-y-2"
        >
            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="min-w-0 flex-1">
                    <Input
                        label="Пошук слова або перекладу"
                        name="search"
                        type="search"
                        maxLength={255}
                        value={form.data.search}
                        onChange={event => form.setData('search', event.target.value)}
                        error={form.errors.search}
                    />
                </div>
                <Button type="submit" disabled={form.processing}>
                    Знайти
                </Button>
                {search && (
                    <Link href={index()} className={secondaryButton}>
                        Усі слова
                    </Link>
                )}
            </div>
        </form>
    )
}

export default function Dictionary({ entries, search }: Props) {
    const [editor, setEditor] = useState<Entry | null | undefined>(undefined)
    const [pendingDelete, setPendingDelete] = useState<Entry | null>(null)
    const [message, setMessage] = useState('')

    const openEditor = (entry: Entry | null) => {
        setEditor(entry)
        setPendingDelete(null)
        setMessage('')
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-xl text-quiet">Ваші польські слова та переклади.</p>
                <Button type="button" variant="primary" onClick={() => openEditor(null)}>
                    <Plus className="size-5" />
                    Додати слово
                </Button>
            </div>
            {message && (
                <p className="rounded-xl bg-success-soft px-5 py-3 text-success">{message}</p>
            )}
            {editor !== undefined && (
                <EntryEditor
                    key={editor?.id ?? 'new'}
                    entry={editor}
                    onClose={() => setEditor(undefined)}
                    onSaved={() => {
                        setMessage(editor ? 'Зміни збережено.' : 'Слово додано.')
                        setEditor(undefined)
                    }}
                />
            )}
            {pendingDelete && (
                <DeleteEntryDialog
                    entry={pendingDelete}
                    onClose={() => setPendingDelete(null)}
                    onDeleted={() => {
                        setPendingDelete(null)
                        setMessage('Слово видалено.')
                    }}
                />
            )}
            <DictionarySearch key={search} search={search} />
            <p className="text-sm text-quiet">
                {search ? 'Знайдено записів' : 'Усього записів'}: {entries.total}
            </p>
            {entries.data.length > 0 ? (
                <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-white">
                    {entries.data.map(entry => (
                        <li key={entry.id} className="p-5 sm:p-6">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                                <div className="min-w-0 flex-1">
                                    <p className="text-xl leading-tight font-bold text-secondary wrap-anywhere">
                                        {entry.word}
                                    </p>
                                    <p className="mt-2 whitespace-pre-wrap">
                                        {entry.translation}
                                    </p>
                                </div>
                                <div className="flex shrink-0 items-start gap-1">
                                    <Button
                                        type="button"
                                        onClick={() => openEditor(entry)}
                                        className="min-h-12 border-0 px-4 py-2 hover:bg-blue-soft"
                                    >
                                        Редагувати
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setPendingDelete(entry)
                                            setMessage('')
                                        }}
                                        className="min-h-12 border-0 px-4 py-2 text-error hover:bg-error-soft"
                                    >
                                        Видалити
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="rounded-3xl border border-border bg-white px-6 py-12 text-center">
                    <BookOpen className="mx-auto size-10 text-secondary" strokeWidth={1.5} />
                    <p className="mt-4 text-2xl leading-tight font-bold text-secondary">
                        {search ? 'Слів не знайдено' : 'Ваш словник поки порожній'}
                    </p>
                    <p className="mt-3 text-quiet">
                        {search
                            ? 'Спробуйте інший запит або відкрийте всі слова.'
                            : 'Додайте перше слово або вираз, який хочете запам’ятати.'}
                    </p>
                </div>
            )}
            {entries.last_page > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                    {entries.current_page > 1 ? (
                        <Link
                            href={index({ query: { search, page: entries.current_page - 1 } })}
                            className={secondaryButton}
                        >
                            ← Назад
                        </Link>
                    ) : (
                        <span />
                    )}
                    <p className="text-sm text-quiet">
                        Сторінка {entries.current_page} з {entries.last_page}
                    </p>
                    {entries.current_page < entries.last_page ? (
                        <Link
                            href={index({ query: { search, page: entries.current_page + 1 } })}
                            className={secondaryButton}
                        >
                            Далі →
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
            )}
        </div>
    )
}

Dictionary.layout = { title: 'Мій словник' }
