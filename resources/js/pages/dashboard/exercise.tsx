type Exercise = {
    title: string
    data: unknown
}

export default function Exercise({ exercise }: { exercise: Exercise }) {
    return (
        <div>
            <pre>{JSON.stringify(exercise.data, null, 2)}</pre>
        </div>
    )
}

Exercise.layout = ({ exercise }: { exercise: Exercise }) => ({
    title: exercise.title
})