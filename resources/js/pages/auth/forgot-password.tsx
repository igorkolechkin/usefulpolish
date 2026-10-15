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
                <div className="rounded-xl border border-success/20 bg-success-soft p-4 font-medium text-success">
                    {status}
                </div>
            )}

            <Form {...passwordEmail.form()} className="space-y-5">
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
                            text="Відправити посилання"
                            disabled={processing}
                            variant="auth"
                        />
                    </>
                )}
            </Form>

            <Link
                href={login()}
                className="block rounded-lg text-center font-medium text-secondary hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
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
