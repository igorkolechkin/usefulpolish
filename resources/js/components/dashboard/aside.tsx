import { Link } from '@inertiajs/react'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { cn } from '@/lib/utils'
import { main, exercises } from '@/routes/dashboard'

const navItems = [
    {
        title: 'Головна',
        href: main(),
    },
    {
        title: 'Вправи',
        href: exercises(),
    },
]

export default function Aside() {
    const { isCurrentOrParentUrl } = useCurrentUrl()

    return (
        <aside className="fixed top-0 left-0 h-full w-[300px] overflow-auto bg-white p-8">
            <nav>
                <ul className="flex flex-col gap-3">
                    <Link
                        href="/"
                        className="mb-5 block rounded-md px-4 py-2 font-semibold text-secondary transition-colors"
                    >
                        Useful Polish
                    </Link>

                    {navItems.map(item => (
                        <li key={item.title}>
                            <Link
                                href={item.href}
                                className={cn(
                                    'block rounded-md px-4 py-2 font-semibold transition-colors',
                                    !isCurrentOrParentUrl(item.href) && 'text-secondary hover:bg-muted',
                                    isCurrentOrParentUrl(item.href) && 'bg-primary text-white',
                                )}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
