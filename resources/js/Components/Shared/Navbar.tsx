import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FiAlignRight, FiX } from 'react-icons/fi';

interface NavItem {
    name: string;
    route: string;
}

type NavbarProps = {
    isAdmin?: boolean;
    isLogin?: boolean;
};

const Navbar = ({ isAdmin, isLogin }: NavbarProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems: NavItem[] = [
        { name: 'Beranda', route: '/' },
        { name: 'Tentang', route: '/tentang' },
        { name: 'Galeri', route: '/galeri' },
        { name: 'Berita', route: '/berita' },
        { name: 'Unit Belajar', route: '/unit' },
        { name: 'Kurikulum', route: '/kurikulum' },
    ];

    const handleScroll = () => {
        if (!isMobileMenuOpen) {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, isMobileMenuOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="relative">
            <nav
                className={`fixed top-0 z-50 flex h-20 w-full items-center justify-center bg-transparent transition-transform duration-300 md:h-28 ${
                    isVisible || isMobileMenuOpen
                        ? 'translate-y-0'
                        : '-translate-y-full'
                }`}
            >
                <div className="flex h-[60%] w-[90%] justify-center rounded-2xl bg-dark-blue px-4 md:h-[70%]">
                    <div className="flex h-full items-center justify-between md:w-[90%]">
                        <Link
                            href="/"
                            className="flex h-full w-[60%] items-center gap-3 md:w-max"
                        >
                            <img
                                src="/images/img-LogoText.png"
                                alt="Yayasan Lembaga Miryam"
                                className="md:h-[80%]"
                            />
                        </Link>
                        {!isAdmin && !isLogin && (
                            <>
                                <div className="hidden items-center gap-8 md:flex">
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
                                <button
                                    onClick={toggleMobileMenu}
                                    className="flex items-center justify-center rounded-lg bg-white p-1 md:hidden"
                                >
                                    {isMobileMenuOpen ? (
                                        <FiX className="text-dark-blue" />
                                    ) : (
                                        <FiAlignRight className="text-dark-blue" />
                                    )}
                                </button>
                            </>
                        )}
                        {isAdmin && isLogin && (
                            <>
                                <div className="hidden items-center gap-8 md:flex">
                                    <Link
                                        href="/dashboard"
                                        className="font-semibold text-white transition-colors duration-200 hover:text-gray-200"
                                    >
                                        Beranda
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        type="button"
                                        className="rounded bg-white/55 px-4 py-2 font-bold text-dark-blue hover:bg-white/90"
                                    >
                                        Logout
                                    </button>
                                </div>
                                <button
                                    onClick={toggleMobileMenu}
                                    className="flex items-center justify-center rounded-lg bg-white p-1 md:hidden"
                                >
                                    {isMobileMenuOpen ? (
                                        <FiX className="text-dark-blue" />
                                    ) : (
                                        <FiAlignRight className="text-dark-blue" />
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isAdmin && isLogin && (
                <div
                    className={`fixed right-0 top-20 z-40 w-64 transform transition-transform duration-300 ease-in-out md:hidden ${
                        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* Menu Content */}
                    <div className="h-screen w-full rounded-bl-2xl bg-[url(/images/bg-NavbarMobile.png)] bg-cover bg-top bg-no-repeat shadow-xl">
                        <div className="flex flex-col space-y-4 p-6">
                            <div className="items-start gap-8 md:hidden flex flex-col">
                                <Link
                                    href="/dashboard"
                                    className="font-bold text-dark-blue transition-colors duration-200"
                                >
                                    Beranda
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    type="button"
                                    className="rounded font-bold text-dark-blue"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isAdmin && !isLogin && (
                <div
                    className={`fixed right-0 top-20 z-40 w-64 transform transition-transform duration-300 ease-in-out md:hidden ${
                        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* Menu Content */}
                    <div className="h-screen w-full rounded-bl-2xl bg-[url(/images/bg-NavbarMobile.png)] bg-cover bg-top bg-no-repeat shadow-xl">
                        <div className="flex flex-col space-y-4 p-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.route}
                                    className="font-semibold text-dark-blue transition-colors duration-200 hover:text-gray-200"
                                    onClick={toggleMobileMenu}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay */}
            {isMobileMenuOpen && !isAdmin && !isLogin && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={toggleMobileMenu}
                />
            )}
            {isMobileMenuOpen && isAdmin && isLogin && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={toggleMobileMenu}
                />
            )}
        </div>
    );
};

export default Navbar;
