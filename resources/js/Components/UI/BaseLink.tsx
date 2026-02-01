import { InertiaLinkProps, Link } from '@inertiajs/react'
import clsx from 'clsx'

export default function BaseLink({
  children,
  className,
  ...props
}: InertiaLinkProps) {
  return (
    <Link
      href={ route('password.request') }
      className={ clsx(
        'rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-0',
        className
      )}
      { ...props }
    >
      { children }
    </Link>
  );
}
