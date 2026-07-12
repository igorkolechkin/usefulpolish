import Header from '../components/site/header'
import Footer from '@/components/site/footer'
import { Head } from '@inertiajs/react'

type Props = {
    children: React.ReactNode,
    title?: string
}

export default function SiteLayout({ children, title }: Props) {
    return (
        <>
            <Head title={title ?? 'Сторінка'} />

            <div className="flex min-h-screen flex-col">
                <Header />

                <main className="grow-1">{children}</main>

                <Footer />
            </div>
        </>
    )
}
