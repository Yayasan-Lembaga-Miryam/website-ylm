import Layout from '@/Layout';
import Landing from './sections/Landing';

interface ProfilSekolah {
    gambar: string;
    deskripsi: string;
}

interface VisiMisi {
    visi: string;
    misi: string[];
}

interface StafPersonil {
    nama: string;
    jabatan?: string;
    foto: string;
    bidangStudi?: string;
}

interface Staf {
    kepalaSekolah: StafPersonil[];
    guru: StafPersonil[];
    tenagaKependidikan: StafPersonil[];
}

interface Kontak {
    alamat: string;
    telepon: string;
    email: string;
    whatsapp: string;
    maps: string;
}

interface Unit {
    namaSekolah: string;
    profilSekolah: ProfilSekolah;
    visiMisi: VisiMisi;
    staf: Staf;
    kontak: Kontak;
}

const data: Unit = {
    namaSekolah: 'SMP Xaverius 1 Bandar Lampung',
    profilSekolah: {
        gambar: '/images/unit/sd-xaverius-metro.png',
        deskripsi:
            'Yayasan Lembaga Miryam menjunjung tinggi nilai-nilai Kristiani dalam setiap aktivitasnya. Kami percaya bahwa pendidikan adalah kunci untuk membangun masa depan yang lebih baik. Melalui pendidikan, kami ingin mencetak generasi muda yang memiliki integritas, rasa tanggung jawab, dan semangat gotong royong.',
    },
    visiMisi: {
        visi: 'Mewujudkan satuan pendidikan Katolik belaskasih dengan layanan CHYBK.',
        misi: [
            'Mewujudkan SDM yang unggul dalam kecerdasan intelektual, emosional, spiritual, dan ketahanan.',
            'Mewujudkan SDM yang beriman dan bertakwa.',
            'Mewujudkan lingkungan dan layanan pendidikan yang humanis.',
            'Mewujudkan layanan yang disiplin, kerja keras, dan siap sedia.',
            'Mewujudkan layanan yang komunikatif dan kolaboratif dalam persaudaraan sejati',
        ],
    },
    staf: {
        kepalaSekolah: [
            {
                nama: 'Nama Kepala Sekolah',
                jabatan: 'Kepala Sekolah',
                foto: '/images/foto_kepala_sekolah.jpg',
            },
            {
                nama: 'Nama Wakil Kepala Sekolah',
                jabatan: 'Wakil Kepala Sekolah',
                foto: '/images/foto_wakil_kepala_sekolah.jpg',
            },
        ],
        guru: [
            {
                nama: 'Nama Guru 1',
                bidangStudi: 'Matematika',
                foto: '/images/foto_guru1.jpg',
            },
            {
                nama: 'Nama Guru 2',
                bidangStudi: 'IPA',
                foto: '/images/foto_guru2.jpg',
            },
            // ... guru lainnya
        ],
        tenagaKependidikan: [
            {
                nama: 'Nama Tenaga Kependidikan 1',
                jabatan: 'Tata Usaha',
                foto: '/images/foto_tu1.jpg',
            },
        ],
    },
    kontak: {
        alamat: 'Alamat lengkap sekolah',
        telepon: 'Nomor telepon sekolah',
        email: 'Alamat email sekolah',
        whatsapp: 'nomor',
        maps: 'Link/embed Google Maps',
    },
};

const DetailUnit = () => {
    return (
        <Layout>
            <Landing
                nama={data.namaSekolah}
                gambar={data.profilSekolah.gambar}
            />

            <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[url(/images/bg-DetailUnit.png)] bg-cover bg-top bg-no-repeat">
                <div className="flex w-[80%] flex-col items-center justify-center">
                    test
                </div>
            </div>
        </Layout>
    );
};

export default DetailUnit;
