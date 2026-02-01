import InputError from '@/Components/FormParts/InputError'
import InputLabel from '@/Components/FormParts/InputLabel'
import PrimaryButton from '@/Components/UI/PrimaryButton'
import TextInput from '@/Components/FormParts/TextInput'
import { Transition } from '@headlessui/react'
import { Link, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import BaseLink from '@/Components/UI/BaseLink'

type PropsType = {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}

export default function UpdateProfileInformation({ mustVerifyEmail, status, className, }: PropsType) {
  const user = usePage().props.auth.user

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route('profile.update'))
  }

  return (
    <section className={ className }>
      <header>
          <h2 className="text-lg font-medium text-gray-900">
            Інформація профілю
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Оновіть інформацію профілю та адресу електронної пошти вашого облікового запису.
          </p>
      </header>

      <form onSubmit={ submit } className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="Name" />
          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={ data.name }
            onChange={ (e) => setData('name', e.target.value) }
            required
            autoComplete="name"
          />
          <InputError className="mt-2" message={ errors.name } />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={ data.email }
            onChange={ (e) => setData('email', e.target.value) }
            required
            autoComplete="username"
          />
          <InputError className="mt-2" message={ errors.email } />
        </div>

        { mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800">
              Ваша адреса електронної пошти не підтверджена.
              <BaseLink
                href={ route('verification.send') }
                method="post"
                as="button"
              >
                Натисніть тут, щоб повторно надіслати електронний лист із підтвердженням.
              </BaseLink>
            </p>

            { status === 'verification-link-sent' && (
              <div className="mt-2 text-sm font-medium text-green-600">
                Нове посилання для підтвердження надіслано на вашу адресу електронної пошти.
              </div>
            ) }
          </div>
        ) }

        <div className="flex items-center gap-4">
          <PrimaryButton type="submit" disabled={ processing }>Зберігти</PrimaryButton>

          <Transition
            show={ recentlySuccessful }
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">
                Збережено.
            </p>
          </Transition>
        </div>
      </form>
    </section>
  )
}
