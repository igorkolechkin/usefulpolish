import { Head, Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import { home } from '@/routes'

type Props = {
    children: React.ReactNode
    title?: string
    subtitle?: string
}

export default function AuthLayout({ children, title, subtitle }: Props) {
    return (
        <>
            <Head title={title} />

            <div className="flex min-h-dvh flex-col bg-canvas text-ink">
                <header className="border-b border-border bg-white">
                    <div className="mx-auto flex min-h-20 max-w-[1200px] flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8 lg:px-12">
                        <Link
                            href={home()}
                            className="rounded-lg text-[1.6rem] leading-tight font-bold tracking-tight text-secondary focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-secondary sm:text-[1.8rem]"
                        >
                            Useful<span className="text-brand">Polish</span>
                        </Link>
                        <Link
                            href={home()}
                            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 font-medium text-secondary transition-colors hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none"
                        >
                            <ArrowLeft className="size-5" strokeWidth={1.8} />
                            На головну
                        </Link>
                    </div>
                </header>

                <main className="flex grow items-center justify-center px-5 py-10 sm:px-8 sm:py-16">
                    <div className="w-full max-w-[560px] rounded-[24px] border border-border bg-white px-5 py-8 shadow-[0_12px_40px_-24px_rgb(37_57_111_/_0.22)] sm:px-10 sm:py-10">
                        <div className="mb-8 h-1.5 w-14 rounded-full bg-brand" />
                        {title && (
                            <p className="text-[2rem] leading-tight font-bold tracking-tight text-secondary sm:text-[2.5rem]">
                                {title}
                            </p>
                        )}
                        {subtitle && (
                            <p className="mt-3 text-base leading-relaxed text-quiet sm:text-lg">
                                {subtitle}
                            </p>
                        )}
                        <div className="mt-8">{children}</div>
                    </div>
                </main>
            </div>
        </>
    )
}
