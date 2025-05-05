interface VisionMissionProps {
    visi: string;
    misi: string;
}

const VisionMission = ({ visi, misi }: VisionMissionProps) => {
    const visiArray = visi.split('\n');
    const misiArray = misi.split('\n');
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 font-poppins md:gap-12">
            <h1 className="text-2xl font-extrabold text-deep-blue md:text-3xl">
                Visi dan Misi <span className="hidden md:inline">Sekolah</span>
            </h1>
            <div className="flex w-full flex-col items-center justify-center gap-9 md:w-[70%]">
                <div className="flex w-full flex-col-reverse items-center justify-between gap-3 md:flex-row md:gap-12">
                    <div className="rounded-2xl bg-dark-blue p-3 text-center text-sm text-white md:p-5 md:text-lg">
                        {visiArray.length === 1 ? (
                            <p>{visiArray[0]}</p>
                        ) : (
                            <ol className="px-5 text-left">
                                {visiArray.map((item, index) => (
                                    <li key={index} className="mb-2">
                                        {item}
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                    <div className="text-2xl font-extrabold text-deep-blue md:text-3xl">
                        VISI
                    </div>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row md:gap-12">
                    <div className="text-2xl font-extrabold text-deep-blue md:text-3xl">
                        MISI
                    </div>
                    <div className="rounded-2xl bg-dark-blue text-sm text-white md:text-lg">
                        <ol className="list-decimal px-5 py-5 pl-8 md:px-10 md:pl-14">
                            {misiArray.map((item, index) => (
                                <li key={index} className="pl-2">
                                    {item.replace(/^\d+\.\s*/, '')}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionMission;
