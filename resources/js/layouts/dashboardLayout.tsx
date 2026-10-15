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
                <Aside />
                <div className="lg:pl-[280px]">
                    <main className="mx-auto max-w-[1280px] px-5 pt-8 pb-12 outline-none sm:px-8 lg:px-12 lg:pt-16">
                        <header className="mb-6">
                            <p className="text-[2rem] leading-tight font-bold tracking-tight text-secondary sm:text-[3.5rem]">{title}</p>
                            {subtitle && <p className="mt-2 max-w-3xl text-base leading-relaxed text-quiet sm:text-xl">{subtitle}</p>}
                        </header>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
