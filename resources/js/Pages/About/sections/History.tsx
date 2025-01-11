import Button from '@/Components/Shared/Button';
import { FaArrowRight } from 'react-icons/fa6';
import Founder from './Founder';
import Philosophy from './Philosophy';

const History = () => {
    return (
        <div className="-mt-[75px] flex min-h-screen w-full flex-col items-center justify-center bg-[url(/images/bg-HistoryAbout.webp)] bg-cover bg-top bg-no-repeat font-poppins relative">
            <div className="z-10 mt-64 flex w-[80%] flex-col items-center justify-center gap-16 py-20 text-deep-blue">
                <h1 className="text-3xl font-extrabold">
                    Sejarah Yayasan Lembaga Miryam
                </h1>
                <div className="flex justify-center gap-12">
                    <div className="flex w-1/2 flex-col justify-center gap-5">
                        <p className="text-justify leading-relaxed">
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
                        <Button
                            appearance="outline"
                            display="text-icon"
                            icon={<FaArrowRight />}
                            iconPosition="right"
                            type="button"
                            variant="primary"
                            onClick={() => {
                                window.location.href = '/sejarah';
                            }}
                            className="w-max rounded-xl border-dark-blue font-poppins text-dark-blue hover:border-dark-blue hover:bg-dark-blue hover:text-white"
                        >
                            Lihat Selengkapnya
                        </Button>
                    </div>
                    <div className="flex w-1/2 flex-col items-end">
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
        </div>
    );
};

export default History;
