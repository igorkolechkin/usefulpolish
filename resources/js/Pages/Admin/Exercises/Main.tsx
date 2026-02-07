import AminPanelLayout from '@/Layouts/AminPanelLayout'
import { ExerciseType } from '@/types/exercises'
import { Link } from '@inertiajs/react'
import PrimaryButton from '@/Components/UI/PrimaryButton'
import { FlashType, PropsMessageType } from '@/types/ui'

type PropsType = {
  exercises: ExerciseType[],
  flash: FlashType
}

function getFlashData(data: FlashType): PropsMessageType {
  const filtered = Object.entries(data).find(([_, v]) => v !== null)

  if (!filtered) {
    return { text: null, type: null }
  }

  const [ key ] = filtered;

  const type = (['success', 'error', 'notice'] as const).includes(key as any)
    ? (key as 'success' | 'error' | 'notice')
    : null;

  return { text: filtered[1], type }
}

export default function Main({ exercises, flash }: PropsType) {
  const message = getFlashData(flash)

  return (
    <AminPanelLayout title="Завдання" message={ message } >
      <PrimaryButton
        as="a"
        href={ route('admin.exercises.create') }
        className="mb-8 sm:mb-10"
      >
        Додати нове завдання
      </PrimaryButton>

      { exercises.length
        ? <div className="space-y-5 sm:space-y-7">
          { exercises.map((exercise: ExerciseType) => (
            <Link
              key={ `${exercise.id}-${exercise.slug}` }
              href={ route('admin.exercises.show', exercise.id) }
              className="flex p-4 shadow rounded-lg border border-gray-200"
            >
              <span className="text-md text-gray-700">
                { exercise.title }
              </span>
            </Link>
          )) }
        </div>
        : 'Задання вiдсутнi'
      }
    </AminPanelLayout>
  )
}