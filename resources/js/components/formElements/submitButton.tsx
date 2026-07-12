type Props = {
    disabled?: boolean
    text: string
}

export default function SubmitButton({ disabled = false, text }: Props) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className="w-full cursor-pointer rounded-md bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary-hover disabled:cursor-default disabled:opacity-60"
        >
            {text}
        </button>
    )
}
