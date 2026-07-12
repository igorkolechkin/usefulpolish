import { Form, Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import Input from '@/components/formElements/input'
import SubmitButton from '@/components/formElements/submitButton'
import { login } from '@/routes'
import { email as passwordEmail } from '@/routes/password'

export default function ForgotPassword({ status }: { status?: string }) {
    const [isShowStatus, setIsShowStatus] = useState(true)

    useEffect(() => {
        if (!status) {
            return
        }

        const timeoutId = window.setTimeout(() => setIsShowStatus(false), 10000)

        return () => window.clearTimeout(timeoutId)
    }, [status])

    return (
        <div className="space-y-6">
            {status && isShowStatus && (
                <div className="rounded-md bg-muted p-4 text-center text-sm font-semibold text-primary">
                    {status}
                </div>
            )}

            <Form {...passwordEmail.form()} className="space-y-4">
                {({ processing, errors }) => (
                    <>
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            error={errors.email}
                        />

                        <SubmitButton
                            text={processing ? 'Відправляємо...' : 'Відправити посилання'}
                            disabled={processing}
                        />
                    </>
                )}
            </Form>

            <Link
                href={login()}
                className="block text-center text-sm font-semibold text-primary hover:text-primary-hover"
            >
                Повернутися до входу
            </Link>
        </div>
    )
}

ForgotPassword.layout = {
    title: 'Відновлення пароля',
    subtitle: 'Вкажіть email, і ми надішлемо посилання для створення нового пароля',
}
