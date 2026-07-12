export type ChooseWordItem = {
    type: 'choose_word'
    sentence: string
    options: string[]
    correct_answer: string
}

export type ArrangeWordsItem = {
    type: 'arrange_words'
    sentence: string
}

export type ExerciseItem = ChooseWordItem | ArrangeWordsItem

export type Exercise = {
    title: string
    data: {
        items: ExerciseItem[] | null
    }
}

export type ExercisesList = {
    id: number
    title: string
    slug: string
    is_active: boolean
    tags: {
        id: number
        title: string
        slug: string
    }[]
}