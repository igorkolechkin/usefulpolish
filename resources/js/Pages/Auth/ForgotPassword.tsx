import InputError from '@/Components/FormParts/InputError'
import PrimaryButton from '@/Components/UI/PrimaryButton'
import TextInput from '@/Components/FormParts/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('password.email'))
  }

  return (
    <GuestLayout title="Вiдновлення паролю">
      <div className="w-full rounded-lg bg-white p-6 shadow-md max-w-md m-auto">
        <div className="mb-4 text-sm text-gray-600">
          Забули пароль? Не проблема. Просто повідомте нам свою адресу електронної пошти, і ми надішлемо вам посилання для скидання пароля, яке дозволить вам вибрати новий.
        </div>

        { status && (
          <div className="mb-4 text-sm font-medium text-green-600">
            { status }
          </div>
        ) }

        <form onSubmit={ submit }>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={ data.email }
            className="block w-full"
            onChange={ (e) => setData('email', e.target.value) }
          />
          <InputError message={ errors.email } className="mt-2" />

          <div className="mt-4 flex justify-center">
            <PrimaryButton type="submit" className="ms-4" disabled={ processing }>
              Відправити посилання
            </PrimaryButton>
          </div>
        </form>
      </div>
    </GuestLayout>
  )
}
