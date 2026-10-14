import * as Dialog from '@radix-ui/react-dialog'
import { Link } from '@inertiajs/react'
import { NotebookText, House, LogOut, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { cn } from '@/lib/utils'
import { home, logout } from '@/routes'
import { main, exercises } from '@/routes/dashboard'

const navItems = [
    { title: 'Головна', href: main(), icon: House },
    { title: 'Вправи', href: exercises(), icon: NotebookText },
]

function Brand({ onNavigate }: { onNavigate?: () => void }) {
    return (
        <Link href={home()} onClick={onNavigate} className="inline-flex rounded-lg text-[1.8rem] leading-tight font-bold tracking-tight text-secondary focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-secondary">
            Useful<span className="text-brand">Polish</span>
        </Link>
    )
}

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
    const { isCurrentOrParentUrl } = useCurrentUrl()

    return (
        <div className="flex min-h-full flex-col px-5 pt-10 pb-6">
            <div className="px-3"><Brand onNavigate={onNavigate} /></div>
            <nav className="mt-14 flex-1">
                <p className="mb-4 px-3 text-sm font-medium text-quiet">Навчання</p>
                <ul className="flex flex-col gap-2">
                    {navItems.map(item => {
                        const isActive = isCurrentOrParentUrl(item.href)
                        const Icon = item.icon

                        return (
                            <li key={item.title}>
                                <Link href={item.href} onClick={onNavigate} className={cn(
                                    'flex min-h-14 items-center gap-4 rounded-2xl px-4 py-3 text-lg font-bold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none',
                                    isActive ? 'bg-brand-soft text-brand' : 'text-secondary hover:bg-canvas',
                                )}>
                                    <Icon className="size-6 shrink-0" strokeWidth={1.8} />
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div className="mt-10 border-t border-border pt-4">
                <Link href={logout()} as="button" onClick={onNavigate} className="flex min-h-12 w-full items-center gap-4 rounded-xl px-4 py-3 text-left font-medium text-quiet transition-colors hover:bg-brand-soft hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none">
                    <LogOut className="size-6" strokeWidth={1.8} />
                    Вийти
                </Link>
            </div>
        </div>
    )
}

export default function Aside() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const desktop = window.matchMedia('(min-width: 1024px)')
        const closeOnDesktop = () => {
            if (desktop.matches) setIsOpen(false)
        }
        desktop.addEventListener('change', closeOnDesktop)
        return () => desktop.removeEventListener('change', closeOnDesktop)
    }, [])

    return (
        <>
            <aside className="fixed inset-y-0 left-0 hidden w-[280px] overflow-y-auto border-r border-border bg-white lg:block">
                <Navigation />
            </aside>
            <header className="flex items-center justify-between gap-4 border-b border-border bg-white px-5 py-4 lg:hidden">
                <Brand />
                <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                    <Dialog.Trigger asChild>
                        <button type="button" title="Відкрити меню" className="flex size-12 items-center justify-center rounded-xl border border-border text-secondary hover:bg-canvas focus-visible:outline-3 focus-visible:outline-secondary">
                            <Menu />
                        </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 z-40 bg-secondary/30" />
                        <Dialog.Content aria-describedby={undefined} className="fixed inset-y-0 left-0 z-50 w-[min(320px,90vw)] overflow-y-auto bg-white shadow-xl">
                            <Dialog.Title className="sr-only">Меню навчання</Dialog.Title>
                            <Dialog.Close asChild>
                                <button type="button" title="Закрити меню" className="absolute top-2 right-2 flex size-11 items-center justify-center rounded-xl text-quiet hover:bg-canvas focus-visible:outline-3 focus-visible:outline-secondary">
                                    <X className="size-5" />
                                </button>
                            </Dialog.Close>
                            <Navigation onNavigate={() => setIsOpen(false)} />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </header>
        </>
    )
}
