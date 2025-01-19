import Layout from '@/Layout';
import { Head, Link } from '@inertiajs/react';
import { FaArrowLeft } from 'react-icons/fa6';

const Alamat = () => {
    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Alamat dan Kontak Unit" />
            <div className="flex min-h-screen w-full justify-center bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat py-40">
                <div className="flex w-[80%] flex-col items-start justify-center gap-5">
                    <Link
                        href="/admin/unit"
                        className="flex items-center gap-3 rounded-2xl border border-dark-blue bg-dark-blue px-12 py-3 font-semibold text-white hover:bg-white hover:text-dark-blue"
                    >
                        <FaArrowLeft /> Kembali
                    </Link>
                    <div>ini alamat dan kontak</div>
                </div>
            </div>
        </Layout>
    );
};

export default Alamat;
