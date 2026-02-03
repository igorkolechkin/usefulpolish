import clsx from 'clsx'
import { Link } from '@inertiajs/react'
import { NavLinkType } from '@/types/ui'

export default function NavLink({ routeName, name, ...props}: NavLinkType) {
  return (
    <Link
      { ...props }
      className={ clsx(
        'flex items-center text-gray-900 border-b-2 px-1 text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none',
        route().current(routeName)
          ? 'border-indigo-400 focus:border-indigo-700'
          : 'border-transparent hover:border-gray-300 hover:text-gray-500'
      ) }
      href={ route(routeName) }
    >
      { name }
    </Link>
  )
}