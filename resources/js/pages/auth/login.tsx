import { Form } from '@inertiajs/react'
import InputError from '@/components/input-error'
import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { store } from '@/routes/login'

type Props = {
    status?: string
}

export default function Login({ status }: Props) {
    return (
        <div className="space-y-6">
            { status && (
                <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                    { status }
                </div>
            ) }

            <Form
                { ...store.form() }
                resetOnSuccess={ ['password'] }
                className="space-y-5"
            >
                { ({ errors, processing }) => (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                autoFocus
                                required
                            />
                            <InputError message={ errors.email } />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Пароль</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="Ваш пароль"
                                autoComplete="current-password"
                                required
                            />
                            <InputError message={ errors.password } />
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                value="1"
                            />
                            <Label htmlFor="remember" className="text-sm">
                                Запамʼятати мене
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={ processing }
                        >
                            { processing && <Spinner /> }
                            Увійти
                        </Button>
                    </>
                ) }
            </Form>
        </div>
    )
}

Login.layout = {
    title: 'Вхід',
    description: 'Увійдіть в акаунт, щоб продовжити',
}
