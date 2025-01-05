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
        nama: 'TK XAVERIUS NGESTI RAHAYU',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        lokasi: 'Kabupaten Lampung Tengah, Provinsi Lampung',
        slug: 'tk-xaverius-ngesti-rahayu',
        type: 'taman kanak kanak',
    },
    {
        nama: 'TK XAVERIUS SEPUTIH BANYAK',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        lokasi: 'Kabupaten Tulang Bawang, Provinsi Lampung',
        slug: 'tk-xaverius-seputih-banyak',
        type: 'taman kanak kanak',
    },
    {
        nama: 'TK XAVERIUS METRO',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        lokasi: 'Kota Metro, Provinsi Lampung ',
        slug: 'tk-xaverius-metro',
        type: 'taman kanak kanak',
    },
    {
        nama: 'TK XAVERIUS 1 BANDAR LAMPUNG',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        lokasi: 'Kota Bandar Lampung, Provinsi Lampung',
        slug: 'tk-xaverius-1-bandar-lampung',
        type: 'taman kanak kanak',
    },
    {
        nama: 'TK XAVERIUS 1 PALEMBANG',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        lokasi: 'Kota Palembang, Provinsi Sumatera Selatan',
        slug: 'tk-xaverius-1-palembang',
        type: 'taman kanak kanak',
    },
    {
        nama: 'SD XAVERIUS METRO',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b',
        lokasi: 'Kota Metro, Provinsi Lampung',
        slug: 'sd-xaverius-metro',
        type: 'sekolah dasar',
    },
    {
        nama: 'SD XAVERIUS 1 BANDAR LAMPUNG',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
        lokasi: 'Kota Bandar Lampung, Provinsi Lampung',
        slug: 'sd-xaverius-1-bandar-lampung',
        type: 'sekolah dasar',
    },
    {
        nama: 'SD XAVERIUS 1 PALEMBANG​',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
        lokasi: 'Kota Palembang, Provinsi Sumatera Selatan ',
        slug: 'sd-xaverius-1-palembang',
        type: 'sekolah dasar',
    },
    {
        nama: 'SMP XAVERIUS 1 BANDAR LAMPUNG',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585',
        lokasi: 'Kota Bandar Lampung, Provinsi Lampung',
        slug: 'smp-xaverius-1-bandar-lampung',
        type: 'sekolah menengah pertama',
    },
    {
        nama: 'SMP XAVERIUS 6 PALEMBANG​',
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d',
        lokasi: 'Kota Palembang, Provinsi Sumatera Selatan ',
        slug: 'smp-xaverius-6-palembang',
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
