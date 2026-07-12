import { Form } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { logout } from '@/routes'
import { send } from '@/routes/verification'
import SubmitButton from '@/components/formElements/submitButton'

export default function VerifyEmail({ status }: { status?: string }) {
    const [isShowStatus, setIsShowStatus] = useState(true)

    useEffect(() => {
        if (status !== 'verification-link-sent') {
            return
        }

        const timeoutId = window.setTimeout(() => setIsShowStatus(false), 10000)

        return () => window.clearTimeout(timeoutId)
    }, [status])

    return (
        <>
            {status === 'verification-link-sent' && isShowStatus && (
                <div className="mb-4 rounded-md bg-muted p-4 text-center text-sm font-semibold text-primary">
                    Новий лист для підтвердження email відправлено.
                </div>
            )}

            <div className="space-y-6 text-center">
                <p className="text-sm leading-6">
                    Ми відправили лист із посиланням для підтвердження. Перевірте пошту та перейдіть
                    за посиланням, щоб продовжити навчання.
                </p>

                <Form {...send.form()}>
                    {({ processing }) => (
                        <SubmitButton
                            text={processing ? 'Відправляємо...' : 'Відправити лист ще раз'}
                            disabled={processing}
                        />
                    )}
                </Form>

                <Form {...logout.form()}>
                    {({ processing }) => (
                        <SubmitButton
                            text="Вийти з акаунта"
                            disabled={processing}
                        />
                    )}
                </Form>
            </div>
        </>
    )
}

VerifyEmail.layout = {
    title: 'Підтвердіть email',
}
