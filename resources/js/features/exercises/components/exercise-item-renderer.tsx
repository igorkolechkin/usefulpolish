import type { ExerciseItem } from '../../../types/exercises'
import ArrangeWords from './arrange-words'
import ChooseWord from './choose-word'

type Props = {
    item: ExerciseItem
    onCorrect: () => void
}

export default function ExerciseItemRenderer({ item, onCorrect }: Props) {
    switch (item.type) {
        case 'choose_word':
            return <ChooseWord item={item} onCorrect={onCorrect} />

        case 'arrange_words':
            return <ArrangeWords item={item} onCorrect={onCorrect} />
    }
}
