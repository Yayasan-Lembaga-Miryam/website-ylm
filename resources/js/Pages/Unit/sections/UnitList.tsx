import UnitCard from '@/Components/Unit/UnitCard';

interface Props {
    units: {
        nama: string;
        image: string;
        lokasi: string;
        slug: string;
        type:
            | 'taman kanak kanak'
            | 'sekolah dasar'
            | 'sekolah menengah pertama';
    }[];
}

const UnitList = ({ units }: Props) => {
    const filterUnitsByType = (type: Props['units'][0]['type']) => {
        return units.filter((unit) => unit.type === type);
    };

    return (
        <div className="-mt-[90px] flex min-h-screen w-full items-center justify-center bg-[url(/images/bg-UnitListUnit.webp)] bg-cover bg-top bg-no-repeat py-20 font-poppins text-deep-blue relative">
            <div className="mt-64 flex w-[80%] flex-col items-center justify-center gap-12">
                <div className="space-y-5">
                    <h1 className="text-3xl font-extrabold">
                        Taman Kanak-Kanak
                    </h1>
                    <div className="grid grid-cols-2 gap-12">
                        {filterUnitsByType('taman kanak kanak').map((unit) => (
                            <UnitCard unit={unit} key={unit.slug} />
                        ))}
                    </div>
                </div>
                <div className="space-y-5">
                    <h1 className="text-3xl font-extrabold">Sekolah Dasar</h1>
                    <div className="grid grid-cols-2 gap-12">
                        {filterUnitsByType('sekolah dasar').map((unit) => (
                            <UnitCard unit={unit} key={unit.slug} />
                        ))}
                    </div>
                </div>
                <div className="space-y-5">
                    <h1 className="text-3xl font-extrabold">
                        Sekolah Menengah Pertama
                    </h1>
                    <div className="grid grid-cols-2 gap-12">
                        {filterUnitsByType('sekolah menengah pertama').map(
                            (unit) => (
                                <UnitCard unit={unit} key={unit.slug} />
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitList;
