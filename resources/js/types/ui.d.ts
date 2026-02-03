import { InertiaLinkProps } from '@inertiajs/react'

export type NavLinkType = InertiaLinkProps & {
  name: string;
  routeName: string;
}