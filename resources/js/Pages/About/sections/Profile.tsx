import Button from '@/Components/Shared/Button';
import { FaArrowRight } from 'react-icons/fa6';
import VisionMission from './VisionMission';

const Profile = () => {
    return (
        <div className="-mt-[75px] flex flex-col min-h-screen w-full justify-center items-center bg-[url(/images/bg-ProfileAbout.webp)] bg-cover bg-top bg-no-repeat font-poppins relative">
            <div className="z-10 mt-64 flex w-[80%] flex-col items-center justify-center gap-16 py-20 text-white">
                <h1 className="text-3xl font-extrabold">Profil Yayasan</h1>
                <div className="flex justify-center gap-12">
                    <div className="flex w-1/2 flex-col">
                        <img
                            src="/images/img-AboutHome.png"
                            alt="YLM"
                            className="w-[90%]"
                        />
                    </div>
                    <div className="flex w-1/2 flex-col justify-center gap-5">
                        <p className="text-justify font-extrabold">
                            “Kami siap membangun jiwa Kristiani pada generasi
                            muda”
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
            <VisionMission/>
        </div>
    );
};

export default Profile;
