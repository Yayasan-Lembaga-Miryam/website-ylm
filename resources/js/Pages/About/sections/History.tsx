import Button from '@/Components/Shared/Button';
import { Link } from '@inertiajs/react';
import { FaArrowRight } from 'react-icons/fa6';
import Founder from './Founder';
import Philosophy from './Philosophy';
import Staff from './Staff';

const History = () => {
    return (
        <div
            className="relative -mt-36 flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-top bg-no-repeat font-poppins md:-mt-[75px]"
            style={{ backgroundImage: "url('/images/bg-HistoryAbout.webp')" }}
        >
            <div className="z-10 mt-64 flex w-[80%] flex-col items-center justify-center gap-8 pb-20 text-deep-blue md:gap-16 md:pt-20">
                <h1 className="text-center text-2xl font-extrabold md:text-3xl">
                    Sejarah Yayasan Lembaga Miryam
                </h1>
                <div className="flex flex-col-reverse justify-center gap-6 md:flex-row md:gap-12">
                    <div className="flex flex-col items-center justify-center gap-5 md:w-1/2 md:items-start">
                        <p className="text-justify text-sm leading-relaxed md:text-base">
                            Sejumlah Misionaris merentangkan sayapnya ke
                            Indonesia pada tahun 1927. Pengorbanan yang tanpa
                            batas, bergerak dari hati serta di dorong oleh
                            kekuatan cinta Hati Yesus yang Berbelaskasih
                            mengarahkan masa depan menuju tanah misi Indonesia.
                            Atas permintaan Pater van Oort, SCJ yang bernada
                            persaudaraan dan penuh semangat meminta agar
                            Kongregasi memulai karya misi di Sumatera bagian
                            Selatan. Setelah diperoleh jawaban....
                        </p>
                        <Link href="/sejarah">
                            <Button
                                appearance="outline"
                                display="text-icon"
                                icon={<FaArrowRight />}
                                iconPosition="right"
                                type="button"
                                variant="primary"
                                className="w-max rounded-xl border-dark-blue font-poppins text-dark-blue hover:border-dark-blue hover:bg-dark-blue hover:text-white"
                            >
                                Baca Selengkapnya
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center md:w-1/2 md:items-end">
                        <img
                            src="/images/img-HistoryAbout.png"
                            alt="YLM"
                            className="w-[90%]"
                        />
                    </div>
                </div>
            </div>
            <Founder />
            <Philosophy />
            <Staff />
        </div>
    );
};

export default History;
