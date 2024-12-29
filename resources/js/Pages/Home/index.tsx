import Layout from '@/Layout';
import About from './sections/About';
import CoreValues from './sections/CoreValues';
import Landing from './sections/Landing';
import News from './sections/News';

const Home = () => {
    return (
        <Layout>
            <Landing />
            <About />
            <CoreValues />
            <News/>
        </Layout>
    );
};

export default Home;
