import EditProfileForm from '@/Components/Admin/Unit/EditProfileForm';
import TextInput from '@/Components/Shared/TextInput';
import Layout from '@/Layout';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa6';
import { ToastContainer } from 'react-toastify';

const Profil = ({ unit, auth, allUnits }: any) => {
    const isSuperAdmin = auth?.user?.role === 'adminsuper';
    
    const handleUnitChange = (e:any) => {
        const selectedSlug = e.target.value;
        router.get(`/admin/unit/profil-sekolah/${selectedSlug}`);
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

            if (response.data.success) {
                window.location.reload();
            }

            return response;
        } catch (error) {
            console.error('Update error:', error);
            throw error;
        }
    };

    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Profil Unit" />
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
                                Update Profil Sekolah
                            </h1>
                            <p>
                                Untuk melakukan perbaruan pada profil setiap
                                unit yang bernaung di bawah Yayasan Lembaga
                                Miryam.
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
                                    {allUnits.map((u:any) => (
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
                        <EditProfileForm
                            initialData={{
                                profil_pembuka: unit.profil_pembuka,
                                profil_isi: unit.profil_isi,
                                thumbnail_path: unit.thumbnail_path,
                                banner_path: unit.banner_path,
                                thumbnail_url: unit.thumbnail_url,
                                banner_url: unit.banner_url,
                            }}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </Layout>
    );
};

export default Profil;