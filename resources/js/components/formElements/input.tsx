import type { ChangeEventHandler } from 'react'
import { cn } from '@/lib/utils'

type Props = {
    label: string
    name: string
    type: string
    autoComplete?: string
    defaultValue?: string
    error?: string
    value?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function Input({
    label,
    name,
    type,
    autoComplete,
    defaultValue,
    error,
    value,
    onChange,
}: Props) {
    const valueProps =
        value === undefined
            ? { defaultValue }
            : { onChange, value }

    return (
        <label className="block">
            <div className="relative">
                <input
                    name={name}
                    type={type}
                    placeholder=" "
                    autoComplete={autoComplete}
                    {...valueProps}
                    className={cn(
                        'peer w-full rounded-md border border-input bg-white px-4 pt-6 pb-2 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/15',
                        error && 'border-destructive focus:border-destructive',
                    )}
                />
                <span
                    className={cn(
                        'pointer-events-none absolute top-2 left-4 text-xs font-semibold text-slate transition-all',
                        'peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal',
                        'peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary',
                        error && 'text-destructive peer-focus:text-destructive',
                    )}
                >
                    {label}
                </span>
            </div>
            {error && (
                <span className="mt-1 block text-sm text-destructive">
                    {error}
                </span>
            )}
        </label>
    )
}
