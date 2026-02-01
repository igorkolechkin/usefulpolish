import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'
import MainLayout from '@/Layouts/MainLayout'

type PropsType = PageProps<{
  mustVerifyEmail: boolean;
  status?: string
}>

export default function Edit({ mustVerifyEmail, status, }: PropsType) {

  return (
    <MainLayout title="Профiль">
      <div className="py-12 px-6">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <UpdateProfileInformationForm
              mustVerifyEmail={ mustVerifyEmail }
              status={ status }
              className="max-w-2xl"
            />
          </div>

          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <UpdatePasswordForm className="max-w-2xl" />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
