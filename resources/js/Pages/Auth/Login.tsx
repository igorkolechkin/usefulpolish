import Checkbox from '@/Components/FormParts/Checkbox'
import InputError from '@/Components/FormParts/InputError'
import InputLabel from '@/Components/FormParts/InputLabel'
import PrimaryButton from '@/Components/UI/PrimaryButton'
import TextInput from '@/Components/FormParts/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import BaseLink from '@/Components/UI/BaseLink'

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <GuestLayout title="Вхід">
      <div className="w-full rounded-lg bg-white p-6 shadow-md max-w-md m-auto">
        <div className="flex justify-self-center justify-center bg-gray-100 rounded-3xl">
          <span className="px-3 py-2 text-white bg-blue-900 rounded-3xl">
            Увійти
          </span>
          <Link
            href={ route('register')}
            className="px-3 py-2 text-gray-700 transition-colors hover:text-gray-500"
          >
            Зареєструватися
          </Link>
        </div>

        <form onSubmit={ submit }>
          <div className="mt-6">
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
              autoComplete="password"
              onChange={ (e) => setData('password', e.target.value) }
              required
            />
            <InputError message={ errors.password } className="mt-2" />
          </div>

          <div className="mt-4 block">
            <InputLabel
              htmlFor="remember"
              className="flex items-center cursor-pointer"
            >
              <Checkbox
                name="remember"
                id="remember"
                checked={ data.remember }
                onChange={ (e) => setData('remember', e.target.checked) }
              />
              <span className="ms-2 text-sm text-gray-600">
                Запам'ятай мене
              </span>
            </InputLabel>
          </div>

          <div className="mt-6 flex flex-col gap-y-3 items-center justify-center">
            <PrimaryButton type="submit" disabled={ processing }>
              Відправити
            </PrimaryButton>

            <BaseLink href={ route('password.request') }>
              Забули пароль?
            </BaseLink>
          </div>
        </form>
      </div>
    </GuestLayout>
  )
}
