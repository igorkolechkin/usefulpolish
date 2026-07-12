import { Link, useForm } from '@inertiajs/react'
import { useEffect, useState, type FormEvent } from 'react'
import Input from '@/components/ui/formElements/input'
import { store } from '@/routes/login'
import { request as passwordRequest } from '@/routes/password'

export default function LoginForm({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })
    const [isShowStatus, setIsShowStatus] = useState(true)
    
        
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        post(store.url())
    }
        
    useEffect(() => {
        if (status !== 'verification-link-sent') {
            return
        }

        const timeoutId = window.setTimeout(() => setIsShowStatus(false), 10000)

        return () => window.clearTimeout(timeoutId)
    }, [status])

    return (
        <form onSubmit={submit} className="space-y-4">
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
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                error={errors.email}
            />

            <Input
                label="Пароль"
                name="password"
                type="password"
                autoComplete="current-password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                error={errors.password}
            />

            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    name="remember"
                    checked={data.remember}
                    onChange={e => setData('remember', e.target.checked)}
                    className="size-4 rounded border-border"
                />
                Запамʼятати мене
            </label>

            <button
                type="submit"
                disabled={processing}
                className="w-full rounded-md bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
            >
                Увійти
            </button>

            <Link
                href={passwordRequest()}
                className="block cursor-pointer text-center text-sm font-semibold text-primary hover:text-primary-hover disabled:opacity-60"
            >
                Забули пароль?
            </Link>
        </form>
    )
}

LoginForm.layout = {
    title: 'Вхід',
    subtitle: 'Увійдіть, використовуючи свою електронну пошту та пароль',
}
