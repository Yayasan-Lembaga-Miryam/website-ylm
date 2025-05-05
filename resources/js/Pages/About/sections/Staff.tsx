import Button from '@/Components/Shared/Button';
import { Link } from '@inertiajs/react';
import { FaArrowRight } from 'react-icons/fa6';

const Staff = () => {
    return (
        <div className="flex h-full w-[80%] flex-col items-center gap-12 rounded-[20px] pb-20 pt-28 text-dark-blue md:min-h-screen md:pt-20">
            <h1 className="text-2xl font-extrabold md:text-3xl">
                Pengurus dan Staff
            </h1>
            <div className="flex justify-center rounded-xl md:h-[70vh] md:w-[80%]">
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
