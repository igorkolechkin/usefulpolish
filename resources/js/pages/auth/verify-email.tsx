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
                <div className="mb-6 rounded-xl border border-success/20 bg-success-soft p-4 font-medium text-success">
                    Новий лист для підтвердження email відправлено.
                </div>
            )}

            <div className="space-y-5">
                <p className="text-base leading-relaxed text-ink">
                    Ми відправили лист із посиланням для підтвердження. Перевірте пошту та перейдіть
                    за посиланням, щоб продовжити навчання.
                </p>

                <Form {...send.form()}>
                    {({ processing }) => (
                        <SubmitButton
                            text="Відправити лист ще раз"
                            disabled={processing}
                            variant="auth"
                        />
                    )}
                </Form>

                <Form {...logout.form()}>
                    {({ processing }) => (
                        <SubmitButton
                            text="Вийти з акаунта"
                            disabled={processing}
                            variant="secondary"
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
