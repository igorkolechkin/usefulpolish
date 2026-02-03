import { TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'

export default function Textarea({ className, rows, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> ) {

  return (
    <textarea
      { ...props }
      rows={ rows ?? 5 }
      className={ clsx(
        'rounded-md border-gray-300 shadow-sm active:border-indigo-500 active:ring-indigo-500',
        className
      ) }
    />
  )
}
