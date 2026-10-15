import { Link, router } from '@inertiajs/react'
import { ArrowLeft, BookOpen, CircleCheck, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import Button from '@/components/ui/button'
import ExerciseItemRenderer from '@/features/exercises/exercise-item-renderer'
import { exercises } from '@/routes/dashboard'
import type { Exercise } from '@/types/exercises'

export default function Exercise({ exercise }: { exercise: Exercise }) {
    const items = exercise.data?.items ?? []
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const completedCount = isCompleted ? items.length : currentIndex
    const progress = items.length > 0 ? Math.floor((completedCount / items.length) * 100) : 0

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
                <ArrowLeft className="size-5" /> До всіх вправ
            </Link>

            {items.length > 0 && (
                <section className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 font-medium text-quiet">
                        <span>{isCompleted ? `Виконано ${items.length} з ${items.length}` : `Завдання ${currentIndex + 1} з ${items.length}`}</span>
                        <span>{progress}% завершено</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-blue-soft">
                        <div className="h-full rounded-full bg-secondary transition-[width] duration-200 motion-reduce:transition-none" style={{ width: `${progress}%` }} />
                    </div>
                </section>
            )}

            {items.length === 0 ? (
                <section className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white px-6 py-14 text-center">
                    <BookOpen className="size-10 text-secondary" />
                    <p className="text-2xl leading-tight font-bold text-secondary">Завдання скоро з’являться</p>
                    <p className="max-w-md leading-relaxed text-quiet">У цій вправі ще немає завдань. Поки що можна вибрати іншу.</p>
                </section>
            ) : isCompleted ? (
                <section className="flex flex-col items-center gap-5 rounded-3xl border border-border bg-white px-6 py-12 text-center sm:p-12">
                    <div className="flex size-20 items-center justify-center rounded-full bg-success-soft text-success"><CircleCheck className="size-10" strokeWidth={1.7} /></div>
                    <p className="text-3xl leading-tight font-bold text-secondary">Вправу завершено!</p>
                    <p className="max-w-md text-lg leading-relaxed text-quiet">Ви правильно виконали всі завдання. Чудова робота!</p>
                    <div className="mt-3 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
                        <Button type="button" variant="primary" onClick={resetProgress} className="gap-3">
                            <RotateCcw className="size-5" /> Пройти ще раз
                        </Button>
                        <Link href={exercises()} className="button button--default">Інші вправи</Link>
                    </div>
                </section>
            ) : (
                <ExerciseItemRenderer key={currentIndex} item={items[currentIndex]} onCorrect={goToNextItem} />
            )}
        </div>
    )
}

Exercise.layout = ({ exercise }: { exercise: Exercise }) => ({ title: exercise.title })
