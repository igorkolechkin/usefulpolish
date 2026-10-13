import Aside from '@/components/dashboard/aside'
import { Head } from '@inertiajs/react'

export default function DashboardLayout({
    children,
    title,
    subtitle,
}: {
    children: React.ReactNode
    title: string
    subtitle?: string
}) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-dvh bg-canvas text-ink">
                <a href="#main-content" className="sr-only fixed top-3 left-3 z-60 rounded-xl bg-secondary px-5 py-3 text-white focus:not-sr-only">Перейти до вмісту</a>
                <Aside />
                <div className="lg:pl-[280px]">
                    <main id="main-content" tabIndex={-1} className="mx-auto max-w-[1280px] px-5 pt-8 pb-12 outline-none sm:px-8 lg:px-12 lg:pt-16">
                        <header className="mb-6">
                            <h1 className="text-[2rem] leading-tight font-bold tracking-tight sm:text-[3.5rem]">{title}</h1>
                            {subtitle && <p className="mt-2 max-w-3xl text-base leading-relaxed text-quiet sm:text-xl">{subtitle}</p>}
                        </header>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
