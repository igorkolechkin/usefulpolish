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
    }
]

export default function Aside() {
    const { isCurrentUrl } = useCurrentUrl()

    return (
        <aside className="fixed top-0 left-0 h-full w-[300px] overflow-auto bg-white p-8">
            <nav>
                <ul className="flex flex-col gap-3">
                    <Link
                        href="/"
                        className="block rounded-md px-4 py-2 font-semibold transition-colors text-secondary mb-5"
                    >
                        Useful Polish
                    </Link>

                    {navItems.map((item) => (
                        <li key={item.title}>
                            <Link
                                href={item.href}
                                className={cn(
                                    'block rounded-md px-4 py-2 font-semibold transition-colors',
									!isCurrentUrl(item.href) && 'text-secondary hover:bg-muted',
                                    isCurrentUrl(item.href) && 'text-white bg-primary',
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
