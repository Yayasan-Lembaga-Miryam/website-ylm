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
                        <img
                            src=""
                            alt="Foto Admin"
                            className="h-20 w-20 rounded-full bg-slate-400"
                        />
                        <div className="text-deep-blue">
                            <h1 className="text-2xl font-extrabold">Halo!</h1>
                            <h2 className="text-lg font-semibold">
                                {auth.user.name}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="-mt-[75px] flex min-h-[80vh] w-full items-center justify-center bg-[url(/images/bg-DashboardAdmin.webp)] bg-cover bg-top bg-no-repeat py-20 text-black">
                    <div className="w-[80%] flex justify-center gap-5 pt-20">
                        <Link
                            href="/admin/berita"
                            className="w-1/4 bg-dark-blue px-10 py-4 font-semibold text-white flex justify-center items-center rounded-2xl"
                        >
                            Berita
                        </Link>
                        <Link
                            href="/admin/beranda"
                            className="w-1/4 bg-dark-blue px-10 py-4 font-semibold text-white flex justify-center items-center rounded-2xl"
                        >
                            Foto Galeri
                        </Link>
                        {isSuperAdmin && (
                            <Link
                                href="/admin/beranda"
                                className="w-1/4 bg-dark-blue px-10 py-4 font-semibold text-white flex justify-center items-center rounded-2xl"
                            >
                                Pengurus & Staff
                            </Link>
                        )}
                        <Link
                            href="/admin/beranda"
                            className="w-1/4 bg-dark-blue px-10 py-4 font-semibold text-white flex justify-center items-center rounded-2xl"
                        >
                            Data Kepegawaian
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}
