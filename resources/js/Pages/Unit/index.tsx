import Layout from '@/Layout';
import Landing from './sections/Landing';
import UnitList from './sections/UnitList';

interface Unit {
    nama: string;
    thumbnail_url: string;
    alamat_singkat: string;
    slug: string;
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
