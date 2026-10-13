import { CircleAlert, Check, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ChooseWordItem } from '@/types/exercises'

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
        <section aria-labelledby="choose-word-instruction" className="space-y-8 rounded-3xl border border-border bg-white p-6 sm:p-9 lg:p-10">
            <p id="choose-word-instruction" className="font-medium text-quiet">Оберіть правильне слово</p>
            <p className="text-[1.7rem] leading-relaxed font-bold wrap-anywhere text-secondary sm:text-[2.25rem]">
                {item.sentence.split('___').map((part, index, parts) => (
                    <span key={`${part}-${index}`}>
                        {part}
                        {index < parts.length - 1 && (
                            <span aria-label={selectedAnswer ?? 'Пропущене слово'} className={cn('mx-2 inline-block min-w-24 max-w-full border-b-3 px-2 text-center align-baseline', isWrong ? 'border-error text-error' : 'border-secondary text-secondary')}>
                                {selectedAnswer ?? ' '}
                            </span>
                        )}
                    </span>
                ))}
            </p>
            <div role="group" aria-label="Варіанти відповіді" className="grid gap-4 sm:grid-cols-2">
                {item.options.map((option, index) => {
                    const isSelected = selectedAnswer === option
                    return (
                        <button key={`${option}-${index}`} type="button" aria-pressed={isSelected} onClick={() => selectAnswer(option)} className={cn(
                            'flex min-h-20 min-w-0 items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left text-lg font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary motion-reduce:transition-none',
                            isSelected ? (isWrong ? 'border-error bg-error-soft text-error' : 'border-secondary bg-blue-soft text-secondary') : 'border-control-border bg-white text-ink hover:border-secondary hover:bg-canvas',
                        )}>
                            <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-canvas text-base font-bold text-quiet">{index + 1}</span>
                            <span className="min-w-0 flex-1 wrap-anywhere">{option}</span>
                            {isSelected && (isWrong ? <CircleAlert className="size-5 shrink-0" aria-hidden="true" /> : <Check className="size-5 shrink-0" aria-hidden="true" />)}
                        </button>
                    )
                })}
            </div>
            {isWrong && (
                <div role="alert" className="flex items-start gap-3 rounded-2xl border-l-4 border-error bg-error-soft p-5 text-error">
                    <CircleAlert className="mt-1 size-6 shrink-0" aria-hidden="true" />
                    <div><p className="font-bold">Спробуйте ще раз</p><p className="mt-1 leading-relaxed">Оберіть інше слово, щоб завершити речення.</p></div>
                </div>
            )}
            <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-quiet">Оберіть відповідь і натисніть «Перевірити».</p>
                <button type="button" disabled={selectedAnswer === null} onClick={checkAnswer} className="inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-2xl bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:bg-canvas disabled:text-quiet">
                    Перевірити <ArrowRight className="size-5" aria-hidden="true" />
                </button>
            </div>
        </section>
    )
}
