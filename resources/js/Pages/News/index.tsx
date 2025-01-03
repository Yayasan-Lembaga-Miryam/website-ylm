import Layout from '@/Layout';
import HighlightNews from './sections/HighlightNews';
import { Berita } from "@/models/newsinterfaces";
import Landing from './sections/Landing';
import LatestNews from './sections/LatestNews';
import { PaginatedData } from "@/types";

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
