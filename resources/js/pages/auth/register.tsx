import { Form, Link } from '@inertiajs/react'
import Input from '@/components/formElements/input'
import SubmitButton from '@/components/formElements/submitButton'
import { store } from '@/routes/register'
import { login } from '@/routes'

export default function RegisterForm() {
    return (
        <Form
            {...store.form()}
            resetOnSuccess={['password', 'password_confirmation']}
            className="space-y-5"
        >
            {({ processing, errors }) => (
                <>
                    <Input
                        label="Імʼя"
                        name="name"
                        type="text"
                        autoComplete="name"
                        error={errors.name}
                    />

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
                        autoComplete="new-password"
                        error={errors.password}
                    />

                    <Input
                        label="Повторіть пароль"
                        name="password_confirmation"
                        type="password"
                        autoComplete="new-password"
                        error={errors.password_confirmation}
                    />

                    <SubmitButton text="Зареєструватися" disabled={processing} variant="auth" />
                    <p className="border-t border-border pt-5 text-center text-quiet">
                        Уже маєте акаунт?{' '}
                        <Link href={login()} className="rounded-lg font-bold text-secondary hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary">Увійти</Link>
                    </p>
                </>
            )}
        </Form>
    )
}

RegisterForm.layout = {
    title: 'Створіть акаунт',
    subtitle: 'Заповніть форму нижче, щоб створити новий обліковий запис та розпочати навчання',
}
