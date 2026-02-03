import { PageProps } from '@/types'
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
      <div className="space-y-6 w-full">
        <div className="bg-white p-4 shadow rounded-lg sm:p-8">
          <UpdateProfileInformationForm
            mustVerifyEmail={ mustVerifyEmail }
            status={ status }
            className="max-w-2xl"
          />
        </div>

        <div className="bg-white p-4 shadow rounded-lg sm:p-8">
          <UpdatePasswordForm className="max-w-2xl" />
        </div>
      </div>
    </MainLayout>
  )
}
