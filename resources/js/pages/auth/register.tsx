import { useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'
import Input from '@/components/ui/formElements/input'
import { store } from '@/routes/register'

export default function RegisterForm({ passwordRules }: { passwordRules: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        post(store.url())
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <Input
                label="Імʼя"
                name="name"
                type="text"
                autoComplete="name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                error={errors.name}
            />

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
                autoComplete="new-password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                error={errors.password}
            />

            <Input
                label="Повторіть пароль"
                name="password_confirmation"
                type="password"
                autoComplete="new-password"
                value={data.password_confirmation}
                onChange={e => setData('password_confirmation', e.target.value)}
                error={errors.password_confirmation}
            />

            <button
                type="submit"
                disabled={processing}
                className="w-full cursor-pointer rounded-md bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
            >
                Зареєструватися
            </button>
        </form>
    )
}

RegisterForm.layout = {
    title: 'Створіть акаунт',
    description: 'Заповніть форму нижче, щоб створити новий обліковий запис та розпочати навчання',
}
