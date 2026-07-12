import { Link } from '@inertiajs/react'
import { show } from '@/routes/dashboard/exercises'

type Exercise = {
    id: number
    title: string
    slug: string
    is_active: boolean
    tags: {
        id: number
        title: string
        slug: string
    }[]
}

export default function Exercises({ exercises }: { exercises: Exercise[] }) {
    return (
        <div>
            {exercises.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {exercises.map(exercise => (
                        <Link
                            key={exercise.id}
                            href={show(exercise.slug)}
                            className="group flex min-h-38 flex-col rounded-md border border-border bg-white p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-sm"
                        >
                            <p className="transition group-hover:text-primary">
                                {exercise.title}
                            </p>

                            <div className="mt-auto pt-6">
                                {exercise.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {exercise.tags.map(tag => (
                                            <span
                                                key={tag.id}
                                                className="rounded-md border border-border px-2 py-1 text-xs font-semibold"
                                            >
                                                {tag.title}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

Exercises.layout = {
    title: 'Вправи',
}
