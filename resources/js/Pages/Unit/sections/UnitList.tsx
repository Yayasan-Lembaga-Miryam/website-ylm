import UnitCard from '@/Components/Unit/UnitCard';

interface Props {
    units: {
        nama: string;
        thumbnail_url: string;
        alamat_singkat: string;
        slug: string;
    }[];
}

const UnitList = ({ units }: Props) => {
    const getUnitType = (
        slug: string,
    ):
        | 'taman kanak kanak'
        | 'sekolah dasar'
        | 'sekolah menengah pertama'
        | undefined => {
        if (slug.startsWith('kb') || slug.startsWith('tk')) {
            return 'taman kanak kanak';
        } else if (slug.startsWith('sd')) {
            return 'sekolah dasar';
        } else if (slug.startsWith('smp')) {
            return 'sekolah menengah pertama';
        }
        return undefined;
    };

    const filterUnitsByType = (
        type:
            | 'taman kanak kanak'
            | 'sekolah dasar'
            | 'sekolah menengah pertama',
    ) => {
        return units.filter((unit) => getUnitType(unit.slug) === type);
    };
    return (
        <div
            className="relative -mt-[90px] flex min-h-screen w-full items-center justify-center bg-cover bg-top bg-no-repeat py-20 font-poppins text-deep-blue"
            style={{ backgroundImage: "url('/images/bg-UnitListUnit.webp')" }}
        >
            <div className="mt-64 flex w-[80%] flex-col items-center justify-center gap-12">
                <div className="w-full space-y-5">
                    <h1 className="text-center text-2xl font-extrabold md:text-start md:text-3xl">
                        Taman Kanak-Kanak
                    </h1>
                    <div className="grid grid-cols-1 justify-items-center gap-12 md:grid-cols-2">
                        {filterUnitsByType('taman kanak kanak').map((unit) => (
                            <UnitCard unit={unit} key={unit.slug} />
                        ))}
                    </div>
                </div>
                <div className="space-y-5">
                    <h1 className="text-center text-2xl font-extrabold md:text-start md:text-3xl">
                        Sekolah Dasar
                    </h1>
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                        {filterUnitsByType('sekolah dasar').map((unit) => (
                            <UnitCard unit={unit} key={unit.slug} />
                        ))}
                    </div>
                </div>
                <div className="space-y-5">
                    <h1 className="text-center text-2xl font-extrabold md:text-start md:text-3xl">
                        Sekolah Menengah Pertama
                    </h1>
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
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
