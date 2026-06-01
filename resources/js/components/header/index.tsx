import { Link, usePage } from '@inertiajs/react'
import { UserNav } from '@/components/header/userNav'
import { login } from '@/routes'
import { Nav } from './Nav'

export default function Header() {
    const { auth } = usePage().props

    return (
		<div className="w-full">
			<header className="max-w-5xl flex items-center m-auto text-sm py-0 lg:py-5">
				LOGO
				<Nav />
				<div className='ml-auto'>
					{ auth.user ? (
						<UserNav />
					) : (
						<>
							<Link
								href={ login() }
								className="inline-block rounded-sm border px-5 py-1.5 text-sm leading-normal hover:bg-muted"
							>
								Увійти
							</Link>
						</>
					) }
				</div>
			</header>
		</div>
    )
}
