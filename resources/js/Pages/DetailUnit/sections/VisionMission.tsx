interface VisionMissionProps {
    visi: string;
    misi: string;
}

const VisionMission = ({ visi, misi }: VisionMissionProps) => {
    const visiArray = visi.split("\n");
    const misiArray = misi.split("\n");
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-12 font-poppins">
            <h1 className="text-3xl font-extrabold text-deep-blue">
                Visi dan Misi Sekolah
            </h1>
            <div className="flex w-[70%] flex-col items-center justify-center gap-9">
                <div className="flex w-full items-center justify-between gap-12">
                    <div className="rounded-2xl bg-dark-blue p-5 text-center text-lg text-white">
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
                    <div className="text-3xl font-extrabold text-deep-blue">
                        VISI
                    </div>
                </div>
                <div className="flex w-full items-center justify-between gap-12">
                    <div className="text-3xl font-extrabold text-deep-blue">
                        MISI
                    </div>
                    <div className="rounded-2xl bg-dark-blue text-lg text-white">
                    <ol className=" px-10 py-5">
                            {misiArray.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionMission;
