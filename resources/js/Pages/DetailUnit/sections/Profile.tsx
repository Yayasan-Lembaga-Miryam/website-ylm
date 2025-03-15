import React, { useState } from 'react';

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
            <h1 className="text-2xl md:text-3xl font-extrabold text-deep-blue">
                Profil Sekolah
            </h1>
            <div className="flex md:flex-row flex-col w-[95%] justify-center md:gap-0 gap-10">
                <div className="md:w-1/2 w-full flex justify-center">
                    <div className="relative w-[80%] max-w-[600px]">
                        <div className="absolute inset-0 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 transform rounded-lg bg-dark-blue" />

                        <img
                            src={imageSource}
                            alt="Sekolah"
                            onError={handleImageError}
                            className="relative z-10 h-full w-full rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex md:w-1/2 w-full flex-col items-start justify-center gap-5 text-deep-blue text-sm md:text-base">
                    <p className="text-justify leading-relaxed font-extrabold">{pembuka}</p>
                    <p className="text-justify leading-relaxed">{isi}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
