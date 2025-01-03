import Layout from '@/Layout';
import { Berita } from '@/models/newsinterfaces';
import About from './sections/About';
import CoreValues from './sections/CoreValues';
import Landing from './sections/Landing';
import News from './sections/News';

const Home = ({ berita }: { berita: Berita[] }) => {
    return (
        <Layout>
            <Landing />
            <About />
            <CoreValues />
            <News berita={berita} />
        </Layout>
    );
};

export default Home;
