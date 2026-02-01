import { InertiaLinkProps, Link } from '@inertiajs/react'
import clsx from 'clsx'

export type NavLinkType = InertiaLinkProps & {
  name: string;
  routeName: string;
}

export default function Nav({ navLinks }: { navLinks: NavLinkType[] }) {
  return (
    <nav className="h-16 space-x-8 flex">
      { navLinks.map(({ name, routeName, ...props }) => (
        <Link
          { ...props }
          className={ clsx(
            'flex items-center text-gray-900 border-b-2 px-1 text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none',
            route().current(routeName)
              ? 'border-indigo-400 focus:border-indigo-700'
              : 'border-transparent hover:border-gray-300 hover:text-gray-500'
          ) }
          key={ `${routeName}-${name}` }
          href={ route(routeName) }
        >
          { name }
        </Link>
      )) }
    </nav>
  )
}