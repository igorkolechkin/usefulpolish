import { Link, router } from '@inertiajs/react'
import { ArrowLeft, BookOpen, CircleCheck, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import ExerciseItemRenderer from '@/features/exercises/components/exercise-item-renderer'
import { exercises } from '@/routes/dashboard'
import type { Exercise } from '@/types/exercises'

export default function Exercise({ exercise }: { exercise: Exercise }) {
    const items = exercise.data?.items ?? []
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const completedCount = isCompleted ? items.length : currentIndex
    const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0

    const resetProgress = useCallback(() => {
        setCurrentIndex(0)
        setIsCompleted(false)
    }, [])

    useEffect(() => router.on('before', resetProgress), [resetProgress])

    const goToNextItem = () => {
        if (currentIndex >= items.length - 1) {
            setIsCompleted(true)
            return
        }
        setCurrentIndex(index => index + 1)
    }

    return (
        <div className="mx-auto max-w-[1120px] space-y-7">
            <Link href={exercises()} className="inline-flex min-h-12 items-center gap-3 rounded-lg font-medium text-quiet hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary">
                <ArrowLeft className="size-5" aria-hidden="true" /> До всіх вправ
            </Link>

            {items.length > 0 && (
                <section aria-label="Прогрес вправи" className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 font-medium text-quiet">
                        <span aria-live="polite">{isCompleted ? `Виконано ${items.length} з ${items.length}` : `Завдання ${currentIndex + 1} з ${items.length}`}</span>
                        <span>{progress}% завершено</span>
                    </div>
                    <div role="progressbar" aria-label="Виконані завдання" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="h-3 overflow-hidden rounded-full bg-blue-soft">
                        <div className="h-full rounded-full bg-secondary transition-[width] duration-200 motion-reduce:transition-none" style={{ width: `${progress}%` }} />
                    </div>
                </section>
            )}

            {items.length === 0 ? (
                <section className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white px-6 py-14 text-center">
                    <BookOpen className="size-10 text-secondary" aria-hidden="true" />
                    <h2 className="text-2xl font-bold">Завдання скоро з’являться</h2>
                    <p className="max-w-md leading-relaxed text-quiet">У цій вправі ще немає завдань. Поки що можна вибрати іншу.</p>
                </section>
            ) : isCompleted ? (
                <section aria-labelledby="exercise-completed" className="flex flex-col items-center gap-5 rounded-3xl border border-border bg-white px-6 py-12 text-center sm:p-12">
                    <div className="flex size-20 items-center justify-center rounded-full bg-success-soft text-success"><CircleCheck className="size-10" strokeWidth={1.7} aria-hidden="true" /></div>
                    <h2 id="exercise-completed" role="status" className="text-3xl font-bold">Вправу завершено!</h2>
                    <p className="max-w-md text-lg leading-relaxed text-quiet">Ви правильно виконали всі завдання. Чудова робота!</p>
                    <div className="mt-3 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
                        <button type="button" onClick={resetProgress} className="inline-flex min-h-13 items-center justify-center gap-3 rounded-2xl bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary">
                            <RotateCcw className="size-5" aria-hidden="true" /> Пройти ще раз
                        </button>
                        <Link href={exercises()} className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-control-border px-6 py-3 font-medium text-secondary hover:bg-blue-soft focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary">Інші вправи</Link>
                    </div>
                </section>
            ) : (
                <ExerciseItemRenderer key={currentIndex} item={items[currentIndex]} onCorrect={goToNextItem} />
            )}
        </div>
    )
}

Exercise.layout = ({ exercise }: { exercise: Exercise }) => ({ title: exercise.title })
