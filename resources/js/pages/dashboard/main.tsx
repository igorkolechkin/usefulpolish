import { Link, usePage } from '@inertiajs/react'
import { ArrowRight, BookOpen, NotebookText } from 'lucide-react'
import { exercises } from '@/routes/dashboard'
import { index as dictionary } from '@/routes/dashboard/dictionary'
import { edit as profile } from '@/routes/profile'

const sections = [
    { title: 'Вправи', description: 'Практикуйте польську та закріплюйте знання у завданнях.', href: exercises(), icon: NotebookText, action: 'До вправ' },
    { title: 'Мій словник', description: 'Зберігайте польські слова, переклади та приклади в одному місці.', href: dictionary(), icon: BookOpen, action: 'Відкрити словник' },
]

export default function Main() {
    const { user } = usePage().props.auth

    return (
        <div className="space-y-7">
            <div className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-border bg-white p-6 sm:p-8">
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold wrap-anywhere">Вітаємо, {user.name}!</h2>
                    <p className="mt-2 text-quiet">Оберіть, над чим хочете попрацювати сьогодні.</p>
                </div>
                <Link href={profile()} className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 font-medium text-secondary hover:bg-blue-soft">Мій профіль <ArrowRight className="size-5" /></Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
                {sections.map(section => (
                    <Link key={section.title} href={section.href} className="flex flex-col items-start gap-5 rounded-3xl border border-border bg-white p-6 transition-shadow duration-200 hover:shadow-lg hover:shadow-secondary/10 motion-reduce:transition-none sm:p-8">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand"><section.icon className="size-7" strokeWidth={1.8} /></div>
                        <div><h2 className="text-2xl font-bold">{section.title}</h2><p className="mt-3 leading-relaxed text-quiet">{section.description}</p></div>
                        <span className="mt-auto inline-flex items-center gap-3 pt-3 font-bold text-brand">{section.action}<ArrowRight className="size-5" /></span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

Main.layout = { title: 'Кабінет' }
