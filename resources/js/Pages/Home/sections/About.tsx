import Button from '@/Components/Shared/Button';
import { router } from '@inertiajs/react';
import { FaArrowRight } from 'react-icons/fa6';

const About = () => {
    return (
        <div className="relative min-h-screen w-full">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/bg-AboutHome.webp')" }}
            ></div>
            <div className="relative -mb-60 flex flex-col items-center justify-center gap-20 pb-56 font-poppins md:pb-80 md:pt-20">
                <div className="z-10 flex w-[80%] flex-col items-center justify-center gap-8 text-white md:gap-16 md:py-40">
                    <h1 className="text-center text-2xl font-extrabold md:text-3xl">
                        Yayasan Lembaga Miryam
                    </h1>
                    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
                        <div className="flex flex-col items-center md:w-1/2">
                            <img
                                src="/images/img-AboutHome.png"
                                alt="YLM"
                                className="w-[90%]"
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-3 text-sm md:w-1/2 md:gap-5 md:text-base">
                            <p className="text-justify font-extrabold">
                                Selamat Datang di Website Resmi Yayasan Lembaga
                                Miryam
                            </p>
                            <p className="text-justify">
                                Yayasan Lembaga Miryam (YLM) hadir mengemban
                                tugas mulia mengembangkan pribadi (tubuh, jiwa,
                                dan roh) setiap anak sesuai dengan maksud
                                Penciptanya. Tuhan menciptakan setiap orang
                                sempurna adanya. Di balik kondisi riil setiap
                                anak saat ini, ada gambaran kesempurnaan dan
                                maksud Tuhan yang terselubung. Kesempurnaan
                                ciptaan masih in statu viae (di tengah jalan)
                                menuju kebaikan dan kesempurnaan definitif. YLM
                                terpanggil dan berkomitmen untuk mewujudkan
                                kesempurnaan dan maksud Sang Pencipta yang masih
                                terselubung itu. Panggilan dan komitmen itu
                                ditunjukkan melalui pengembangan tata kelola,
                                layanan, dan kurikulum yang ber-CHYBK (Cerdas,
                                Humanis, Yakin akan penyelenggaraan Ilahi,
                                Berkarakter, dan menjunjung tinggai
                                Kebersamaan). Bersama YLM kita wujudkan
                                pribadi-pribadi belaskasih untuk Gereja dan
                                Indonesia yang lebih baik.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="z-10 flex w-[80%] flex-col items-center justify-center gap-8 text-white md:gap-16">
                    <h1 className="text-center text-2xl font-extrabold md:text-3xl">
                        Tentang Yayasan Lembaga Miryam
                    </h1>
                    <div className="flex flex-col-reverse justify-center gap-6 md:flex-row md:gap-12">
                        <div className="flex flex-col items-center justify-center gap-3 text-sm md:w-1/2 md:items-start md:gap-5 md:text-base">
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
                        <div className="flex flex-col items-center md:w-1/2">
                            <img
                                src="/images/img-AboutHome.png"
                                alt="YLM"
                                className="w-[90%]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
