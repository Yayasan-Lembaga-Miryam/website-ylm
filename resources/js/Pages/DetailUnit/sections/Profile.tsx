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
            <h1 className="text-3xl font-extrabold text-deep-blue">
                Profil Sekolah
            </h1>
            <div className="flex w-[95%] justify-center">
                <div className="w-1/2">
                    <div className="relative w-[80%] max-w-[600px]">
                        <div className="absolute inset-0 translate-x-4 translate-y-4 transform rounded-lg bg-blue-600" />

                        <img
                            src={imageSource}
                            alt="Sekolah"
                            onError={handleImageError}
                            className="relative z-10 h-auto w-full rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex w-1/2 flex-col items-start justify-center gap-5 text-deep-blue">
                    <p className="text-justify leading-relaxed font-extrabold">{pembuka}</p>
                    <p className="text-justify leading-relaxed">{isi}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
