import Aside from '@/components/dashboard/aside'

export default function DashboardLayout({
    children,
    title,
}: {
    children: React.ReactNode
    title: string
}) {
    return (
        <div className="min-h-screen bg-[#f2f7ff]">
            <Aside />

            <div className="ml-[300px] p-8">
                <p className='font-lg mb-5'>{title}</p>
                <main className="grow-1">{children}</main>
            </div>
        </div>
    )
}
