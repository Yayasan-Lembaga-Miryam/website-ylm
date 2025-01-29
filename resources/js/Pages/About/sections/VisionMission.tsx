const VisionMission = () => {
    return (
        <div className="flex min-h-screen w-[80%] flex-col items-center justify-center gap-12 font-poppins md:pb-40 pb-60">
            <h1 className="text-2xl md:text-3xl font-extrabold text-deep-blue">
                Visi dan Misi
            </h1>
            <div className="flex md:w-[70%] flex-col items-center justify-center gap-9">
                <div className="flex md:flex-row flex-col-reverse w-full items-center justify-between md:gap-12 gap-2">
                    <div className="rounded-2xl bg-dark-blue p-5 text-justify md:text-center text-sm md:text-lg text-white">
                        Mewujudkan satuan pendidikan Katolik belaskasih dengan
                        layanan CHYBK
                    </div>
                    <div className="text-2xl md:text-3xl font-extrabold text-deep-blue">
                        VISI
                    </div>
                </div>
                <div className="flex md:flex-row flex-col w-full items-center justify-between gap-2 md:gap-12">
                    <div className="text-2xl md:text-3xl font-extrabold text-deep-blue">
                        MISI
                    </div>
                    <div className="rounded-2xl bg-dark-blue text-sm md:text-lg text-white text-justify">
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
