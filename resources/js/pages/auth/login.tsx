import { Form, Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import Input from '@/components/formElements/input'
import SubmitButton from '@/components/formElements/submitButton'
import { store } from '@/routes/login'
import { request as passwordRequest } from '@/routes/password'

export default function LoginForm({ status }: { status?: string }) {
    const [isShowStatus, setIsShowStatus] = useState(true)

    useEffect(() => {
        if (!status) {
            return
        }

        const timeoutId = window.setTimeout(() => setIsShowStatus(false), 10000)

        return () => window.clearTimeout(timeoutId)
    }, [status])

    return (
        <Form {...store.form()} resetOnSuccess={['password']} className="space-y-4">
            {({ processing, errors }) => (
                <>
                    {status && isShowStatus && (
                        <div className="rounded-md bg-muted p-4 text-center text-sm font-semibold text-primary">
                            {status}
                        </div>
                    )}

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        error={errors.email}
                    />

                    <Input
                        label="Пароль"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        error={errors.password}
                    />

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="remember"
                            value="1"
                            className="size-4 rounded border-border"
                        />
                        Запамʼятати мене
                    </label>

                    <SubmitButton text="Увійти" disabled={processing} />

                    <Link
                        href={passwordRequest()}
                        className="block cursor-pointer text-center text-sm font-semibold text-primary hover:text-primary-hover disabled:opacity-60"
                    >
                        Забули пароль?
                    </Link>
                </>
            )}
        </Form>
    )
}

LoginForm.layout = {
    title: 'Вхід',
    subtitle: 'Увійдіть, використовуючи свою електронну пошту та пароль',
}
