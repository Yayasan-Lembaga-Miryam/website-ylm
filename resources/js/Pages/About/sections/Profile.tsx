import { useEffect, useState } from 'react';
import VisionMission from './VisionMission';

const Profile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className="relative -mt-28 flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-top bg-no-repeat font-poppins md:-mt-[75px]"
            style={{
                backgroundImage: `url('${isMobile ? '/images/bg-ProfileAboutHP.webp' : '/images/bg-ProfileAbout.webp'}')`,
            }}
        >
            <div className="z-10 mt-64 flex w-[80%] flex-col items-center justify-center gap-8 pb-20 text-white md:gap-16 md:pb-20 md:pt-20">
                <h1 className="text-2xl font-extrabold md:text-3xl">
                    Profil Yayasan
                </h1>
                <div className="flex flex-col justify-center gap-6 md:flex-row md:gap-12">
                    <div className="flex w-full flex-col items-center md:w-1/2">
                        <img
                            src="/images/img-AboutProfile.png"
                            alt="YLM"
                            className="w-[90%]"
                        />
                    </div>
                    <div className="flex w-full flex-col justify-center gap-3 text-sm md:w-1/2 md:gap-5 md:text-base">
                        <p className="text-justify font-extrabold">
                            "Kami siap membangun jiwa Kristiani pada generasi
                            muda"
                        </p>
                        <p className="text-justify leading-relaxed">
                            Yayasan Lembaga Miryam menjunjung tinggi nilai-nilai
                            Kristiani dalam setiap aktivitasnya. Kami percaya
                            bahwa pendidikan adalah kunci untuk membangun masa
                            depan yang lebih baik. Melalui pendidikan, kami
                            ingin mencetak generasi muda yang memiliki
                            integritas, rasa tanggung jawab, dan semangat gotong
                            royong.
                        </p>
                    </div>
                </div>
            </div>
            <VisionMission />
        </div>
    );
};

export default Profile;
