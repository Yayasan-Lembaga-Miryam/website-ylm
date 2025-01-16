import Layout from '@/Layout';
import Landing from './sections/Landing';
import List from './sections/List';
import { KurikulumItem } from "@/models/kurikulum";

const Curriculum = ({ kurikulum }: { kurikulum: KurikulumItem[] }) => {
    return (
        <Layout>
            <Landing />
            <List kurikulum={kurikulum} />
        </Layout>
    );
};

export default Curriculum;
