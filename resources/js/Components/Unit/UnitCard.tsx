import { Link } from '@inertiajs/react';

interface UnitCardProps {
    unit: {
        nama: string;
        image: string;
        lokasi: string;
        slug: string;
        type:
            | 'taman kanak kanak'
            | 'sekolah dasar'
            | 'sekolah menengah pertama';
    };
}

const UnitCard = ({ unit }: UnitCardProps) => {
    return (
        <Link href={`/unit/${unit.slug}`}>
            <div className="relative h-[50vh] max-h-[300px] w-[40vw] max-w-[500px] rounded-xl">
                <img
                    src={unit.image}
                    alt={unit.nama}
                    className="h-full w-full rounded-xl"
                />
                <div className="absolute bottom-0 right-0 top-0 flex w-[55%] flex-col items-end justify-center gap-2 rounded-xl bg-[url(/images/bg-CardUnit.png)] bg-cover px-3 font-bold text-white">
                    <h1 className="w-[80%] text-xl">{unit.nama}</h1>
                    <h2 className="w-[80%] text-[10px]">{unit.lokasi}</h2>
                </div>
            </div>
        </Link>
    );
};

export default UnitCard;
