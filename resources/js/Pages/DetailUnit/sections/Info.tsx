import { CiMail } from 'react-icons/ci';
import { FaWhatsapp } from 'react-icons/fa6';
import { FiPhone } from 'react-icons/fi';
import { FaInstagram } from "react-icons/fa";
import { IoLocationOutline } from 'react-icons/io5';

interface InfoProps {
    nama: string;
    alamat: string;
    email: string;
    instagram: string;
    whatsapp: string;
    maps: string;
}

const Info = ({ nama, alamat, email, instagram, whatsapp, maps }: InfoProps) => {
    const getModifiedMapSrc = () => {
        return (
            <iframe
                src={maps}
                width="100%"
                height="100%"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        );
    };

    return (
        <div className="flex w-full flex-col-reverse justify-center md:flex-row md:space-y-0 space-y-5">
            <div className="w-full space-y-5 md:w-1/2">
                <h1 className="hidden max-w-[90%] text-4xl font-extrabold text-deep-blue md:block">
                    {nama}
                </h1>
                <ul className="md:space-y-4 space-y-2">
                    <li className="flex items-center gap-2 md:gap-5">
                        <span className="flex size-12 items-center justify-center gap-5 rounded-full bg-deep-blue text-white">
                            <IoLocationOutline className="size-6" />
                        </span>
                        <span className="max-w-[80%] text-justify text-sm text-deep-blue md:text-start md:text-base">
                            {alamat}
                        </span>
                    </li>
                    <li className="flex items-center gap-2 md:gap-5">
                        <span className="flex size-12 items-center justify-center gap-5 rounded-full bg-deep-blue text-white">
                            <CiMail className="size-6" />
                        </span>
                        <span className="max-w-[80%] text-sm text-deep-blue md:text-base">
                            {email}
                        </span>
                    </li>
                    <li className="flex items-center gap-2 md:gap-5">
                        <span className="flex size-12 items-center justify-center gap-5 rounded-full bg-deep-blue text-white">
                            <FaInstagram className="size-6" />
                        </span>
                        <span className="max-w-[80%] text-sm text-deep-blue md:text-base">
                            {instagram}
                        </span>
                    </li>
                    <li className="flex items-center gap-2 md:gap-5">
                        <span className="flex size-12 items-center justify-center gap-5 rounded-full bg-deep-blue text-white">
                            <FaWhatsapp className="size-6" />
                        </span>
                        <span className="max-w-[80%] text-sm text-deep-blue md:text-base">
                            {whatsapp}
                        </span>
                    </li>
                </ul>
            </div>
            <div className="flex w-full justify-center md:w-1/2 md:justify-end">
                <div className="relative h-[250px] w-[250px] md:h-full md:w-full">
                    {getModifiedMapSrc()}
                </div>
            </div>
            <h1 className="block text-center text-xl font-extrabold text-deep-blue md:hidden">
                {nama}
            </h1>
        </div>
    );
};

export default Info;
