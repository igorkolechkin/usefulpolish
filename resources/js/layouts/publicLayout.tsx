import type { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import { login, register } from '@/routes';

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="border-b border-border">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                    <Link href="/" className="font-semibold">
                        UsefulPolish
                    </Link>

                    <nav className="flex items-center gap-4 text-sm">
                        <Link href="/courses">Courses</Link>
                        <Link href={login()}>Log in</Link>
                        <Link href={register()}>Register</Link>
                    </nav>
                </div>
            </header>

            <main>{children}</main>

            <footer className="border-t border-border">
                <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
                    © UsefulPolish
                </div>
            </footer>
        </div>
    );
}