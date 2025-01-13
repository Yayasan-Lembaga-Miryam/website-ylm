import Layout from '@/Layout';
import Landing from './sections/Landing';
import Photo from './sections/Photo';

interface GaleriAlbum {
    id: number;
    judul: string;
    slug: string;
    pembuat_id: number;
    created_at: string;
    updated_at: string;
    fotos: GaleriFoto[];
}

interface GaleriFoto {
    id: number;
    url: string;
    galeri_album_id: number | null;
    pembuat_id: number;
    created_at: string;
    updated_at: string;
}

interface FotoPagination {
    current_page: number;
    data: GaleriFoto[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface GalleryProps {
    album: GaleriAlbum[];
    foto: FotoPagination;
}

const Gallery = ({ album, foto }: GalleryProps) => {
    return (
        <Layout>
            <Landing />
            <Photo album={album} foto={foto} />
        </Layout>
    );
};

export default Gallery;
