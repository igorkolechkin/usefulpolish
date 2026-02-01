import { Head } from '@inertiajs/react'
import { PropsWithChildren } from 'react'

export default function GuestLayout({ children, title }: PropsWithChildren<{ title?: string}>) {
  return (
    <>
      <Head title={ title } />
      <div className="min-h-screen bg-gray-100 flex p-5">
        { children }
      </div>
    </>
  )
}
