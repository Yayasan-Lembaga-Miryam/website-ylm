import Button from '@/Components/Shared/Button';
import { FaArrowRight } from 'react-icons/fa6';
import { router } from "@inertiajs/react";

const About = () => {
    return (
        <div className="relative min-h-screen w-full ">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
     style={{ backgroundImage: "url('/images/bg-AboutHome.webp')" }}>
</div>
            <div className="relative flex flex-col items-center justify-center gap-20 md:pt-20 md:pb-80 pb-56 -mb-60 font-poppins">
                <div className="z-10 flex w-[80%] flex-col items-center justify-center md:gap-16 gap-8 text-white md:py-40">
                    <h1 className="md:text-3xl text-2xl text-center font-extrabold">
                        Yayasan Lembaga Miryam
                    </h1>
                    <div className="flex md:flex-row flex-col items-center justify-center md:gap-12 gap-6">
                        <div className="flex md:w-1/2 items-center flex-col">
                            <img src="/images/img-AboutHome.png" alt="YLM" className='w-[90%]'/>
                        </div>
                        <div className="flex md:w-1/2 flex-col justify-center md:gap-5 gap-3 md:text-base text-sm">
                            <p className="text-justify font-extrabold">
                                Assalamualaikum Warahmatullahi Wabarakatuh,
                                Shalom, Om Swastyastu, Namo Buddhaya, Salam
                                Kebajikan Bagi Kita Semua.
                            </p>
                            <p className="text-justify">
                                Puji dan syukur kita panjatkan kepada Tuhan Yang
                                Maha Esa atas rahmat dan karunia-Nya yang selalu
                                menyertai perjuangan kami.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="z-10 flex w-[80%] flex-col items-center justify-center md:gap-16 gap-8 text-white">
                    <h1 className="md:text-3xl text-2xl text-center font-extrabold">
                        Tentang Yayasan Lembaga Miryam
                    </h1>
                    <div className="flex md:flex-row flex-col-reverse justify-center md:gap-12 gap-6">
                        <div className="flex md:w-1/2 flex-col items-center md:items-start justify-center md:gap-5 gap-3 md:text-base text-sm">
                            <p className="text-justify font-extrabold">
                                “Kami siap membangun jiwa Kristiani pada
                                generasi muda”
                            </p>
                            <p className="text-justify leading-relaxed">
                                Yayasan Lembaga Miryam menjunjung tinggi
                                nilai-nilai Kristiani dalam setiap aktivitasnya.
                                Kami percaya bahwa pendidikan adalah kunci untuk
                                membangun masa depan yang lebih baik. Melalui
                                pendidikan, kami ingin mencetak generasi muda
                                yang memiliki integritas, rasa tanggung jawab,
                                dan semangat gotong royong.
                            </p>
                            <Button
                                appearance="outline"
                                display="text-icon"
                                icon={<FaArrowRight />}
                                iconPosition="right"
                                type="button"
                                variant="primary"
                                onClick={() => {
                                    router.visit(route('about'));
                                }}
                                className="w-max rounded-xl border-white font-poppins text-white hover:border-dark-blue hover:bg-dark-blue"
                            >
                                Lihat Selengkapnya
                            </Button>
                        </div>
                        <div className="flex md:w-1/2 items-center flex-col">
                            <img src="/images/img-AboutHome.png" alt="YLM" className='w-[90%]' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
