import Table from '@/Components/Admin/Table';
import TextInput from '@/Components/Shared/TextInput';
import { AlamatKontak } from '@/Constants/Temp';
import Layout from '@/Layout';
import { Head, Link } from '@inertiajs/react';
import { FaArrowLeft } from 'react-icons/fa6';

const Alamat = () => {
    const tableData = AlamatKontak.map((item) => ({
            ...item,
            type: 'alamat' as const,
        }));
    
    const handleEdit = (item: any) => {
        console.log('Editing item:', item);
    };

    const handleDelete = (item: any) => {
        console.log('Deleting item:', item);
    };
    
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
                    <div className="w-full space-y-12">
                        <div className="space-y-5 text-dark-blue">
                            <h1 className="text-3xl font-bold">
                                Update Alamat & Kontak Sekolah
                            </h1>
                            <p>
                                Untuk melakukan perbaruan pada alamat dan kontak
                                yang dapat dihubungi di setiap unit yang
                                bernaung di bawah Yayasan Lembaga Miryam.
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="sekolah"
                                className="font-bold text-dark-blue"
                            >
                                Sekolah
                            </label>
                            <TextInput
                                id="sekolah"
                                isReadOnly
                                value={AlamatKontak[0].sekolah}
                                className="w-full p-2"
                            />
                        </div>
                        <Table
                            type="alamat"
                            data={tableData}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Alamat;
