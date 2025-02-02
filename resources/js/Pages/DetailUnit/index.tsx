import Layout from '@/Layout';
import Info from './sections/Info';
import Landing from './sections/Landing';
import Profile from './sections/Profile';
import Staff from './sections/Staff';
import VisionMission from './sections/VisionMission';

const DetailUnit = (props: any) => {
    console.log(props);
    return (
        <Layout>
            <Landing nama={props.unit.nama} gambar={props.unit.thumbnail_url} />
            <div className="relative -mt-52 md:-mt-44 flex min-h-screen w-full flex-col items-center justify-center bg-[url(/images/bg-DetailUnit.png)] bg-cover bg-top bg-no-repeat">
                <div className="flex w-[80%] flex-col items-center justify-center gap-36 pb-20 md:pb-40 pt-80">
                    <Profile
                        gambar={props.unit.banner_url}
                        pembuka={props.unit.profil_pembuka}
                        isi={props.unit.profil_isi}
                    />
                    <VisionMission
                        visi={props.unit.visi}
                        misi={props.unit.misi}
                    />
                    <Staff
                        kepala={props.kepala}
                        guru={props.guru}
                        tenagaKependidikan={props['tenaga-kependidikan']}
                        namaSekolah={props.unit.nama}
                        unitSlug={props.unit.slug}
                    />
                    <Info
                        nama={props.unit.nama}
                        alamat={props.unit.alamat_lengkap}
                        email={props.unit.email}
                        instagram={props.unit.instagram}
                        whatsapp={props.unit.nomor_telepon}
                        maps={props.unit.peta_url}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default DetailUnit;
