import { Link } from '@inertiajs/react';

interface UnitCardProps {
    unit: {
        nama: string;
        thumbnail_url: string;
        alamat_singkat: string;
        slug: string;
    };
}

const UnitCard = ({ unit }: UnitCardProps) => {
    return (
        <Link href={`/unit/${unit.slug}`}>
            <div className="relative h-[50vh] md:max-h-[300px] max-h-[180px] md:w-[40vw] w-[80vw] max-w-[300px] md:max-w-[500px] rounded-xl">
                <img
                    src={unit.thumbnail_url}
                    alt={unit.nama}
                    className="h-full w-full rounded-xl"
                />
                <div className="absolute bottom-0 right-0 top-0 flex w-[55%] flex-col items-end justify-center gap-2 rounded-xl bg-cover px-3 font-bold text-white" style={{ backgroundImage: "url('/images/bg-CardUnit.png')" }}>
                    <h1 className="w-[80%] md:text-xl">{unit.nama}</h1>
                    <h2 className="w-[80%] text-[8px] md:text-[10px]">{unit.alamat_singkat}</h2>
                </div>
            </div>
        </Link>
    );
};

export default UnitCard;
