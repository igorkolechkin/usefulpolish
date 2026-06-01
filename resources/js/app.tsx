import { createInertiaApp } from '@inertiajs/react'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Main from './layouts/main'
import Auth from './layouts/auth'

const appName = 'Useful Polish'

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name.startsWith('auth/'):
                return Auth;
            default:
                return Main
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={ 0 }>
                { app }
                <Toaster />
            </TooltipProvider>
        )
    },
    progress: {
        color: '#4B5563',
    },
})
