type Props = {
    disabled?: boolean
    text: string
    variant?: 'default' | 'auth' | 'secondary'
}

export default function SubmitButton({ disabled = false, text, variant = 'default' }: Props) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={variant === 'default'
                ? 'w-full cursor-pointer rounded-md bg-primary px-4 py-3 font-medium text-white transition hover:bg-primary-hover disabled:cursor-default disabled:opacity-60'
                : variant === 'secondary'
                    ? 'min-h-13 w-full rounded-xl border border-control-border bg-white px-5 py-3 font-medium text-secondary transition-colors hover:bg-blue-soft focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary disabled:cursor-default disabled:opacity-60 motion-reduce:transition-none'
                    : 'min-h-13 w-full rounded-xl bg-brand px-5 py-3 font-bold text-white transition-colors hover:bg-brand-hover focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary disabled:cursor-default disabled:opacity-60 motion-reduce:transition-none'}
        >
            {text}
        </button>
    )
}
