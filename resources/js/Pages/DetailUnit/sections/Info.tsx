import { CiMail } from 'react-icons/ci';
import { FiPhone } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';

interface InfoProps {
    nama: string;
    alamat: string;
    email: string;
    telepon: string;
    whatsapp: string;
    maps: string;
}

const Info = ({ nama, alamat, email, telepon, whatsapp, maps }: InfoProps) => {
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
        <div className="flex w-full justify-center">
            <div className="w-1/2 space-y-5">
                <h1 className="text-4xl font-extrabold max-w-[90%] text-deep-blue">
                    {nama}
                </h1>
                <ul className="space-y-4">
                    <li className="flex items-center gap-5">
                        <span className="flex size-12 items-center justify-center gap-5 rounded-full bg-deep-blue text-white">
                            <IoLocationOutline />
                        </span>
                        <span className="max-w-[80%] text-deep-blue">
                            {alamat}
                        </span>
                    </li>
                    <li className="flex items-center gap-5">
                        <span className="flex size-12 items-center justify-center gap-5 rounded-full bg-deep-blue text-white">
                            <CiMail />
                        </span>
                        <span className="max-w-[80%] text-deep-blue">
                            {email}
                        </span>
                    </li>
                    <li className="flex items-center gap-5">
                        <span className="flex size-12 items-center justify-center gap-5 rounded-full bg-deep-blue text-white">
                            <FiPhone />
                        </span>
                        <span className="max-w-[80%] text-deep-blue">
                            {telepon}
                        </span>
                    </li>
                    <li className="flex items-center gap-5">
                        <span className="flex size-12 items-center justify-center gap-5 rounded-full bg-deep-blue text-white">
                            <FiPhone />
                        </span>
                        <span className="max-w-[80%] text-deep-blue">
                            {whatsapp}
                        </span>
                    </li>
                </ul>
            </div>
            <div className="flex w-1/2 justify-end">
                <div className="relative h-full w-full">
                    {getModifiedMapSrc()}
                </div>
            </div>
        </div>
    );
};

export default Info;
