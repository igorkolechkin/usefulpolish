import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import SiteLayout from '@/layouts/siteLayout';
import DashboardLayout from '@/layouts/dashboardLayout';
import AuthLayout from '@/layouts/authLayout';

const appName = import.meta.env.VITE_APP_NAME || 'UsefulPolish';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name.startsWith('site/'):
                return SiteLayout;
            case name.startsWith('dashboard/'):
                return DashboardLayout;
            case name.startsWith('auth/'):
                return AuthLayout;
            default:
                return SiteLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
