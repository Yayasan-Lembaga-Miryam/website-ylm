import Layout from '@/Layout';
import { Berita } from '@/models/newsinterfaces';
import { PaginatedData } from '@/types';
import HighlightNews from './sections/HighlightNews';
import Landing from './sections/Landing';

interface Props {
    sorotan: Berita;
    teratas: Berita[];
    terbaru: PaginatedData<Berita>;
}

const News = ({ sorotan, teratas, terbaru }: Props) => {
    return (
        <Layout>
            <Landing />
            <HighlightNews
                sorotan={sorotan}
                teratas={teratas}
                terbaru={terbaru}
            />
        </Layout>
    );
};

export default News;
