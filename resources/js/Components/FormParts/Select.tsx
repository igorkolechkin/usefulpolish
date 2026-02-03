import { SelectHTMLAttributes } from 'react'
import clsx from 'clsx'

type PropsType = SelectHTMLAttributes<HTMLSelectElement> & {
  options: {
    value: string;
    name: string;
  }[],
  emptyPlaceholder?: string
}

export default function Select({ options, className, emptyPlaceholder, ...props }: PropsType) {
  return (
    <select
      { ...props }
      className={ clsx(
        'rounded-md border-gray-300 shadow-sm cursor-pointer',
        className
      ) }
    >
      { emptyPlaceholder ? <option value="" disabled>{ emptyPlaceholder }</option> : ''}

      { options.map(option => (
        <option key={option.value} value={ option.value }>
          { option.name }
        </option>
      ))}
    </select>
  )
}
