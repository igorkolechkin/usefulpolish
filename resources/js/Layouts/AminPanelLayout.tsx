import MainLayout from '@/Layouts/MainLayout'
import NavLink from '@/Components/UI/NavLink'
import { NavLinkType } from '@/types/ui'
import { PropsWithChildren } from 'react'
import FloatPrompt from '@/Components/UI/FloatPrompt'

type PropsType = PropsWithChildren<{
  title?: string;
  message?: string;
}>

export default function AminPanelLayout({ children, message, title = 'Адмiн панель' }: PropsType) {
  const asideNav = [
    { name: 'Завдання', routeName: 'admin.exercises.index' }
  ]

  return (
    <MainLayout title={ title }>
      <div className="w-full space-y-5 sm:flex sm:space-y-0 sm:space-x-7">
        <aside className="bg-white p-4 shadow rounded-lg lg:min-w-72 md:min-w-56 sm:p-6 sm:min-w-48">
          <nav className="space-x-8 flex">
            { asideNav.map((data: NavLinkType) =>
              <NavLink key={ `${data.routeName}-${data.name}` } { ...data} />) }
          </nav>
        </aside>

        <main className="bg-white p-4 shadow rounded-lg sm:p-6 sm:flex-1">
          { children }
        </main>
      </div>

      { message && <FloatPrompt message={ message } /> }
    </MainLayout>
  )
}