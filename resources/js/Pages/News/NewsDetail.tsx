import Layout from '@/Layout';
import { Berita } from '@/models/newsinterfaces';
import { useState } from 'react';

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

const NewsDetail = ({ berita }: { berita: Berita }) => {
    const [loading, setLoading] = useState(false);

    const [newsDetail, setNewsDetail] = useState(berita);

    return (
        <Layout>
            <div
                className="flex min-h-screen w-full justify-center bg-white bg-cover bg-center bg-no-repeat py-20 font-poppins"
                style={{ backgroundImage: "url('/images/bg-DetailNews.webp')" }}
            >
                <div className="mt-10 w-[80%] pb-16 md:mt-20">
                    {loading ? (
                        <NewsDetailSkeletonLoader />
                    ) : (
                        <div className="flex w-full flex-col gap-8">
                            <h1 className="text-center text-2xl font-bold leading-relaxed text-deep-blue break-anywhere md:text-4xl">
                                {newsDetail.judul}
                            </h1>
                            <div className="relative h-[200px] w-full md:h-[500px]">
                                <img
                                    src={newsDetail.gambar_url}
                                    alt={newsDetail.judul}
                                    className="h-full w-full rounded-2xl object-cover break-anywhere"
                                />
                            </div>
                            <div className="space-y-6">
                                <p className="whitespace-pre-line text-justify text-sm leading-relaxed text-deep-blue break-anywhere md:text-lg">
                                    {newsDetail.isi}
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
