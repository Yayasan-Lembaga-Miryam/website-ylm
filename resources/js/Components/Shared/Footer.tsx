import { CiInstagram, CiYoutube } from 'react-icons/ci';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdFax } from 'react-icons/md';

const Footer = () => {
    return (
        <div className="z-50 flex md:h-80 h-full w-full items-center justify-center bg-dark-blue">
            <div className="flex h-full w-[80%] flex-col items-center justify-between gap-10 py-10 md:py-14 text-white">
                <div className="flex md:flex-row flex-col w-full items-center md:justify-between md:gap-0 gap-3">
                    <div className="md:w-1/3 space-y-3 flex flex-col items-center">
                        <img src="/images/img-LogoText.png" alt="Logo YLM" className='md:w-full w-[80%]'/>
                        <p className="md:text-justify md:text-sm text-[10px] text-center">
                            Jl. Patimura No.36, Gunung Mas, Kec. Tlk. Betung
                            Utara, Kota Bandar Lampung, Lampung 35011
                        </p>
                    </div>
                    <div className="flex h-full flex-col items-start justify-between gap-3">
                        <div className="flex flex-col md:items-start items-center md:gap-3 gap-0">
                            <div className="flex items-center gap-2 md:text-sm text-[10px]">
                                <IoMdMail />
                                <span>Email : lembagamiryam@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2 md:text-sm text-[10px]">
                                <FaPhoneAlt />
                                <span>Telp : 0721481934</span>
                            </div>
                            <div className="flex items-center gap-2 md:text-sm text-[10px]">
                                <MdFax />
                                <span>Fax : 35211</span>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start md:w-max w-full gap-3">
                            <a
                                href=" https://www.youtube.com/@yayasanlembagamiryam"
                                rel="noopener"
                                target="_blank"
                                title="link youtube"
                                className="flex items-center justify-center rounded-full bg-white p-2 text-dark-blue"
                            >
                                <CiYoutube className="size-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/lembagamiryamylm/"
                                rel="noopener"
                                target="_blank"
                                title="link instagram"
                                className="flex items-center justify-center rounded-full bg-white p-2 text-dark-blue"
                            >
                                <CiInstagram className="size-5" />
                            </a>
                            <a
                                href="https://wa.me/0885136126774"
                                rel="noopener"
                                target="_blank"
                                title="link whatsapp"
                                className="flex items-center justify-center rounded-full bg-white p-2 text-dark-blue"
                            >
                                <FaWhatsapp className="size-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex md:text-base text-center md:text-start text-[10px] w-full justify-center">
                    © 2024 Yayasan Lembaga Miryam | Designed & developed by IT
                    Partnership
                </div>
            </div>
        </div>
    );
};

export default Footer;
