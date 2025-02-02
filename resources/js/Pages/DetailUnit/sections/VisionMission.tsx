interface VisionMissionProps {
    visi: string;
    misi: string;
}

const VisionMission = ({ visi, misi }: VisionMissionProps) => {
    const visiArray = visi.split("\n");
    const misiArray = misi.split("\n");
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 md:gap-12 font-poppins">
            <h1 className="text-2xl md:text-3xl font-extrabold text-deep-blue">
                Visi dan Misi <span className="hidden md:inline">Sekolah</span>
            </h1>
            <div className="flex w-full md:w-[70%] flex-col items-center justify-center gap-9">
                <div className="flex flex-col-reverse md:flex-row w-full items-center justify-between gap-3 md:gap-12">
                    <div className="rounded-2xl bg-dark-blue p-3 md:p-5 text-center text-sm md:text-lg text-white">
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
                    <div className="text-2xl md:text-3xl font-extrabold text-deep-blue">
                        VISI
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full items-center justify-between gap-3 md:gap-12">
                    <div className="text-2xl md:text-3xl font-extrabold text-deep-blue">
                        MISI
                    </div>
                    <div className="rounded-2xl bg-dark-blue text-sm md:text-lg text-white">
                    <ol className="list-decimal px-5 md:px-10 py-5 pl-8 md:pl-14">
                            {misiArray.map((item, index) => (
                                <li key={index} className="pl-2">{item.replace(/^\d+\.\s*/, '')}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionMission;