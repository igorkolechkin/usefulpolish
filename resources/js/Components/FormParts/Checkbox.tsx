import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

export default function Checkbox({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      { ...props }
      type="checkbox"
      className={ clsx(
        'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-0',
        className
      ) }
    />
  )
}
