import Layout from '@/Layout';
import { KurikulumItem } from '@/models/kurikulum';
import Landing from './sections/Landing';
import List from './sections/List';

const Curriculum = ({ kurikulum }: { kurikulum: KurikulumItem[] }) => {
    return (
        <Layout>
            <Landing />
            <List kurikulum={kurikulum} />
        </Layout>
    );
};

export default Curriculum;
