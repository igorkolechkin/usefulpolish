import { router } from '@inertiajs/react'
import { useCallback, useEffect, useState } from 'react'
import ExerciseItemRenderer from '@/features/exercises/components/exercise-item-renderer'
import type { Exercise } from '@/types/exercises'

export default function Exercise({ exercise }: { exercise: Exercise }) {
    const items = exercise.data?.items ?? []
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)

    const currentItem = items[currentIndex]
    const progress = items.length > 0 ? currentIndex + 1 : 0
	

    const resetProgress = useCallback(() => {
        setCurrentIndex(0)
        setIsCompleted(false)
    }, [])

    useEffect(() => {
        return router.on('before', resetProgress)
    }, [resetProgress])

    const goToNextItem = () => {
        if (currentIndex >= items.length - 1) {
            setIsCompleted(true)

            return
        }

        setCurrentIndex((index) => index + 1)
    }

    if (items.length === 0) return

    if (isCompleted) {
        return (
            <div className="rounded-md border border-border bg-white p-8 text-center">
                <h3>Вправу завершено</h3>
                <p className="mt-2">Ви правильно виконали всі завдання.</p>
                <button
                    type="button"
                    onClick={resetProgress}
                    className="mt-6 rounded-md bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover"
                >
                    Пройти ще раз
                </button>
            </div>
        )
    }

    return (
        items.length !== 0 && (
			<div className="space-y-5">
				<div className="rounded-md border border-border bg-white p-4">
					<div className="flex items-center justify-between gap-4 text-sm font-semibold">
						<span>
							Завдання {progress} з {items.length}
						</span>
						<span>{Math.round((progress / items.length) * 100)}%</span>
					</div>
					<div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
						<div
							className="h-full rounded-full bg-primary transition-all"
							style={{ width: `${((progress - 1) / items.length) * 100}%` }}
						/>
					</div>
				</div>

				<ExerciseItemRenderer
					item={currentItem}
					onCorrect={goToNextItem}
				/>
			</div>
		)
    )
}

Exercise.layout = ({ exercise }: { exercise: Exercise }) => ({
    title: exercise.title,
})
