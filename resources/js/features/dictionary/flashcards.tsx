import { Link } from '@inertiajs/react'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { index } from '@/routes/dashboard/dictionary'

export type DictionaryCardEntry = {
    id: number
    word: string
    translation: string
}

export default function Flashcards({ entries }: { entries: DictionaryCardEntry[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const currentEntry = entries[currentIndex]

    const showCard = (index: number) => {
        setCurrentIndex(index)
        setIsFlipped(false)
    }

    return (
        <div className="space-y-7">
            <Link href={index()} className="inline-flex min-h-12 items-center gap-3 rounded-lg font-medium text-quiet hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary">
                <ArrowLeft className="size-5" /> До словника
            </Link>

            <div className="mx-auto max-w-3xl space-y-7">
                {currentEntry ? (
                    <>
                        <button
                            key={currentEntry.id}
                            type="button"
                            onClick={() => setIsFlipped(flipped => !flipped)}
                            className="block h-80 w-full rounded-3xl text-center [perspective:1200px] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-secondary sm:h-96"
                        >
                            <span className={cn(
                                'relative block size-full rounded-3xl transition-transform duration-350 [transform-style:preserve-3d] motion-reduce:transition-none',
                                isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]',
                            )}>
                                <span className="absolute inset-0 flex items-center justify-center rounded-3xl border border-border bg-white p-8 shadow-sm [backface-visibility:hidden]">
                                    <span className="text-3xl font-bold text-secondary sm:text-4xl">
                                        {currentEntry.word}
                                    </span>
                                </span>
                                <span className="absolute inset-0 flex items-center justify-center rounded-3xl border border-secondary bg-secondary p-8 text-white shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                    <span className="text-3xl font-bold sm:text-4xl">
                                        {currentEntry.translation}
                                    </span>
                                </span>
                            </span>
                        </button>

                        <p className="text-center mb-2">Натисніть, щоб повернути слово</p>

                        <div className="flex flex-wrap justify-between gap-3">
                            <Button variant="secondary" disabled={currentIndex === 0} onClick={() => showCard(currentIndex - 1)}>
                                <ArrowLeft className="size-5" /> Попередня
                            </Button>
                            <Button variant="secondary" disabled={currentIndex === entries.length - 1} onClick={() => showCard(currentIndex + 1)}>
                                Наступна <ArrowRight className="size-5" />
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white px-6 py-14 text-center">
                        <BookOpen className="size-10 text-secondary" strokeWidth={1.5} />
                        <p className="text-2xl leading-tight font-bold text-secondary">У словнику ще немає слів</p>
                        <p className="max-w-md text-quiet">Додайте слово та його переклад, щоб почати заняття з картками.</p>
                        <Link href={index()} className="button button--primary mt-2">До словника</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
