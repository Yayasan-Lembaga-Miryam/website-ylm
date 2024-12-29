import { CiInstagram, CiYoutube } from 'react-icons/ci';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdFax } from 'react-icons/md';

const Footer = () => {
    return (
        <div className="z-50 flex h-80 w-full items-center justify-center bg-dark-blue">
            <div className="flex w-[80%] flex-col items-center justify-between h-full gap-10 text-white py-14">
                <div className="flex w-full items-center justify-between">
                    <div className="w-1/3">
                        <img src="/images/img-Logo.png" alt="Logo YLM" />
                        <p className="text-justify text-sm">
                            Jl. Patimura No.36, Gunung Mas, Kec. Tlk. Betung
                            Utara, Kota Bandar Lampung, Lampung 35011
                        </p>
                    </div>
                    <div className='flex flex-col gap-3 items-start justify-between h-full'>
                        <div className='flex flex-col gap-3'>
                            <div className="flex gap-2 text-sm">
                                <IoMdMail />
                                <span>Email : lembagamiryam@gmail.com</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <FaPhoneAlt />
                                <span>Telp : 0721481934</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <MdFax />
                                <span>Fax : 35211</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className='p-2 bg-white rounded-full flex justify-center items-center text-dark-blue'>
                                <CiYoutube className='size-5' />
                            </span>
                            <span className='p-2 bg-white rounded-full flex justify-center items-center text-dark-blue'>
                                <CiInstagram className='size-5' />
                            </span>
                            <span className='p-2 bg-white rounded-full flex justify-center items-center text-dark-blue'>
                                <FaWhatsapp className='size-5' />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center">
                    © 2024 Yayasan Lembaga Miryam | Designed & developed by IT
                    Partnership
                </div>
            </div>
        </div>
    );
};

export default Footer;
