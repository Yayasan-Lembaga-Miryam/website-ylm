import Footer from '@/Components/Shared/Footer';
import Navbar from '@/Components/Shared/Navbar';

type LayoutProps = {
    children: React.ReactNode;
    isAdmin?: boolean;
    isLogin?: boolean;
};

const Layout = ({ children, isAdmin, isLogin }: LayoutProps) => {
    return (
        <div className='overflow-x-hidden font-poppins'>
            <Navbar isAdmin={isAdmin} isLogin={isLogin} />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
