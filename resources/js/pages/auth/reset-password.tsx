import { Form } from '@inertiajs/react'
import Input from '@/components/formElements/input'
import Button from '@/components/ui/button'
import { update } from '@/routes/password'

export default function ResetPassword({ token, email }: { token: string; email: string }) {
    return (
        <Form
            {...update.form()}
            resetOnSuccess={['password', 'password_confirmation']}
            className="space-y-5"
        >
            {({ processing, errors }) => (
                <>
                    <input type="hidden" name="token" value={token} />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        defaultValue={email}
                        error={errors.email}
                    />

                    <Input
                        label="Новий пароль"
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

                    <Button type="submit" disabled={processing} variant="primary" className="w-full">
                        Зберегти новий пароль
                    </Button>
                </>
            )}
        </Form>
    )
}

ResetPassword.layout = {
    title: 'Новий пароль',
    subtitle: 'Вкажіть новий пароль для свого акаунта',
}
