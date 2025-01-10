import Layout from '@/Layout';
import Landing from './sections/Landing';
import UnitList from './sections/UnitList';

type UnitType =
    | 'taman kanak kanak'
    | 'sekolah dasar'
    | 'sekolah menengah pertama';

interface Unit {
    nama: string;
    image: string;
    lokasi: string;
    slug: string;
    type: UnitType;
}

interface UnitProps {
    units: Unit[];
}

const Unit = ({ units }: UnitProps) => {
    return (
        <Layout>
            <Landing />
            <UnitList units={units} />
        </Layout>
    );
};

export default Unit;
