import { Link } from '@inertiajs/react'
import { ChevronRight, GalleryHorizontalEnd } from 'lucide-react'
import { cards } from '@/routes/dashboard/dictionary'

export default function LearningOptions() {
    return (
        <div className="space-y-4 border-b border-border pb-7">
            <p className="text-2xl font-bold text-secondary">Вивчати слова</p>
            <div className="grid gap-4 md:grid-cols-2">
                <Link
                    href={cards()}
                    className="flex min-w-0 items-center gap-4 rounded-xl px-2 py-4 text-secondary transition-colors hover:bg-blue-soft focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-secondary motion-reduce:transition-none sm:gap-6"
                >
                    <GalleryHorizontalEnd className="size-9 shrink-0" strokeWidth={1.5} />
                    <div className="min-w-0 flex-1 space-y-1">
                        <p className="text-lg font-bold">Картки</p>
                        <p className="text-quiet">Перевертайте картки та згадуйте переклад.</p>
                    </div>
                    <ChevronRight className="size-5 shrink-0" />
                </Link>
            </div>
        </div>
    )
}
