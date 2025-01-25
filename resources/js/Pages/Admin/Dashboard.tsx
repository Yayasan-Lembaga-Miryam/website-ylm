import Layout from '@/Layout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }: any) {
    const isSuperAdmin = auth.user.role === 'adminsuper';
    return (
        <>
            <Layout isAdmin={true} isLogin={true}>
                <Head title="Admin Dashboard" />
                <div className="flex min-h-[80vh] items-center justify-center bg-[url(/images/bg-LandingNews.png)] bg-cover bg-top bg-no-repeat text-black">
                    <div className="flex w-[80%] items-center gap-6">
                        <div className="text-deep-blue">
                            <h1 className="text-2xl font-extrabold">Halo!</h1>
                            <h2 className="text-lg font-semibold">
                                {auth.user.name}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="-mt-[75px] flex min-h-[80vh] w-full items-center justify-center bg-[url(/images/bg-DashboardAdmin.webp)] bg-cover bg-top bg-no-repeat py-20 text-black">
                    <div className="w-[80%] grid grid-cols-3 mx-auto gap-5 pt-20">
                        <Link
                            href="/admin/berita"
                            className="w-full bg-dark-blue px-10 py-4 font-semibold text-white flex justify-center items-center rounded-2xl hover:bg-white hover:text-black"
                        >
                            Berita
                        </Link>
                        <Link
                            href="/admin/galeri/album"
                            className="w-full bg-dark-blue px-10 py-4 font-semibold text-white flex justify-center items-center rounded-2xl hover:bg-white hover:text-black"
                        >
                            Foto Galeri
                        </Link>
                        {isSuperAdmin && (
                            <>
                            <Link
                                href="/admin/pengurus"
                                className="w-full bg-dark-blue px-10 py-4 font-semibold text-white flex justify-center items-center rounded-2xl hover:bg-white hover:text-black"
                            >
                                Pengurus & Staff
                            </Link>
                            <Link
                                href="/admin/kurikulum"
                                className="w-full bg-dark-blue px-10 py-4 font-semibold text-white flex justify-center items-center rounded-2xl hover:bg-white hover:text-black"
                            >
                                Kurikulum
                            </Link>
                            </>
                        )}
                        <Link
                            href="/admin/unit"
                            className="w-full bg-dark-blue px-10 py-4 font-semibold text-white flex justify-center items-center rounded-2xl hover:bg-white hover:text-black"
                        >
                            Data Unit
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}
