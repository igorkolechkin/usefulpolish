import Aside from '@/components/dashboard/aside'
import { Head } from '@inertiajs/react'

export default function DashboardLayout({
    children,
    title,
}: {
    children: React.ReactNode
    title: string
}) {
    return (
        <>
            <Head title={title} />
            
            <div className="min-h-screen bg-[#f2f7ff]">
                <Aside />

                <div className="mx-[300px] p-8">
                    <p className="text-4xl text-secondary font-semibold mb-10">{title}</p>
                    <main className="grow-1">{children}</main>
                </div>
            </div>
        </>
    )
}
