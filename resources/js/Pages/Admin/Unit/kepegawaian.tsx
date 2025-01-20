import Tabs from '@/Components/Admin/Unit/KepegawaianTabs';
import Layout from '@/Layout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { kepala, guru, tenagaKependidikan } from '@/Constants/Temp';

const Kepegawaian = () => {
    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Kepegawaian Unit" />
            <div className="flex min-h-screen w-full justify-center bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat py-40">
                <div className="flex w-[80%] flex-col items-start justify-center gap-5">
                    <Link
                        href="/admin/unit"
                        className="flex items-center gap-3 rounded-2xl border border-dark-blue bg-dark-blue px-12 py-3 font-semibold text-white hover:bg-white hover:text-dark-blue"
                    >
                        <FaArrowLeft /> Kembali
                    </Link>
                    <Tabs 
                    initialTab='kepala'
                    kepala={kepala}
                    guru={guru}
                    tendik={tenagaKependidikan}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Kepegawaian;
