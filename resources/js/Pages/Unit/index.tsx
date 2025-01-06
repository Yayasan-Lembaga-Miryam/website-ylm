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
        image: '/images/unit/tk-xaverius-ngesti-rahayu.png',
        lokasi: 'Kabupaten Tulang Bawang, Provinsi Lampung',
        slug: 'kb-miryam-banjar-agung',
        type: 'taman kanak kanak',
    },
    {
        nama: 'TK XAVERIUS NGESTI RAHAYU',
        image: '/images/unit/tk-xaverius-ngesti-rahayu.png',
        lokasi: 'Kabupaten Lampung Tengah, Provinsi Lampung',
        slug: 'tk-xaverius-ngesti-rahayu',
        type: 'taman kanak kanak',
    },
    {
        nama: 'TK XAVERIUS SEPUTIH BANYAK',
        image: '/images/unit/tk-xaverius-seputih-banyak.png',
        lokasi: 'Kabupaten Tulang Bawang, Provinsi Lampung',
        slug: 'tk-xaverius-seputih-banyak',
        type: 'taman kanak kanak',
    },
    {
        nama: 'TK XAVERIUS METRO',
        image: '/images/unit/tk-xaverius-metro.png',
        lokasi: 'Kota Metro, Provinsi Lampung ',
        slug: 'tk-xaverius-metro',
        type: 'taman kanak kanak',
    },
    {
        nama: 'TK XAVERIUS 1 BANDAR LAMPUNG',
        image: '/images/unit/tk-xaverius-1-bandar-lampung.png',
        lokasi: 'Kota Bandar Lampung, Provinsi Lampung',
        slug: 'tk-xaverius-1-bandar-lampung',
        type: 'taman kanak kanak',
    },
    {
        nama: 'TK XAVERIUS 1 PALEMBANG',
        image: '/images/unit/tk-xaverius-1-palembang.png',
        lokasi: 'Kota Palembang, Provinsi Sumatera Selatan',
        slug: 'tk-xaverius-1-palembang',
        type: 'taman kanak kanak',
    },
    {
        nama: 'SD XAVERIUS METRO',
        image: '/images/unit/sd-xaverius-metro.png',
        lokasi: 'Kota Metro, Provinsi Lampung',
        slug: 'sd-xaverius-metro',
        type: 'sekolah dasar',
    },
    {
        nama: 'SD XAVERIUS 1 BANDAR LAMPUNG',
        image: '/images/unit/sd-xaverius-1-bandar-lampung.png',
        lokasi: 'Kota Bandar Lampung, Provinsi Lampung',
        slug: 'sd-xaverius-1-bandar-lampung',
        type: 'sekolah dasar',
    },
    {
        nama: 'SD XAVERIUS 1 PALEMBANG​',
        image: '/images/unit/sd-xaverius-1-palembang.png',
        lokasi: 'Kota Palembang, Provinsi Sumatera Selatan ',
        slug: 'sd-xaverius-1-palembang',
        type: 'sekolah dasar',
    },
    {
        nama: 'SMP XAVERIUS 1 BANDAR LAMPUNG',
        image: '/images/unit/smp-xaverius-1-bandar-lampung.png',
        lokasi: 'Kota Bandar Lampung, Provinsi Lampung',
        slug: 'smp-xaverius-1-bandar-lampung',
        type: 'sekolah menengah pertama',
    },
    {
        nama: 'SMP XAVERIUS 6 PALEMBANG​',
        image: '/images/unit/smp-xaverius-6-palembang.png',
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
