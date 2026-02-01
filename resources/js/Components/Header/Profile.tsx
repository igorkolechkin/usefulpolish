import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/react'

export default function Profile({ name }: { name: string }) {
  return (
    <div className="ml-auto py-1 relative group">
      <UserCircleIcon className="size-9 cursor-pointer text-gray-700 transition-colors hover:text-gray-500" />

      <div className="absolute top-full right-1/2 translate-x-1/2 max-[1420px]:translate-x-0 max-[1420px]:right-0 opacity-0 invisible w-48 z-10 bg-white rounded-md shadow-lg border border-gray-200 group-hover:opacity-100 group-hover:visible transition-all">
        <div className="text-sm px-4 py-2 border-b border-gray-100">
          { name }
        </div>
        <Link
          className="block w-full px-4 py-2 text-start text-sm text-gray-700 transition-colors hover:bg-gray-100"
          href={route('profile.edit')}
        >
          Редагувати профіль
        </Link>
        <Link
          className="block w-full px-4 py-2 text-start text-sm text-gray-700 transition-colors hover:bg-gray-100"
          href={route('logout')}
          method="post"
          as="button"
        >
          Вийти
        </Link>
      </div>
    </div>
  )
}