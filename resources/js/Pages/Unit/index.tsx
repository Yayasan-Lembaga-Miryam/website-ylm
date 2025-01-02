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

const units: Unit[] = [
    {
        nama: 'KB MIRYAM BANJAR AGUNG',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
        lokasi: 'Kabupaten Tulang Bawang, Provinsi Lampung',
        slug: 'kb-miryam-banjar-agung',
        type: 'taman kanak kanak',
    },
    {
        nama: 'TK MIRYAM METRO',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        lokasi: 'Kota Metro, Provinsi Lampung',
        slug: 'tk-miryam-metro',
        type: 'taman kanak kanak',
    },
    {
        nama: 'SD MIRYAM TELADAS',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b',
        lokasi: 'Kabupaten Tulang Bawang, Provinsi Lampung',
        slug: 'sd-miryam-teladas',
        type: 'sekolah dasar',
    },
    {
        nama: 'SD MIRYAM MENGGALA',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
        lokasi: 'Kabupaten Tulang Bawang, Provinsi Lampung',
        slug: 'sd-miryam-menggala',
        type: 'sekolah dasar',
    },
    {
        nama: 'SMP MIRYAM BANJAR AGUNG',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585',
        lokasi: 'Kabupaten Tulang Bawang, Provinsi Lampung',
        slug: 'smp-miryam-banjar-agung',
        type: 'sekolah menengah pertama',
    },
    {
        nama: 'SMP MIRYAM MENGGALA',
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d',
        lokasi: 'Kabupaten Tulang Bawang, Provinsi Lampung',
        slug: 'smp-miryam-menggala',
        type: 'sekolah menengah pertama',
    },
];

const Unit = () => {
    return (
        <Layout>
            <Landing />
            <UnitList units={units}/>
        </Layout>
    );
};

export default Unit;
