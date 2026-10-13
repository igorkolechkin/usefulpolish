import { Link } from '@inertiajs/react'
import { ArrowRight, BookOpen, Search, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { show } from '@/routes/dashboard/exercises'
import type { ExercisesList } from '@/types/exercises'

export default function Exercises({ exercises }: { exercises: ExercisesList }) {
    const [query, setQuery] = useState('')
    const [selectedTag, setSelectedTag] = useState<number | null>(null)
    const activeExercises = exercises.filter(exercise => exercise.is_active)
    const tags = [...new Map(activeExercises.flatMap(exercise => exercise.tags).map(tag => [tag.id, tag])).values()]
    const searchQuery = query.trim().normalize('NFC').toLocaleLowerCase('uk')
    const filteredExercises = activeExercises.filter(exercise => {
        const matchesTag = selectedTag === null || exercise.tags.some(tag => tag.id === selectedTag)
        const searchableText = [exercise.title, ...exercise.tags.map(tag => tag.title)].join(' ').normalize('NFC').toLocaleLowerCase('uk')
        return matchesTag && searchableText.includes(searchQuery)
    })

    return (
        <div className="space-y-7">
            {activeExercises.length > 0 && (
                <>
                    <div className="flex items-center gap-4 rounded-2xl border border-control-border/60 bg-white px-5 py-3 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 sm:px-6">
                        <Search className="size-6 shrink-0 text-quiet" strokeWidth={1.8} aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                            <input id="exercise-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Пошук вправ…" className="min-h-9 w-full appearance-none bg-transparent text-lg text-secondary outline-none placeholder:text-quiet/80 [&::-webkit-search-cancel-button]:appearance-none" />
                        </div>
                        {query && (
                            <button type="button" onClick={() => setQuery('')} aria-label="Очистити пошук" className="flex size-8 shrink-0 items-center justify-center rounded-xl text-quiet hover:bg-canvas focus-visible:outline-3 focus-visible:outline-secondary">
                                <X className="size-5" aria-hidden="true" />
                            </button>
                        )}
                    </div>
                    <div role="group" aria-label="Фільтр за темою" className="flex flex-wrap gap-3">
                        <button type="button" onClick={() => setSelectedTag(null)} aria-pressed={selectedTag === null} className={cn(
                            'min-h-12 rounded-full border px-6 py-2.5 font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary motion-reduce:transition-none',
                            selectedTag === null ? 'border-brand-soft bg-brand-soft text-brand' : 'border-border text-secondary hover:border-secondary/40 hover:bg-white',
                        )}>Усі теми</button>
                        {tags.map(tag => (
                            <button key={tag.id} type="button" onClick={() => setSelectedTag(tag.id)} aria-pressed={selectedTag === tag.id} className={cn(
                                'min-h-12 max-w-full rounded-full border px-6 py-2.5 text-left font-medium wrap-anywhere transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary motion-reduce:transition-none',
                                selectedTag === tag.id ? 'border-brand-soft bg-brand-soft text-brand' : 'border-border text-secondary hover:border-secondary/40 hover:bg-white',
                            )}>{tag.title}</button>
                        ))}
                    </div>
                </>
            )}
            <p role="status" className="sr-only">Знайдено вправ: {filteredExercises.length}</p>
            {filteredExercises.length > 0 ? (
                <ul aria-label="Список вправ" className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {filteredExercises.map(exercise => (
                        <li key={exercise.id} className="min-w-0">
                            <Link href={show(exercise.slug)} className="group flex h-full min-h-[10.5rem] flex-col items-start gap-2 rounded-[22px] border border-border bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-8px_rgb(37_57_111_/_0.18)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-secondary motion-reduce:transition-none sm:p-6">
                                <h2 className="text-xl leading-snug font-bold wrap-anywhere text-secondary lg:text-[1.65rem]">{exercise.title}</h2>
                                {exercise.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {exercise.tags.map(tag => (
                                            <span key={tag.id} className={cn(
                                                'max-w-full rounded-full px-3 py-1 text-sm font-medium wrap-anywhere',
                                                tags.findIndex(topic => topic.id === tag.id) % 2 === 0 ? 'bg-brand-soft text-brand' : 'bg-blue-soft text-secondary',
                                            )}>{tag.title}</span>
                                        ))}
                                    </div>
                                )}
                                <span className="mt-auto flex items-center gap-3 pt-3 font-bold text-brand group-hover:text-brand-hover">Почати <ArrowRight className="size-6" strokeWidth={1.8} aria-hidden="true" /></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white px-6 py-14 text-center">
                    <BookOpen className="size-10 text-secondary" strokeWidth={1.5} aria-hidden="true" />
                    <h2 className="text-2xl font-bold">{activeExercises.length === 0 ? 'Вправи скоро з’являться' : 'Вправ не знайдено'}</h2>
                    <p className="max-w-md leading-relaxed text-quiet">{activeExercises.length === 0 ? 'Ми готуємо завдання для вашої практики польської.' : 'Спробуйте іншу назву або виберіть іншу тему.'}</p>
                </div>
            )}
        </div>
    )
}

Exercises.layout = {
    title: 'Вправи'
}
