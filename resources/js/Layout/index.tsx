import Footer from '@/Components/Shared/Footer';
import Navbar from '@/Components/Shared/Navbar';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='overflow-x-hidden font-poppins'>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
