import AminPanelLayout from '@/Layouts/AminPanelLayout'
import InputLabel from '@/Components/FormParts/InputLabel'
import TextInput from '@/Components/FormParts/TextInput'
import { useForm } from '@inertiajs/react'
import InputError from '@/Components/FormParts/InputError'
import { FormEvent, FormEventHandler } from 'react'
import Textarea from '@/Components/FormParts/Textarea'
import Select from '@/Components/FormParts/Select'
import PrimaryButton from '@/Components/UI/PrimaryButton'

type ExerciseTypesType = {
  value: string;
  name: string;
}

export default function AddNew({ exerciseTypes }: { exerciseTypes: ExerciseTypesType[] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    data: [],
    type: ''
  })

  const submit:FormEventHandler = (e: FormEvent) => {
    e.preventDefault()

    post(route('admin.exercises.store'), {
      onSuccess: () => reset('title', 'description', 'data', 'type')
    })
  }

  return (
    <AminPanelLayout title="Додати нове завдання">
      <form
        onSubmit={ submit }
        className="grid grid-cols-2 gap-4"
      >
        <div className="col-span-1">
          <InputLabel htmlFor="title" value="Заголовок" />
          <TextInput
            id="title"
            name="title"
            value={ data.title }
            className="mt-1 block w-full"
            onChange={ (e) => setData('title', e.target.value) }
            required
          />
          <InputError message={errors.title} className="mt-2" />
        </div>

        <div className="col-span-1">
          <InputLabel htmlFor="type" value="Тип завдання" />
          <Select
            id="type"
            name="type"
            value={ data.type }
            options={ exerciseTypes }
            emptyPlaceholder="Виберіть тип завдання"
            className="mt-1 block w-full"
            onChange={ (e) => setData('type', e.target.value) }
            required
          />
          <InputError message={errors.type} className="mt-2" />
        </div>

        <div className="col-span-2">
          <InputLabel htmlFor="description" value="Опис" />
          <Textarea
            id="description"
            name="description"
            value={ data.description }
            className="mt-1 block w-full"
            onChange={ (e) => setData('description', e.target.value) }
          />
          <InputError message={errors.description} className="mt-2" />
        </div>

        <div className="col-span-2 flex justify-center mt-5">
          <PrimaryButton type="submit" disabled={ processing }>
            Зберiгти
          </PrimaryButton>
        </div>
      </form>
    </AminPanelLayout>
  )
}