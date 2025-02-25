import Layout from '@/Layout';
import { Head, Link } from '@inertiajs/react';

const Unit = () => {
    const fwButton = [
        {
            title: 'Profil Sekolah',
            url: '/admin/unit/profil-sekolah',
        },
        {
            title: 'Visi dan Misi Sekolah',
            url: '/admin/unit/visi-misi',
        },
        {
            title: 'Data Kepegawaian',
            url: '/admin/unit/kepegawaian',
        },
        { 
            title: 'Alamat dan Kontak Sekolah',
            url: '/admin/unit/alamat',
        },
    ];
    return (
        <Layout isAdmin={true} isLogin={true}>
            <Head title="Manajemen Unit" />
            <div className="flex min-h-screen w-full justify-center bg-cover bg-center bg-no-repeat py-32 md:py-40" style={{ backgroundImage: "url('/images/bg-DetailNews.webp')" }}
            >
                <div className="flex w-[80%] flex-col items-center justify-center gap-12">
                    <div className="w-full space-y-5 text-dark-blue">
                        <h1 className="text-3xl font-bold">Data Unit</h1>
                        <p>
                            Untuk melakukan perbaruan pada unit-unit yang
                            bernaung di bawah Yayasan Lembaga Miryam.
                        </p>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center gap-5 md:gap-12">
                        {fwButton.map((item, index) => (
                            <Link
                                key={index}
                                className="md:w-[60%] w-full rounded-[20px] bg-dark-blue py-4 text-center md:text-lg font-semibold text-white shadow-md hover:bg-white hover:text-black"
                                href={item.url}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Unit;
