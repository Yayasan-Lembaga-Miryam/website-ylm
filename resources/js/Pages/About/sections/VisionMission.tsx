const VisionMission = () => {
    return (
        <div className="flex min-h-screen w-[80%] flex-col items-center justify-center gap-12 pb-60 font-poppins md:pb-40">
            <h1 className="text-2xl font-extrabold text-deep-blue md:text-3xl">
                Visi dan Misi
            </h1>
            <div className="flex flex-col items-center justify-center gap-9 md:w-[70%]">
                <div className="flex w-full flex-col-reverse items-center justify-between gap-2 md:flex-row md:gap-12">
                    <div className="rounded-2xl bg-dark-blue p-5 text-justify text-sm text-white md:text-center md:text-lg">
                        Mewujudkan satuan pendidikan Katolik belaskasih dengan
                        layanan CHYBK
                    </div>
                    <div className="text-2xl font-extrabold text-deep-blue md:text-3xl">
                        VISI
                    </div>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row md:gap-12">
                    <div className="text-2xl font-extrabold text-deep-blue md:text-3xl">
                        MISI
                    </div>
                    <div className="rounded-2xl bg-dark-blue text-justify text-sm text-white md:text-lg">
                        <ol className="list-decimal px-10 py-5">
                            <li>
                                Mewujudkan SDM yang unggul dalam kecerdasan
                                intelektual, emosional, spiritual, dan
                                ketahanan.
                            </li>
                            <li>Mewujudkan SDM yang beriman dan bertakwa.</li>
                            <li>
                                Mewujudkan lingkungan dan layanan pendidikan
                                yang humanis.
                            </li>
                            <li>
                                Mewujudkan layanan yang disiplin, kerja keras,
                                dan siap sedia
                            </li>
                            <li>
                                Mewujudkan layanan yang komunikatif dan
                                kolaboratif dalam persaudaraan sejati
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionMission;
