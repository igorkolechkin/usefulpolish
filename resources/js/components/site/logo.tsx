import { Link, usePage } from "@inertiajs/react";

export default function Logo() {
	const url = usePage().url
	const logoIcon = 'UsefulPolish'

	return url === '/'
		? <span>{logoIcon}</span>
        : <Link href="/">{logoIcon}</Link>
}