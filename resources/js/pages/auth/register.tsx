import { Form } from '@inertiajs/react'
import Input from '@/components/formElements/input'
import SubmitButton from '@/components/formElements/submitButton'
import { store } from '@/routes/register'

export default function RegisterForm() {
    return (
        <Form
            {...store.form()}
            resetOnSuccess={['password', 'password_confirmation']}
            className="space-y-4"
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

                    <SubmitButton text="Зареєструватися" disabled={processing} />
                </>
            )}
        </Form>
    )
}

RegisterForm.layout = {
    title: 'Створіть акаунт',
    subtitle: 'Заповніть форму нижче, щоб створити новий обліковий запис та розпочати навчання',
}
