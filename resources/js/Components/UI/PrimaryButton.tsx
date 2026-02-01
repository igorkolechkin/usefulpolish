import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

export default function PrimaryButton({
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
        'inline-flex items-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-500 focus:bg-orange-500 focus:outline-none focus:ring-0 disabled:opacity-25',
        className
      ) }
      disabled={ disabled }
    >
      { children }
    </button>
  )
}
