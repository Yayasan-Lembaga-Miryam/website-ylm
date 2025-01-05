import Layout from '@/Layout';
import { useEffect, useState } from 'react';
import { Berita } from "@/models/newsinterfaces";

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
            <div className="flex min-h-screen w-full justify-center bg-white font-poppins py-20 bg-cover bg-center bg-no-repeat bg-[url(/images/bg-DetailNews.webp)]">
            <div className="mt-20 w-[80%] pb-16">
                {loading ? (
                    <NewsDetailSkeletonLoader />
                ) : (
                    <div className="flex w-full flex-col gap-8">
                        <h1 className="text-deep-blue text-center leading-relaxed text-4xl font-bold break-all">
                            {newsDetail.judul}
                        </h1>
                        <div className="relative h-[500px] w-full">
                            <img
                                src={newsDetail.gambar_url}
                                alt={newsDetail.judul}
                                className="h-full w-full break-all rounded-2xl object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <p className="text-deep-blue whitespace-pre-line text-lg leading-relaxed text-justify break-all">
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
