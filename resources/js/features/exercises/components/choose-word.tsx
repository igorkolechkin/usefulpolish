import { CircleAlert, Check } from 'lucide-react'
import { useState } from 'react'
import ExerciseWrap from '@/features/exercises/exerciseWrap'
import { cn } from '@/lib/utils'
import type { ChooseWordItem } from '@/types/exercises'

type Props = {
    item: ChooseWordItem
    onCorrect: () => void
}

export default function ChooseWord({ item, onCorrect }: Props) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [isWrong, setIsWrong] = useState(false)
    const selectedAnswer = selectedIndex === null ? null : item.options[selectedIndex]

    const checkAnswer = () => {
        if (selectedAnswer === item.correct_answer) {
            onCorrect()
            return
        }
        setIsWrong(true)
    }

    const selectAnswer = (index: number) => {
        setSelectedIndex(index)
        setIsWrong(false)
    }

    return (
        <ExerciseWrap
            description="Оберіть відповідь."
            onCheck={checkAnswer}
            checkDisabled={selectedIndex === null}
            incorrectAnswer={{
                status: isWrong,
                title: 'Спробуйте ще раз',
                text: 'Оберіть інше слово, щоб завершити речення.',
            }}
        >
            <p className="text-[1.4rem] leading-relaxed font-bold text-secondary sm:text-[1.8rem]">
                {item.sentence.split('___').map((part, index, parts) => (
                    <span key={`${part}-${index}`}>
                        {part}
                        {index < parts.length - 1 && (
                            <span
                                className={cn(
                                    'mx-2 inline-block max-w-full min-w-24 border-b-3 px-2 text-center leading-none',
                                    isWrong
                                        ? 'border-error text-error'
                                        : 'border-secondary text-secondary',
                                )}
                            >
                                {selectedAnswer ?? ' '}
                            </span>
                        )}
                    </span>
                ))}
            </p>
            <div className="grid gap-4 sm:grid-cols-4">
                {item.options.map((option, index) => {
                    const isSelected = selectedIndex === index
                    return (
                        <button
                            key={`${option}-${index}`}
                            type="button"
                            onClick={() => selectAnswer(index)}
                            className={cn(
                                'flex min-h-15 items-center gap-4 rounded-2xl border-2 p-3 text-left text-lg font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary motion-reduce:transition-none',
                                isSelected
                                    ? isWrong
                                        ? 'border-error bg-error-soft text-error'
                                        : 'border-secondary bg-blue-soft text-secondary'
                                    : 'border-control-border bg-white text-ink hover:border-secondary hover:bg-canvas',
                            )}
                        >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-canvas text-base font-bold text-quiet">
                                {index + 1}
                            </span>
                            <span className="min-w-0 flex-1 wrap-anywhere">{option}</span>
                            {isSelected && <Check className="size-5 shrink-0" />}
                        </button>
                    )
                })}
            </div>
        </ExerciseWrap>
    )
}
