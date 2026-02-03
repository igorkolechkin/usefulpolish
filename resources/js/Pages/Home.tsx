import MainLayout from '@/Layouts/MainLayout'

export default function Home() {
  return (
    <>
      <MainLayout title="Головна">
        <main className="bg-white w-full p-4 shadow rounded-lg sm:p-6">
          Main page content
        </main>
      </MainLayout>
    </>
  );
}
