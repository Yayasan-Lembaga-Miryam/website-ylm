import { Link, router } from '@inertiajs/react';

interface NavItem {
    name: string;
    route: string;
}

type NavbarProps = {
    isAdmin?: boolean;
    isLogin?: boolean;
};

const Navbar = ({ isAdmin = false, isLogin = false }: NavbarProps) => {
    const navItems: NavItem[] = [
        { name: 'Beranda', route: '/' },
        { name: 'Tentang', route: '/tentang' },
        { name: 'Galeri', route: '/galeri' },
        { name: 'Berita', route: '/berita' },
        { name: 'Unit Belajar', route: '/unit-belajar' },
        { name: 'Kurikulum', route: '/kurikulum' },
    ];
    const handleLogout = () => {
        router.post(route('logout'));
    };
    return (
        <nav className="fixed top-0 z-50 flex h-28 w-full items-center justify-center bg-transparent">
            <div className="flex h-[70%] w-[90%] justify-center rounded-2xl bg-dark-blue px-4">
                <div className="flex h-full w-[90%] justify-between">
                    <Link href="/" className="flex h-full items-center gap-3">
                        <img
                            src="/images/img-LogoText.png"
                            alt="Yayasan Lembaga Miryam"
                            className="h-[80%]"
                        />
                    </Link>
                    {!isAdmin && isLogin && (
                        <div className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.route}
                                    className="font-semibold text-white transition-colors duration-200 hover:text-gray-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                    {isAdmin && (
                        <div className="flex items-center gap-8">
                            <Link
                                href="/dashboard"
                                className="font-semibold text-white transition-colors duration-200 hover:text-gray-200"
                            >
                                Beranda
                            </Link>
                            <button
                                onClick={handleLogout}
                                type="button"
                                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
