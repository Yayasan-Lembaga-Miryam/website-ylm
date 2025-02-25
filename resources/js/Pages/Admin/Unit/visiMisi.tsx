import EditVisiMisiForm from '@/Components/Admin/Unit/EditVisiMisiForm';
import TextInput from '@/Components/Shared/TextInput';
import Layout from '@/Layout';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';

const visiMisi = ({ unit, auth, allUnits }: any) => {
    const isSuperAdmin = auth?.user?.role === 'adminsuper';

    const handleUnitChange = (e: any) => {
        const selectedSlug = e.target.value;
        router.get(`/admin/unit/visi-misi/${selectedSlug}`);
    };

    const handleSubmit = async (formData: FormData) => {
        try {
            const response = await axios.post(
                `/admin/unit/${unit.slug}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Accept: 'application/json',
                    },
                },
            );
            toast.success('Visi dan Misi berhasil disimpan');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            return response;
        } catch (error) {
            console.error('Update error:', error);
            throw error;
        }
    };
    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Visi dan Misi Unit" />
            <div className="flex min-h-screen w-full justify-center bg-cover bg-center bg-no-repeat py-32 md:py-40" style={{ backgroundImage: "url('/images/bg-DetailNews.webp')" }}
            >
                <div className="flex w-[80%] flex-col items-start justify-center gap-5">
                    <Link
                        href="/admin/unit"
                        className="flex items-center gap-3 rounded-md border border-dark-blue bg-dark-blue px-6 py-1 text-sm font-semibold text-white hover:bg-white hover:text-dark-blue md:rounded-2xl md:px-12 md:py-3 md:text-base"
                    >
                        <FaArrowLeft /> Kembali
                    </Link>
                    <div className="w-full space-y-12">
                        <div className="w-full space-y-5 text-dark-blue">
                            <h1 className="text-3xl font-bold">
                                Update Visi dan Misi Sekolah
                            </h1>
                            <p className='text-justify md:text-start'>
                                Untuk melakukan perbaruan pada visi dan misi
                                setiap unit yang bernaung di bawah Yayasan
                                Lembaga Miryam.
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="sekolah"
                                className="font-bold text-dark-blue"
                            >
                                Sekolah
                            </label>
                            {isSuperAdmin && allUnits ? (
                                <select
                                    id="sekolah"
                                    value={unit.slug}
                                    onChange={handleUnitChange}
                                    className="w-full rounded-md border border-gray-300 p-2 focus:border-dark-blue focus:ring-dark-blue"
                                >
                                    {allUnits.map((u: any) => (
                                        <option key={u.slug} value={u.slug}>
                                            {u.nama}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <TextInput
                                    id="sekolah"
                                    isReadOnly
                                    value={unit.nama}
                                    className="w-full p-2"
                                />
                            )}
                        </div>
                        <EditVisiMisiForm
                            initialData={{
                                visi: unit.visi,
                                misi: unit.misi,
                            }}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    );
};

export default visiMisi;
