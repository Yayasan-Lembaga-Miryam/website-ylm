import Layout from '@/Layout';
import { useEffect, useState } from 'react';

const NewsDetailSkeletonLoader = () => {
    return (
        <div className="flex w-full flex-col gap-8">
            <div className="h-12 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="relative h-[500px] w-full">
                <div className="absolute h-full w-full animate-pulse rounded-2xl bg-gray-200" />
            </div>
            <div className="space-y-4">
                <div className="space-y-4">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                </div>
            </div>
        </div>
    );
};

const NewsDetail = () => {
    const [loading, setLoading] = useState(true);

    const [newsDetail, setNewsDetail] = useState({
        title: 'Kegiatan Lomba Kompetensi Siswa Tingkat SD Tahun 2024 di SMP Xaverius 1 Bandar Lampung',
        date: '14 Oktober 2024',
        location: 'Kompleks Xaverius Telukbetung',
        description:
            'Bandar Lampung, 14 Oktober 2024 – SMP Xaverius 1 Bandar Lampung sukses menyelenggarakan Lomba Kompetensi Siswa (LKS) tingkat SD se-Provinsi Lampung yang berlangsung pada Senin, 14 Oktober 2024 di Kompleks Xaverius Telukbetung. Kegiatan ini diikuti oleh berbagai sekolah dasar dari wilayah Provinsi Lampung, dengan partisipasi yang antusias dari siswa-siswi yang menunjukkan kemampuan terbaik mereka dalam berbagai bidang.\n\nBeragam cabang perlombaan yang diadakan meliputi cabang olahraga dan seni, antara lain Volly Mini Putra & Putri, Shooting Bola Basket, serta cabang seni dan literasi seperti Mendongeng Bahasa Indonesia & Bahasa Lampung, Membaca Puisi, Solo Song, Menggambar Poster, dan cabang akademik Lomba Mata Pelajaran Pancasila dan IPS . Tak ketinggalan, keterampilan berbahasa Inggris juga diuji melalui lomba Story Telling dan Spelling Bee.\n\nKegiatan ini bertujuan untuk mengembangkan potensi siswa dalam bidang akademik, olahraga, dan seni, serta memupuk semangat kompetisi yang sehat dan sportif di kalangan pelajar.\n\nSeluruh peserta menunjukkan semangat luar biasa dan bakat yang menjanjikan di setiap cabang yang mereka ikuti. Ajang LKS ini juga menjadi sarana bagi para siswa untuk mengasah keterampilan mereka dan meraih prestasi gemilang di tingkat regional.',
        image: '/images/bg-LandingHome.webp',
    });

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <div className="flex min-h-screen w-full justify-center bg-white font-poppins py-20 bg-cover bg-center bg-no-repeat bg-[url(/images/bg-DetailNews.webp)]">
            <div className="mt-20 w-[80%] pb-16">
                {loading ? (
                    <NewsDetailSkeletonLoader />
                ) : (
                    <div className="flex w-full flex-col gap-8">
                        <h1 className="text-deep-blue text-center leading-relaxed text-4xl font-bold">
                            {newsDetail.title}
                        </h1>
                        <div className="relative h-[500px] w-full">
                            <img
                                src={newsDetail.image}
                                alt={newsDetail.title}
                                className="h-full w-full rounded-2xl object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <p className="text-deep-blue whitespace-pre-line text-lg leading-relaxed text-justify">
                                {newsDetail.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </Layout>
    );
};

export default NewsDetail;
