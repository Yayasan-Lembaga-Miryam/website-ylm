import { useState } from 'react';

interface ProfileProps {
    gambar: string;
    isi: string;
    pembuka: string;
}

const fallbackImage = '/images/bg-LandingHome.webp';

const Profile = ({ gambar, isi, pembuka }: ProfileProps) => {
    const [imageSource, setImageSource] = useState(gambar);
    const handleImageError = () => {
        setImageSource(fallbackImage);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-12">
            <h1 className="text-2xl font-extrabold text-deep-blue md:text-3xl">
                Profil Sekolah
            </h1>
            <div className="flex w-[95%] flex-col justify-center gap-10 md:flex-row md:gap-0">
                <div className="flex w-full justify-center md:w-1/2">
                    <div className="relative w-[80%] max-w-[600px]">
                        <div className="absolute inset-0 translate-x-2 translate-y-2 transform rounded-lg bg-dark-blue md:translate-x-4 md:translate-y-4" />

                        <img
                            src={imageSource}
                            alt="Sekolah"
                            onError={handleImageError}
                            className="relative z-10 h-full w-full rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-5 text-sm text-deep-blue md:w-1/2 md:text-base">
                    <p className="text-justify font-extrabold leading-relaxed">
                        {pembuka}
                    </p>
                    <p className="text-justify leading-relaxed">{isi}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
