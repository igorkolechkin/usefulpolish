import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import clsx from 'clsx'

type PropsType = {
  as?: 'button' | 'a'
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>

type ComponentType = 'button' | 'a'

export default function PrimaryButton({
  as,
  type = 'button',
  className = '',
  disabled,
  children,
  ...props
}: PropsType) {
  const Component: ComponentType = as || 'button'

  return (
    <Component
      { ...props }
      className={ clsx(
        'inline-flex items-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-500 focus:bg-orange-500 focus:outline-none focus:ring-0 disabled:opacity-25',
        disabled && Component === 'a' && 'pointer-events-none opacity-25',
        className
      ) }
      disabled={Component === 'button' ? disabled : undefined}
    >
      { children }
    </Component>
  )
}
