import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

export default function SecondaryButton({
  type = 'button',
  className = '',
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      { ...props }
      type={ type }
      className={ clsx(
        'inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-0 disabled:opacity-25',
        className
      ) }
      disabled={ disabled }
    >
      { children }
    </button>
  )
}
