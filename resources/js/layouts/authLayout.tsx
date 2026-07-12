import Logo from '@/components/site/logo'
import { Head } from '@inertiajs/react'

type Props = {
    children: React.ReactNode
    title?: string
    subtitle?: string
}

export default function AuthLayout({ children, title, subtitle }: Props) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen flex-col items-center justify-center bg-muted px-4 py-12">
                <div className="mb-8">
                    <Logo />
                </div>
                {title && <h3>{title}</h3>}
                {subtitle && (
                    <div className="mx-auto mt-3 max-w-[500px] text-center">{subtitle}</div>
                )}
                <section className="mt-8 w-full max-w-[460px] overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                    <div className="p-6">{children}</div>
                </section>
            </div>
        </>
    )
}
