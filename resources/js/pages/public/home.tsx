import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Home page" />
            Home page
        </>
    );
}
