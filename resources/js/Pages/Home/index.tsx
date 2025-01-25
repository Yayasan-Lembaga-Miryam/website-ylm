import Layout from '@/Layout';
import { GalleryItem } from '@/models/galleryinterfaces';
import { Berita } from '@/models/newsinterfaces';
import About from './sections/About';
import CoreValues from './sections/CoreValues';
import Landing from './sections/Landing';
import News from './sections/News';

const Home = ({
    berita,
    galleryPhotos,
}: {
    berita: Berita[];
    galleryPhotos: GalleryItem[];
}) => {
    return (
        <Layout>
            <Landing />
            <About />
            <CoreValues />
            <News berita={berita} galleryPhotos={galleryPhotos} />
        </Layout>
    );
};

export default Home;
