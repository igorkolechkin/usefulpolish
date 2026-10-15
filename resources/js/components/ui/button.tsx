import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type Props = ComponentProps<'button'> & {
    variant?: 'default' | 'primary' | 'secondary'
}

export default function Button({ children, variant = 'default', type = 'button', className, ...buttonProps }: Props) {
    return (
        <button
            {...buttonProps}
            type={type}
            className={cn('button', `button--${variant}`, className)}
        >
            {children}
        </button>
    )
}
