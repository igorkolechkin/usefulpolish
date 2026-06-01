import { Head } from '@inertiajs/react'
import Header from '@/components/header'

export default function Main({
    title,
    children,
}: {
    title?: string
    children: React.ReactNode
}) {
    return (
        <>
            <Head title={ title } />
            <div className="flex min-h-screen flex-col items-center bg-background text-foreground">
                <Header />
                <div className="flex w-full flex-1 items-center justify-center p-6 lg:p-8">
                    <main className="w-full max-w-4xl py-20">
                        { children }
                    </main>
                </div>
            </div>
        </>
    )
}
