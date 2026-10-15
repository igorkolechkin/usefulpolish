import { ArrowRight, CircleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import Button from '@/components/ui/button'

type Props = {
    description: ReactNode
    children: ReactNode
    onCheck: () => void
    checkDisabled: boolean
    incorrectAnswer: {
		status: boolean
        title: string
        text: string
    }
}

export default function ExerciseWrap({
    description,
    children,
    onCheck,
    checkDisabled,
    incorrectAnswer,
}: Props) {
    return (
        <section className="space-y-8 rounded-3xl border border-border bg-white p-6 sm:p-9 lg:p-10">
            <div className="space-y-3">{description}</div>

            <div className="space-y-7">{children}</div>

            {incorrectAnswer.status && (
                <div className="flex items-start gap-3 rounded-2xl border-l-4 border-error bg-error-soft p-5 text-error">
                    <CircleAlert className="mt-1 size-6 shrink-0" />
                    <div>
                        <p className="font-bold">{incorrectAnswer.title}</p>
                        <p className="mt-1 leading-relaxed">{incorrectAnswer.text}</p>
                    </div>
                </div>
            )}

            <div className="flex justify-end border-t border-border pt-6">
                <Button
                    type="button"
                    variant="primary"
                    disabled={checkDisabled}
                    onClick={onCheck}
                    className="gap-3 disabled:cursor-not-allowed disabled:bg-canvas disabled:text-quiet disabled:opacity-100"
                >
                    Перевірити <ArrowRight className="size-5" />
                </Button>
            </div>
        </section>
    )
}
