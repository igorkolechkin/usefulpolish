import { useFlashToast } from '@/hooks/use-flash-toast';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

function Toaster({ ...props }: ToasterProps) {
    useFlashToast();

    return (
        <Sonner
            theme="light"
            className="toaster group"
            position="top-right"
            toastOptions={{
                classNames: {
                    success: '[&_[data-icon]]:text-success',
                    error: '[&_[data-icon]]:text-error',
                    warning: '[&_[data-icon]]:text-amber-600',
                    info: '[&_[data-icon]]:text-secondary',
                },
            }}
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as React.CSSProperties
            }
            {...props}
        />
    );
}

export { Toaster };
