import Button from '@/Components/Shared/Button';
import { Link } from '@inertiajs/react';
import { FaArrowRight } from 'react-icons/fa6';

const Staff = () => {
    return (
        <div className="flex h-full min-h-screen w-[80%] flex-col items-center gap-12 rounded-[20px] py-20 text-dark-blue">
            <h1 className="text-3xl font-extrabold">Pengurus dan Staff</h1>
            <div className="flex h-[70vh] w-[80%] justify-center rounded-xl">
                <img
                    src="/images/bg-LandingHome.webp"
                    alt=""
                    className="h-full w-full rounded-xl object-cover"
                />
            </div>
            <Link href="/pengurus">
                <Button
                    appearance="outline"
                    display="text-icon"
                    icon={<FaArrowRight />}
                    iconPosition="right"
                    type="button"
                    variant="primary"
                    className="w-max rounded-xl border-dark-blue font-poppins text-dark-blue hover:border-dark-blue hover:bg-dark-blue hover:text-white"
                >
                    Lihat Selengkapnya
                </Button>
            </Link>
        </div>
    );
};

export default Staff;
