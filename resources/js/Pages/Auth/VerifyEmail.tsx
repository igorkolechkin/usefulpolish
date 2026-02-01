import PrimaryButton from '@/Components/UI/PrimaryButton'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useState } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import BaseLink from '@/Components/UI/BaseLink'

export default function VerifyEmail({ status }: { status?: string }) {
  const [secondsLeft, setSecondsLeft] = useState<number>(0)
  const { post } = useForm({})

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    setSecondsLeft(60)

    post(route('verification.send'))
  }

  useEffect(() => {
    if (secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [secondsLeft])

  return (
    <GuestLayout title="Підтвердження пошти">
      <div className="w-full rounded-lg bg-white p-6 shadow-md max-w-md m-auto">
        <p className="mb-4 text-sm text-gray-600">
          Дякуємо за реєстрацію! Перш ніж розпочати, чи не могли б ви підтвердити свою адресу електронної пошти, натиснувши на посилання, яке ми щойно надіслали вам вам? Якщо ви не отримали листа, ми з радістю надішлемо вам інший.
        </p>

        { status === 'verification-link-sent' && secondsLeft !== 0 && (
          <p className="mb-4 text-sm font-medium text-green-600">
            Нове посилання для підтвердження було надіслано на адресу електронної пошти, яку ви вказали під час реєстрації. Наступне можна буде надіслати через { secondsLeft !== 0 && `${ secondsLeft }c.` }
          </p>
        ) }

        <form onSubmit={ submit }>
          <div className="mt-4 flex flex-col gap-3 items-center justify-between sm:flex-row">
            <PrimaryButton
              type="submit"
              disabled={ secondsLeft > 0 }
              className="uppercase tracking-widest"
            >
              Повторно надіслати лист
            </PrimaryButton>

            <BaseLink
              href={ route('logout') }
              method="post"
              as="button"
            >
              Вийти
            </BaseLink>
          </div>
        </form>
      </div>
    </GuestLayout>
  )
}
