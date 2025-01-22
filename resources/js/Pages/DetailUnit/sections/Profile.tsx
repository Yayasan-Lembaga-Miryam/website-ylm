interface ProfileProps {
    gambar: string;
    isi: string;
    pembuka: string;
}

const Profile = ({ gambar, isi, pembuka }: ProfileProps) => {
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
                            src={gambar}
                            alt="Sekolah"
                            className="relative z-10 h-auto w-full rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex w-1/2 flex-col items-start justify-center gap-5">
                    <p className="text-justify leading-relaxed">{pembuka}</p>
                    <p className="text-justify leading-relaxed">{isi}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
