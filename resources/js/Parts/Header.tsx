import { usePage } from '@inertiajs/react'
import Nav, { NavLinkType } from '@/Components/Header/Nav'
import Profile from '@/Components/Header/Profile'

export default function Header() {
  const { name } = usePage().props.auth.user

  const navLinks: NavLinkType[] = [
    { name: 'Головна', routeName: 'home' }
  ]

  return (
    <header className="bg-white shadow">
      <div className="container flex items-center">
        <Nav navLinks={ navLinks } />
        <Profile name={ name } />
      </div>
    </header>
  )
}