import InputError from '@/Components/FormParts/InputError'
import InputLabel from '@/Components/FormParts/InputLabel'
import PrimaryButton from '@/Components/UI/PrimaryButton'
import TextInput from '@/Components/FormParts/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  return (
    <GuestLayout title="Реєстрація">
      <div className="w-full rounded-lg bg-white p-6 shadow-md max-w-md m-auto">
        <div className="flex justify-self-center justify-center bg-gray-100 rounded-3xl">
          <Link
            href={ route('login')}
            className="px-3 py-2 text-gray-700 transition-colors hover:text-gray-500"
          >
            Увійти
          </Link>
          <span className="px-3 py-2 text-white bg-blue-900 rounded-3xl">
            Зареєструватися
          </span>
        </div>

        <form onSubmit={ submit }>
          <div className="mt-6">
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              value={ data.name }
              className="mt-1 block w-full"
              autoComplete="name"
              onChange={ (e) => setData('name', e.target.value) }
              required
            />
            <InputError message={ errors.name } className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={ data.email }
              className="mt-1 block w-full"
              autoComplete="username"
              onChange={ (e) => setData('email', e.target.value) }
              required
            />
            <InputError message={ errors.email } className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={ data.password }
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={ (e) => setData('password', e.target.value) }
              required
            />
            <InputError message={ errors.password } className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={ data.password_confirmation }
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={ (e) =>
                setData('password_confirmation', e.target.value)
              }
              required
            />
            <InputError message={ errors.password_confirmation } className="mt-2" />
          </div>

          <div className="mt-6 flex justify-center">
            <PrimaryButton type="submit" disabled={ processing }>
              Відправити
            </PrimaryButton>
          </div>
        </form>
      </div>
    </GuestLayout>
  )
}
