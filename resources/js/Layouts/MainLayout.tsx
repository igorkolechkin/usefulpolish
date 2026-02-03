import { PropsWithChildren } from 'react'
import Header from '@/Parts/Header'
import Footer from '@/Parts/Footer'
import { Head } from '@inertiajs/react'

export default function MainLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
  return (
    <>
      <Head title={ title } />
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <div className="container py-6 sm:flex sm:flex-grow sm:py-12">
          { children }
        </div>
        <Footer />
      </div>
    </>
  )
}