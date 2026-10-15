import { ArrowRight, CircleAlert, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ArrangeWordsItem } from '../../../types/exercises'

type Word = {
    id: number
    text: string
}

type Props = {
    item: ArrangeWordsItem
    onCorrect: () => void
}

const shuffleWords = (words: Word[]) => {
    const shuffledWords = [...words]

    for (let index = shuffledWords.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const word = shuffledWords[index]
        shuffledWords[index] = shuffledWords[randomIndex]
        shuffledWords[randomIndex] = word
    }

    return shuffledWords
}

export default function ArrangeWords({ item, onCorrect }: Props) {
    const normalizedSentence = item.sentence.trim().replace(/\s+/g, ' ')
    const [availableWords, setAvailableWords] = useState<Word[]>(() =>
        shuffleWords(
            normalizedSentence
                .split(' ')
                .filter(Boolean)
                .map((text, id) => ({ id, text })),
        ),
    )
    const [selectedWords, setSelectedWords] = useState<Word[]>([])
    const [isWrong, setIsWrong] = useState(false)

    const selectWord = (word: Word) => {
        setAvailableWords((words) => words.filter((item) => item.id !== word.id))
        setSelectedWords((words) => [...words, word])
        setIsWrong(false)
    }

    const removeWord = (word: Word) => {
        setSelectedWords((words) => words.filter((item) => item.id !== word.id))
        setAvailableWords((words) => [...words, word])
        setIsWrong(false)
    }

    const checkAnswer = () => {
        const answer = selectedWords.map((word) => word.text).join(' ')

        if (answer === normalizedSentence) {
            onCorrect()

            return
        }

        setIsWrong(true)
    }

    return (
        <section className="space-y-7 rounded-3xl border border-border bg-white p-6 sm:p-9 lg:p-10">
            <div className="space-y-3">
                <p className="font-medium text-quiet">Складіть речення</p>
                <p className="text-[1.7rem] leading-tight font-bold text-secondary sm:text-[2rem]">Оберіть слова у правильному порядку</p>
                <p className="text-quiet">Натисніть на слово, щоб додати його до речення. Натисніть ще раз, щоб повернути назад.</p>
            </div>
            <div className={cn('min-h-32 space-y-3 rounded-2xl border-2 border-dashed p-5', isWrong ? 'border-error bg-error-soft' : 'border-control-border bg-canvas')}>
                <p className="text-sm font-medium text-quiet">Ваше речення</p>
                {selectedWords.length === 0 && <p className="py-2 text-quiet">Тут з’являться обрані слова</p>}
                <div className="flex flex-wrap gap-3">
                    {selectedWords.map(word => (
                        <button key={word.id} type="button" onClick={() => removeWord(word)} className="inline-flex min-h-13 max-w-full items-center gap-3 rounded-xl border border-secondary bg-blue-soft px-4 py-3 text-lg font-medium text-secondary hover:bg-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary">
                            <span className="min-w-0 wrap-anywhere">{word.text}</span><X className="size-4 shrink-0" />
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex min-h-16 flex-wrap items-start gap-3">
                {availableWords.map(word => (
                    <button key={word.id} type="button" onClick={() => selectWord(word)} className="min-h-13 max-w-full rounded-xl border border-control-border bg-white px-5 py-3 text-lg font-medium wrap-anywhere text-secondary hover:border-secondary hover:bg-blue-soft focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary">{word.text}</button>
                ))}
                {availableWords.length === 0 && <p className="py-3 text-quiet">Усі слова додано. Перевірте своє речення.</p>}
            </div>
            {isWrong && (
                <div className="flex items-start gap-3 rounded-2xl border-l-4 border-error bg-error-soft p-5 text-error">
                    <CircleAlert className="mt-1 size-6 shrink-0" />
                    <div><p className="font-bold">Порядок слів неправильний</p><p className="mt-1 leading-relaxed">Поверніть слова назад і спробуйте скласти речення ще раз.</p></div>
                </div>
            )}
            <div className="flex flex-col border-t border-border pt-6 sm:flex-row sm:justify-end">
                <button type="button" disabled={selectedWords.length === 0} onClick={checkAnswer} className="inline-flex min-h-13 items-center justify-center gap-3 rounded-2xl bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:bg-canvas disabled:text-quiet">
                    Перевірити <ArrowRight className="size-5" />
                </button>
            </div>
        </section>
    )
}
