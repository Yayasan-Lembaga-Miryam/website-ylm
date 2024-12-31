import { Link } from '@inertiajs/react';

interface NavItem {
    name: string;
    route: string;
}

const Navbar = () => {
    const navItems: NavItem[] = [
        { name: 'Beranda', route: '/' },
        { name: 'Tentang', route: '/tentang' },
        { name: 'Galeri', route: '/galeri' },
        { name: 'Berita', route: '/news' },
        { name: 'Unit Belajar', route: '/unit-belajar' },
        { name: 'Kurikulum', route: '/kurikulum' },
    ];
    return (
        <nav className="fixed top-0 z-50 flex h-28 w-full items-center justify-center bg-transparent">
            <div className="h-[70%] w-[90%] flex justify-center rounded-2xl bg-dark-blue px-4">
                <div className='flex h-full justify-between w-[90%]'>
                    <Link href="/" className="flex h-full items-center gap-3">
                        <img
                            src="/images/img-Logo.png"
                            alt="Yayasan Lembaga Miryam"
                            className="h-[80%]"
                        />
                    </Link>
                    <div className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.route}
                                className="text-white transition-colors duration-200 hover:text-gray-200 font-semibold"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
