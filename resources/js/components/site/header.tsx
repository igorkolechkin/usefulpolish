import { Link, usePage } from '@inertiajs/react'
import { main as dashboard } from '@/routes/dashboard'
import { login, register } from '@/routes'
import type { Auth } from '@/types'

export default function Header() {
    const { auth } = usePage<{ auth: Auth }>().props

	return (
		<header className="border-b border-border">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
				<Link href="/" className="font-semibold">
					UsefulPolish
				</Link>
				
				<nav className="flex items-center gap-4 text-sm">
                    {auth.user ? (
                        <Link href={dashboard()}>Кабінет</Link>
                    ) : (
                        <>
                            <Link href={login()} className="hover:text-primary">Увійти</Link>
                            <Link href={register()} className="hover:text-primary">Регістрація</Link>
                        </>
                    )}
				</nav>
			</div>
		</header>
	)
}
