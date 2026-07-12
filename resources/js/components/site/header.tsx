import { Link, usePage } from '@inertiajs/react'
import { login, register } from '@/routes'
import { main as dashboard } from '@/routes/dashboard'
import type { Auth } from '@/types'
import Logo from './logo'

export default function Header() {
    const { auth } = usePage<{ auth: Auth }>().props

	return (
		<header className="border-b border-border">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
				<Logo />
				
				<nav className="flex items-center gap-4 text-sm">
                    {auth.user ? (
                        <Link href={dashboard()}>Кабінет</Link>
                    ) : (
                        <>
                            <Link href={login()} className="hover:text-primary">
                                Увійти
                            </Link>
                            <Link href={register()} className="hover:text-primary">
                                Регістрація
                            </Link>
                        </>
                    )}
				</nav>
			</div>
		</header>
	)
}
