import Layout from '@/Layout';
import History from './sections/History';
import Landing from './sections/Landing';
import Profile from './sections/Profile';

const About = () => {
    return (
        <Layout>
            <Landing />
            <Profile />
            <History />
        </Layout>
    );
};

export default About;
