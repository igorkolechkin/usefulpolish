import { Form, Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import Input from '@/components/formElements/input'
import Button from '@/components/ui/button'
import { register } from '@/routes'
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
        <Form {...store.form()} resetOnSuccess={['password']} className="space-y-5">
            {({ processing, errors }) => (
                <>
                    {status && isShowStatus && (
                        <div className="rounded-xl border border-secondary/15 bg-blue-soft p-4 font-medium text-secondary">
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

                    <label className="flex min-h-11 items-center gap-3 font-medium text-ink">
                        <input
                            type="checkbox"
                            name="remember"
                            value="1"
                            className="size-5 rounded border-control-border accent-brand"
                        />
                        Запамʼятати мене
                    </label>

                    <Button type="submit" disabled={processing} variant="primary" className="w-full">Увійти</Button>

                    <Link
                        href={passwordRequest()}
                        className="block rounded-lg text-center font-medium text-secondary hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                    >
                        Забули пароль?
                    </Link>
                    <p className="border-t border-border pt-5 text-center text-quiet">
                        Ще немає акаунта?{' '}
                        <Link href={register()} className="rounded-lg font-bold text-secondary hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary">Зареєструватися</Link>
                    </p>
                </>
            )}
        </Form>
    )
}

LoginForm.layout = {
    title: 'Вхід',
    subtitle: 'Увійдіть, використовуючи свою електронну пошту та пароль',
}
