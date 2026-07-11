import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import SiteLayout from '@/layouts/siteLayout';
import DashboardLayout from '@/layouts/dashboardLayout';

const appName = import.meta.env.VITE_APP_NAME || 'UsefulPolish';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        console.log(name);
        
        switch (true) {
            case name.startsWith('site/'):
                return SiteLayout;
            case name.startsWith('dashboard/'):
                return DashboardLayout;
            case name.startsWith('auth/'):
                return AppLayout;
            default:
                return AppLayout;
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
