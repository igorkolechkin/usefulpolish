import { InertiaLinkProps } from '@inertiajs/react'

export type NavLinkType = InertiaLinkProps & {
  name: string,
  routeName: string
}

export type FlashType = {
  success: string | null,
  error: string | null,
  notice: string | null
}

export type PropsMessageType = {
  text: string | null,
  type: 'success' | 'notice' | 'error' | null
}