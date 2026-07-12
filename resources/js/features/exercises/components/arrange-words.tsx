import { useState } from 'react'
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
    return [...words].sort(() => Math.random() - 0.5)
}

export default function ArrangeWords({ item, onCorrect }: Props) {
    const [availableWords, setAvailableWords] = useState<Word[]>(() =>
        shuffleWords(
            item.sentence
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

        if (answer === item.sentence) {
            onCorrect()

            return
        }

        setIsWrong(true)
    }

    return (
        <div className="rounded-md border border-border bg-white p-6">
            <p className="text-sm font-semibold text-primary">Складіть речення</p>

            <div className="mt-4 min-h-16 rounded-md border border-border bg-muted p-3">
                {selectedWords.length === 0 && (
                    <span className="text-sm">Виберіть слова у правильному порядку</span>
                )}

                <div className="flex flex-wrap gap-2">
                    {selectedWords.map((word) => (
                        <button
                            key={word.id}
                            type="button"
                            onClick={() => removeWord(word)}
                            className="rounded-md bg-primary px-3 py-2 font-semibold text-white"
                        >
                            {word.text}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                {availableWords.map((word) => (
                    <button
                        key={word.id}
                        type="button"
                        onClick={() => selectWord(word)}
                        className="rounded-md border border-border bg-white px-4 py-2 font-semibold text-secondary transition hover:border-primary"
                    >
                        {word.text}
                    </button>
                ))}
            </div>

            {isWrong && (
                <p className="mt-4 text-sm font-semibold text-destructive">
                    Порядок слів неправильний
                </p>
            )}

            <button
                type="button"
                disabled={selectedWords.length === 0}
                onClick={checkAnswer}
                className="mt-6 rounded-md bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover disabled:cursor-default disabled:opacity-60"
            >
                Перевірити
            </button>
        </div>
    )
}
