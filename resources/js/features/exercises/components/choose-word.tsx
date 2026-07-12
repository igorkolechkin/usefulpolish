import { useState } from 'react'
import type { ChooseWordItem } from '../../../types/exercises'

type Props = {
    item: ChooseWordItem
    onCorrect: () => void
}

export default function ChooseWord({ item, onCorrect }: Props) {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isWrong, setIsWrong] = useState(false)

    const checkAnswer = () => {
        if (selectedAnswer === item.correct_answer) {
            onCorrect()

            return
        }

        setIsWrong(true)
    }

    const selectAnswer = (answer: string) => {
        setSelectedAnswer(answer)
        setIsWrong(false)
    }

    return (
        <div className="rounded-md border border-border bg-white p-6">
            <p className="text-xl font-semibold leading-8 text-secondary">
                {item.sentence.split('___').map((part, index, parts) => (
                    <span key={`${part}-${index}`}>
                        {part}
                        {index < parts.length - 1 && (
                            <span className="mx-2 inline-flex min-w-24 justify-center border-b-2 border-primary px-2 text-primary">
                                {selectedAnswer ?? ''}
                            </span>
                        )}
                    </span>
                ))}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
                {item.options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => selectAnswer(option)}
                        className={[
                            'rounded-md border px-4 py-2 font-semibold transition',
                            selectedAnswer === option
                                ? 'border-primary bg-primary text-white'
                                : 'border-border bg-white text-secondary hover:border-primary',
                        ].join(' ')}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {isWrong && (
                <p className="mt-4 text-sm font-semibold text-destructive">
                    Спробуйте ще раз
                </p>
            )}

            <button
                type="button"
                disabled={!selectedAnswer}
                onClick={checkAnswer}
                className="mt-6 rounded-md bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover disabled:cursor-default disabled:opacity-60"
            >
                Перевірити
            </button>
        </div>
    )
}
