import { Volume2 } from 'lucide-react'

export default function SpeechButton() {
    return (
        <button
            type="button"
            className="pointer-events-auto flex size-12 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full bg-blue-soft text-secondary disabled:cursor-default"
        >
            <Volume2 className="size-6" />
        </button>
    )
}
