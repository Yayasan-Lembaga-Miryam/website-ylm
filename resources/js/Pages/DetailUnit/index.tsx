import Layout from '@/Layout';
import Info from './sections/Info';
import Landing from './sections/Landing';
import Profile from './sections/Profile';
import Staff from './sections/Staff';
import VisionMission from './sections/VisionMission';

interface ProfilSekolah {
    gambar: string;
    deskripsi: string;
}

interface VisiMisi {
    visi: string[];
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
    landingImage: string;
    profilSekolah: ProfilSekolah;
    visiMisi: VisiMisi;
    staf: Staf;
    kontak: Kontak;
}

const data: Unit = {
    namaSekolah: 'SMP Xaverius 1 Bandar Lampung',
    landingImage: '/images/unit/sd-xaverius-metro.png',
    profilSekolah: {
        gambar: '/images/unit/sd-xaverius-metro.png',
        deskripsi:
            'Yayasan Lembaga Miryam menjunjung tinggi nilai-nilai Kristiani dalam setiap aktivitasnya. Kami percaya bahwa pendidikan adalah kunci untuk membangun masa depan yang lebih baik. Melalui pendidikan, kami ingin mencetak generasi muda yang memiliki integritas, rasa tanggung jawab, dan semangat gotong royong.',
    },
    visiMisi: {
        visi: [
            'Mewujudkan satuan pendidikan Katolik belaskasih dengan layanan CHYBK.',
        ],
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
            {
                nama: 'Nama Wakil Kepala Sekolah',
                jabatan: 'Wakil Kepala Sekolah',
                foto: '/images/foto_wakil_kepala_sekolah.jpg',
            },
            {
                nama: 'Nama Wakil Kepala Sekolah',
                jabatan: 'Wakil Kepala Sekolah',
                foto: '/images/foto_wakil_kepala_sekolah.jpg',
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
                jabatan: 'Matematika',
                foto: '/images/foto_guru1.jpg',
            },
            {
                nama: 'Nama Guru 2',
                jabatan: 'IPA',
                foto: '/images/foto_guru2.jpg',
            },
            {
                nama: 'Nama Guru 2',
                jabatan: 'IPA',
                foto: '/images/foto_guru2.jpg',
            },
            {
                nama: 'Nama Guru 2',
                jabatan: 'IPA',
                foto: '/images/foto_guru2.jpg',
            },
            {
                nama: 'Nama Guru 2',
                jabatan: 'IPA',
                foto: '/images/foto_guru2.jpg',
            },
        ],
        tenagaKependidikan: [
            {
                nama: 'Nama Tenaga Kependidikan 1',
                jabatan: 'Tata Usaha',
                foto: '/images/foto_tu1.jpg',
            },
            {
                nama: 'Nama Tenaga Kependidikan 1',
                jabatan: 'Tata Usaha',
                foto: '/images/foto_tu1.jpg',
            },
            {
                nama: 'Nama Tenaga Kependidikan 1',
                jabatan: 'Tata Usaha',
                foto: '/images/foto_tu1.jpg',
            },
            {
                nama: 'Nama Tenaga Kependidikan 1',
                jabatan: 'Tata Usaha',
                foto: '/images/foto_tu1.jpg',
            },
            {
                nama: 'Nama Tenaga Kependidikan 1',
                jabatan: 'Tata Usaha',
                foto: '/images/foto_tu1.jpg',
            },
            {
                nama: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                jabatan: 'TataUsahaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                foto: '/images/foto_tu1.jpg',
            },
        ],
    },
    kontak: {
        alamat: 'Alamat lengkap sekolah',
        telepon: 'Nomor telepon sekolah',
        email: 'Alamat email sekolah',
        whatsapp: 'nomor',
        maps: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.858304393876!2d112.61110207405257!3d-7.952459679231565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e1!3m2!1sid!2sid!4v1736495597269!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
};

const DetailUnit = () => {
    return (
        <Layout>
            <Landing nama={data.namaSekolah} gambar={data.landingImage} />

            <div className="relative -mt-44 flex min-h-screen w-full flex-col items-center justify-center bg-[url(/images/bg-DetailUnit.png)] bg-cover bg-top bg-no-repeat">
                <div className="flex w-[80%] flex-col items-center justify-center gap-36 pb-40 pt-80">
                    <Profile
                        gambar={data.profilSekolah.gambar}
                        deskripsi={data.profilSekolah.deskripsi}
                    />
                    <VisionMission
                        visi={data.visiMisi.visi}
                        misi={data.visiMisi.misi}
                    />
                    <Staff staf={data.staf} namaSekolah={data.namaSekolah} />
                    <Info
                        nama={data.namaSekolah}
                        alamat={data.kontak.alamat}
                        email={data.kontak.email}
                        telepon={data.kontak.telepon}
                        whatsapp={data.kontak.whatsapp}
                        maps={data.kontak.maps}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default DetailUnit;
