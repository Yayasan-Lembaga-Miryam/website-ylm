const VisionMission = () => {
    return (
        <div className="flex min-h-screen w-[80%] flex-col items-center justify-center gap-12 font-poppins pb-40">
            <h1 className="text-3xl font-extrabold text-deep-blue">
                Visi dan Misi
            </h1>
            <div className="flex w-[70%] flex-col items-center justify-center gap-9">
                <div className="flex w-full items-center justify-between gap-12">
                    <div className="rounded-2xl bg-dark-blue p-5 text-center text-lg text-white">
                        Mewujudkan satuan pendidikan Katolik belaskasih dengan
                        layanan CHYBK
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
