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
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = maps;
        const iframe = tempDiv.querySelector('iframe');

        if (iframe) {
            iframe.removeAttribute('width');
            iframe.removeAttribute('height');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            return tempDiv.innerHTML;
        }
        return maps;
    };

    return (
        <div className="flex w-full justify-center">
            <div className="w-1/2 space-y-5">
                <h1 className="text-4xl font-extrabold text-deep-blue">{nama}</h1>
                <ul className='space-y-4'>
                    <li className='flex gap-5 items-center'>
                        <span className="flex gap-5 size-12 items-center justify-center bg-deep-blue rounded-full text-white">
                            <IoLocationOutline />
                        </span>
                        <span className='text-deep-blue'>{alamat}</span>
                    </li>
                    <li className='flex gap-5 items-center'>
                        <span className="flex gap-5 size-12 items-center justify-center bg-deep-blue rounded-full text-white">
                            <CiMail />
                        </span>
                        <span className='text-deep-blue'>{email}</span>
                    </li>
                    <li className='flex gap-5 items-center'>
                        <span className="flex gap-5 size-12 items-center justify-center bg-deep-blue rounded-full text-white">
                            <FiPhone />
                        </span>
                        <span className='text-deep-blue'>{telepon}</span>
                    </li>
                    <li className='flex gap-5 items-center'>
                        <span className="flex gap-5 size-12 items-center justify-center bg-deep-blue rounded-full text-white">
                            <FiPhone />
                        </span>
                        <span className='text-deep-blue'>{whatsapp}</span>
                    </li>
                </ul>
            </div>
            <div className="w-1/2 flex justify-end">
                <div className="relative w-full h-full">
                <div
                    className="absolute inset-0"
                    dangerouslySetInnerHTML={{ __html: getModifiedMapSrc() }} 
                ></div>
                </div>
            </div>
        </div>
    );
};

export default Info;
