import Layout from '@/Layout';
import HighlightNews from './sections/HighlightNews';
import Landing from './sections/Landing';
import LatestNews from './sections/LatestNews';

const News = () => {
    return (
        <Layout>
            <Landing />
            <HighlightNews />
        </Layout>
    );
};

export default News;
