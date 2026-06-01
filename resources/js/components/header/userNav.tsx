import { usePage } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useInitials } from '@/hooks/use-initials'
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import { logout } from '@/routes'

export function UserNav() {
    const { auth } = usePage().props
    const cleanup = useMobileNavigation()
    const getInitials = useInitials()
    const user = auth.user

    if (!user) {
        return null
    }

    const handleLogout = () => {
        cleanup()
        router.flushAll()
        router.post(logout().url)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                        <AvatarImage src={ user.avatar } alt={ user.name } />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            { getInitials(user.name) }
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                            { user.name }
                        </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                        <button
                            type="button"
                            className="flex w-full cursor-pointer items-center"
                            onClick={ handleLogout }
                            data-test="logout-button"
                        >
                            <LogOut className="mr-2" />
                            Вийти
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
