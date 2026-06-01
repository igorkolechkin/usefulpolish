import { Link } from '@inertiajs/react'
import { home } from '@/routes'

export default function Auth({
    title = 'Авторизація',
    description,
    children,
}: {
    title?: string
    description?: string
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground">
            <div className="w-full max-w-sm space-y-8">
                <div className="space-y-4 text-center">
                    <Link
                        href={ home() }
                        className="inline-flex text-lg font-semibold tracking-tight"
                    >
                        Useful Polish
                    </Link>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            { title }
                        </h1>

                        { description && (
                            <p className="text-sm text-muted-foreground">
                                { description }
                            </p>
                        ) }
                    </div>
                </div>

                { children }
            </div>
        </div>
    )
}
