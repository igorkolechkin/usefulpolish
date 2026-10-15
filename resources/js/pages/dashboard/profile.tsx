import { useForm, usePage } from '@inertiajs/react'
import type { FormEvent } from 'react'
import Input from '@/components/formElements/input'
import Button from '@/components/ui/button'
import { update as updateProfile } from '@/routes/profile'
import { update as updatePassword } from '@/routes/user-password'

export default function Profile() {
    const { user } = usePage().props.auth
    const profile = useForm({ name: user.name })
    const password = useForm({ current_password: '', password: '', password_confirmation: '' })

    const saveProfile = (event: FormEvent) => {
        event.preventDefault()
        profile.patch(updateProfile.url(), { preserveScroll: true })
    }

    const savePassword = (event: FormEvent) => {
        event.preventDefault()
        password.put(updatePassword.url(), {
            preserveScroll: true,
            onSuccess: () => password.reset(),
            onError: () => password.reset('current_password', 'password', 'password_confirmation'),
        })
    }

    return (
        <div className="max-w-3xl space-y-6">
            <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <p className="text-2xl leading-tight font-bold text-secondary">Особисті дані</p>
                <p className="mt-2 text-quiet">Тут можна змінити ім’я у своєму акаунті.</p>
                <form onSubmit={saveProfile} className="mt-6 space-y-5">
                    <fieldset disabled={profile.processing} className="space-y-5">
                        <Input
                            label="Ім’я"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={profile.data.name}
                            onChange={event => profile.setData('name', event.target.value)}
                            error={profile.errors.name}
                        />
                        <div className="rounded-xl bg-canvas px-4 py-3">
                            <p className="text-sm text-quiet">Email</p>
                            <p className="mt-1 font-medium wrap-anywhere text-secondary">
                                {user.email}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <Button type="submit" variant="primary" disabled={profile.processing}>
                                Зберегти зміни
                            </Button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <p className="text-2xl leading-tight font-bold text-secondary">Зміна пароля</p>
                <p className="mt-2 text-quiet">Введіть поточний пароль і виберіть новий.</p>
                <form onSubmit={savePassword} className="mt-6 space-y-5">
                    <fieldset disabled={password.processing} className="space-y-5">
                        <Input
                            label="Поточний пароль"
                            name="current_password"
                            type="password"
                            autoComplete="current-password"
                            value={password.data.current_password}
                            onChange={event =>
                                password.setData('current_password', event.target.value)
                            }
                            error={password.errors.current_password}
                        />
                        <Input
                            label="Новий пароль"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            value={password.data.password}
                            onChange={event => password.setData('password', event.target.value)}
                            error={password.errors.password}
                        />
                        <Input
                            label="Повторіть новий пароль"
                            name="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            value={password.data.password_confirmation}
                            onChange={event =>
                                password.setData('password_confirmation', event.target.value)
                            }
                            error={password.errors.password_confirmation}
                        />
                        <div className="flex flex-wrap items-center gap-4">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={password.processing}
                            >
                                Змінити пароль
                            </Button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    )
}

Profile.layout = { title: 'Профіль' }
