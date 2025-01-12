import Layout from '@/Layout';
import Landing from './sections/Landing';
import OrganizationChart from './sections/OrganizationChart';

interface Pengurus {
    id: number;
    nama: string;
    jabatan: string;
    keterangan_jabatan: string;
    updated_at: string;
    foto_url: string;
}

interface StructureProps {
    pengurus: Pengurus[];
}

const Structure = ({ pengurus }: StructureProps) => {
    return (
        <Layout>
            <Landing />
            <OrganizationChart pengurus={pengurus}/>
        </Layout>
    );
};

export default Structure;
