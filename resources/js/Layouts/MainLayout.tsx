import { PropsWithChildren } from 'react'
import Header from '@/Parts/Header'
import Footer from '@/Parts/Footer'
import { Head } from '@inertiajs/react'

export default function MainLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
  return (
    <>
      <Head title={ title } />
      <div className="min-h-screen bg-gray-100">
        <Header />
        { children }
        <Footer />
      </div>
    </>
  )
}