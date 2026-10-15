import Flashcards, { type DictionaryCardEntry } from '@/features/dictionary/flashcards'

export default function DictionaryCards({ entries }: { entries: DictionaryCardEntry[] }) {
    return <Flashcards entries={entries} />
}

DictionaryCards.layout = { title: 'Картки зі словника' }
