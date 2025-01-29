import Button from '@/Components/Shared/Button';
import { Link } from '@inertiajs/react';
import { FaArrowRight } from 'react-icons/fa6';
import Founder from './Founder';
import Philosophy from './Philosophy';
import Staff from './Staff';

const History = () => {
    return (
        <div className="relative md:-mt-[75px] -mt-36 flex min-h-screen w-full flex-col items-center justify-center bg-[url(/images/bg-HistoryAbout.webp)] bg-cover bg-top bg-no-repeat font-poppins">
            <div className="z-10 mt-64 flex w-[80%] flex-col items-center justify-center gap-8 md:gap-16 pb-20 md:pt-20 text-deep-blue">
                <h1 className="text-2xl md:text-3xl font-extrabold text-center">
                    Sejarah Yayasan Lembaga Miryam
                </h1>
                <div className="flex md:flex-row flex-col-reverse justify-center gap-6 md:gap-12">
                    <div className="flex md:w-1/2 flex-col justify-center md:items-start items-center gap-5">
                        <p className="text-justify md:text-base text-sm leading-relaxed">
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
                    <div className="flex md:w-1/2 flex-col items-center md:items-end">
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
            <Staff/>
        </div>
    );
};

export default History;
