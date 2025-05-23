import Layout from '@/Layout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }: any) {
    const isSuperAdmin = auth.user.role === 'adminsuper';
    return (
        <>
            <Layout isAdmin={true} isLogin={true}>
                <Head title="Admin Dashboard" />
                <div
                    className="flex min-h-[80vh] items-center justify-center bg-cover bg-top bg-no-repeat text-black"
                    style={{
                        backgroundImage: "url('/images/bg-LandingNews.png')",
                    }}
                >
                    <div className="flex w-[80%] items-center gap-6">
                        <div className="text-deep-blue">
                            <h1 className="text-2xl font-extrabold">Halo!</h1>
                            <h2 className="text-lg font-semibold">
                                {auth.user.name}
                            </h2>
                        </div>
                    </div>
                </div>
                <div
                    className="-mt-[75px] flex min-h-[80vh] w-full items-center justify-center bg-cover bg-top bg-no-repeat py-20 text-black"
                    style={{
                        backgroundImage:
                            "url('/images/bg-DashboardAdmin.webp')",
                    }}
                >
                    <div className="mx-auto grid w-[80%] grid-cols-1 gap-5 pt-20 md:grid-cols-3">
                        <Link
                            href="/admin/berita"
                            className="flex w-full items-center justify-center rounded-2xl bg-dark-blue px-10 py-4 font-semibold text-white hover:bg-white hover:text-black"
                        >
                            Berita
                        </Link>
                        <Link
                            href="/admin/galeri/album"
                            className="flex w-full items-center justify-center rounded-2xl bg-dark-blue px-10 py-4 font-semibold text-white hover:bg-white hover:text-black"
                        >
                            Foto Galeri
                        </Link>
                        {isSuperAdmin && (
                            <>
                                <Link
                                    href="/admin/pengurus"
                                    className="flex w-full items-center justify-center rounded-2xl bg-dark-blue px-10 py-4 font-semibold text-white hover:bg-white hover:text-black"
                                >
                                    Pengurus & Staff
                                </Link>
                                <Link
                                    href="/admin/kurikulum"
                                    className="flex w-full items-center justify-center rounded-2xl bg-dark-blue px-10 py-4 font-semibold text-white hover:bg-white hover:text-black"
                                >
                                    Kurikulum
                                </Link>
                            </>
                        )}
                        <Link
                            href="/admin/unit"
                            className="flex w-full items-center justify-center rounded-2xl bg-dark-blue px-10 py-4 font-semibold text-white hover:bg-white hover:text-black"
                        >
                            Data Unit
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}
