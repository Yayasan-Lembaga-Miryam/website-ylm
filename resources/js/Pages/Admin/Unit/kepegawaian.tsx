import Tabs from '@/Components/Admin/Unit/KepegawaianTabs';
import Layout from '@/Layout';
import { Head, Link } from '@inertiajs/react';
import { FaArrowLeft } from 'react-icons/fa6';

const Kepegawaian = ({ pengurus_unit, unit, auth, allUnits }: any) => {
    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Kepegawaian Unit" />
            <div className="flex min-h-screen w-full justify-center bg-[url(/images/bg-DetailNews.webp)] bg-cover bg-center bg-no-repeat py-28 md:py-40">
                <div className="flex w-[80%] flex-col items-start justify-center gap-5">
                    <Link
                        href="/admin/unit"
                        className="flex items-center gap-3 rounded-md border border-dark-blue bg-dark-blue px-6 py-1 text-sm font-semibold text-white hover:bg-white hover:text-dark-blue md:rounded-2xl md:px-12 md:py-3 md:text-base"
                    >
                        <FaArrowLeft /> Kembali
                    </Link>
                    <Tabs
                        initialTab="kepala"
                        unit={unit}
                        pengurusUnit={pengurus_unit}
                        auth={auth}
                        allUnits={allUnits}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Kepegawaian;
