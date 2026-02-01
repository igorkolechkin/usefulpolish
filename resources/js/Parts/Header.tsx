import { usePage } from '@inertiajs/react'
import Nav, { NavLinkType } from '@/Components/Header/Nav'
import Profile from '@/Components/Header/Profile'

export default function Header() {
  const { name, email } = usePage().props.auth.user

  const navLinks: NavLinkType[] = [
    { name: 'Головна', routeName: 'home' }
  ]

  if (email === 'admin@admin.com') {
    navLinks.push({ name: 'Адмiн панель', routeName: 'admin.home' })
  }

  return (
    <header className="bg-white shadow">
      <div className="container flex items-center">
        <Nav navLinks={ navLinks } />
        <Profile name={ name } />
      </div>
    </header>
  )
}