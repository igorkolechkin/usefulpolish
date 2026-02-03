import AminPanelLayout from '@/Layouts/AminPanelLayout'
import { ExerciseType } from '@/types/exercises'

export default function Exercises({ exercise }: { exercise: ExerciseType }) {
  return (
    <AminPanelLayout title={ exercise.title }>
      <h1>{ exercise.title }</h1>
    </AminPanelLayout>
  )
}