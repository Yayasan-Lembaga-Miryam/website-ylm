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
    tree: Pengurus[];
    kepegawaian: Pengurus[];
    akademik: Pengurus[];
    keuangan: Pengurus[];
    hukum: Pengurus[];
}

const Structure = ({
    tree,
    kepegawaian,
    akademik,
    keuangan,
    hukum,
}: StructureProps) => {
    console.log('tree : ', tree);
    console.log('kepegawaian : ', kepegawaian);
    console.log('keuangan : ', keuangan);
    console.log('akademik : ', akademik);
    console.log('hukum : ', hukum);
    return (
        <Layout>
            <Landing />
            <OrganizationChart
                tree={tree}
                kepegawaian={kepegawaian}
                akademik={akademik}
                keuangan={keuangan}
                hukum={hukum}
            />
        </Layout>
    );
};

export default Structure;
