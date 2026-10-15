import { useState } from 'react'
import ExerciseWrap from '@/features/exercises/exerciseWrap'
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
        setAvailableWords(words => words.filter(item => item.id !== word.id))
        setSelectedWords(words => [...words, word])
        setIsWrong(false)
    }

    const removeWord = (word: Word) => {
        setSelectedWords(words => words.filter(item => item.id !== word.id))
        setAvailableWords(words => [...words, word])
        setIsWrong(false)
    }

    const checkAnswer = () => {
        const answer = selectedWords.map(word => word.text).join(' ')

        if (answer === normalizedSentence) {
            onCorrect()

            return
        }

        setIsWrong(true)
    }

    return (
        <ExerciseWrap
            description="Складіть речення, поставивши слова у правильному порядку. Натисніть на слово, щоб додати його до речення. Натисніть ще раз, щоб повернути назад."
            onCheck={checkAnswer}
            checkDisabled={selectedWords.length === 0}
            incorrectAnswer={{
                status: isWrong,
                title: 'Порядок слів неправильний',
                text: 'Поверніть слова назад і спробуйте скласти речення ще раз.',
            }}
        >
            <div
                className={cn(
                    'min-h-32 space-y-3 rounded-2xl border-2 border-dashed p-5',
                    isWrong ? 'border-error bg-error-soft' : 'border-control-border bg-canvas',
                )}
            >
                <p className="text-sm font-medium text-quiet">Ваше речення</p>
                <div className="flex flex-wrap gap-3">
                    {selectedWords.map(word => (
                        <button
                            key={word.id}
                            type="button"
                            onClick={() => removeWord(word)}
                            className="inline-flex min-h-13 max-w-full items-center gap-3 rounded-xl border border-secondary bg-blue-soft px-4 py-3 text-lg font-medium text-secondary hover:bg-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary"
                        >
                            {word.text}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex min-h-16 flex-wrap items-start gap-3">
                {availableWords.map(word => (
                    <button
                        key={word.id}
                        type="button"
                        onClick={() => selectWord(word)}
                        className="min-h-13 max-w-full rounded-xl border border-control-border bg-white px-5 py-3 text-lg font-medium wrap-anywhere text-secondary hover:border-secondary hover:bg-blue-soft focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary"
                    >
                        {word.text}
                    </button>
                ))}
                {availableWords.length === 0 && (
                    <p className="py-3 text-quiet">Усі слова додано. Перевірте своє речення.</p>
                )}
            </div>
        </ExerciseWrap>
    )
}
