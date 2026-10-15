import { Link } from '@inertiajs/react'
import { ArrowRight, BookOpen, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Input from '@/components/formElements/input'
import { show } from '@/routes/dashboard/exercises'
import type { ExercisesList } from '@/types/exercises'

export default function Exercises({ exercises }: { exercises: ExercisesList }) {
    const [query, setQuery] = useState('')
    const [selectedTag, setSelectedTag] = useState<number | null>(null)
    const tags = [...new Map(exercises.flatMap(exercise => exercise.tags).map(tag => [tag.id, tag])).values()]
    const searchQuery = query.trim().normalize('NFC').toLocaleLowerCase('uk')
    const filteredExercises = exercises.filter(exercise => {
        const matchesTag = selectedTag === null || exercise.tags.some(tag => tag.id === selectedTag)
        const searchableText = [exercise.title, ...exercise.tags.map(tag => tag.title)].join(' ').normalize('NFC').toLocaleLowerCase('uk')
        return matchesTag && searchableText.includes(searchQuery)
    })

    return (
        <div className="space-y-7">
            {exercises.length > 0 && (
                <>
                    <div className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                            <Input label="Пошук вправ" name="search" type="search" value={query} onChange={event => setQuery(event.target.value)} />
                        </div>
                        {query && (
                            <button type="button" onClick={() => setQuery('')} title="Очистити пошук" className="flex size-11 shrink-0 items-center justify-center rounded-xl text-quiet hover:bg-canvas focus-visible:outline-3 focus-visible:outline-secondary">
                                <X className="size-5" />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={() => setSelectedTag(null)} className={cn(
                            'min-h-12 rounded-full border px-6 py-2.5 font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary motion-reduce:transition-none',
                            selectedTag === null ? 'border-brand-soft bg-brand-soft text-brand' : 'border-border text-secondary hover:border-secondary/40 hover:bg-white',
                        )}>Усі теми</button>
                        {tags.map(tag => (
                            <button key={tag.id} type="button" onClick={() => setSelectedTag(tag.id)} className={cn(
                                'min-h-12 max-w-full rounded-full border px-6 py-2.5 text-left font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary motion-reduce:transition-none',
                                selectedTag === tag.id ? 'border-brand-soft bg-brand-soft text-brand' : 'border-border text-secondary hover:border-secondary/40 hover:bg-white',
                            )}>{tag.title}</button>
                        ))}
                    </div>
                </>
            )}
            {filteredExercises.length > 0 ? (
                <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {filteredExercises.map(exercise => (
                        <li key={exercise.id} className="min-w-0">
                            <Link href={show(exercise.slug)} className="group flex h-full min-h-[10.5rem] flex-col items-start gap-2 rounded-[22px] border border-border bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-8px_rgb(37_57_111_/_0.18)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-secondary motion-reduce:transition-none">
                                <p className="text-xl leading-snug font-bold text-secondary lg:text-[1.65rem]">{exercise.title}</p>
                                {exercise.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {exercise.tags.map(tag => (
                                            <span key={tag.id} className="max-w-full rounded-full px-3 py-1 text-sm font-medium bg-blue-soft text-secondary">{tag.title}</span>
                                        ))}
                                    </div>
                                )}
                                <span className="mt-auto flex items-center gap-3 pt-3 font-bold text-brand group-hover:text-brand-hover">Почати <ArrowRight className="size-6" strokeWidth={1.8} /></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white px-6 py-14 text-center">
                    <BookOpen className="size-10 text-secondary" strokeWidth={1.5} />
                    <p className="text-2xl leading-tight font-bold text-secondary">Вправ не знайдено</p>
                    <p className="max-w-md leading-relaxed text-quiet">Спробуйте іншу назву або виберіть іншу тему.</p>
                </div>
            )}
        </div>
    )
}

Exercises.layout = {
    title: 'Вправи'
}
