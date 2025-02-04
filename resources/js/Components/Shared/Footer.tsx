import { CiInstagram, CiYoutube } from 'react-icons/ci';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdFax } from 'react-icons/md';

const Footer = () => {
    return (
        <div className="z-50 flex h-full w-full items-center justify-center bg-dark-blue md:h-80">
            <div className="flex h-full w-[80%] flex-col items-center justify-between gap-10 py-10 text-white md:py-14">
                <div className="flex w-full flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
                    <div className="flex flex-col items-center space-y-3 md:w-1/3">
                        <img
                            src="/images/img-LogoText.png"
                            alt="Logo YLM"
                            className="w-[80%] md:w-full"
                        />
                        <p className="text-center text-[10px] md:text-justify md:text-sm">
                            Jl. Patimura No.36, Gunung Mas, Kec. Tlk. Betung
                            Utara, Kota Bandar Lampung, Lampung 35011
                        </p>
                    </div>
                    <div className="flex h-full flex-col items-start justify-between gap-3">
                        <div className="flex flex-col items-center gap-0 md:items-start md:gap-3">
                                <a
                                    href="mailto:lembagamiryam@gmail.com"
                                    className="flex items-center gap-2 text-[10px] md:text-sm"
                                >
                                    <IoMdMail />
                                    <span>Email : lembagamiryam@gmail.com</span>
                                </a>
                            <div className="flex items-center gap-2 text-[10px] md:text-sm">
                                <FaPhoneAlt />
                                <span>Telp : 0721481934</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] md:text-sm">
                                <MdFax />
                                <span>Kode Pos : 35011</span>
                            </div>
                        </div>
                        <div className="flex w-full justify-center gap-3 md:w-max md:justify-start">
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
                                href="https://wa.me/+62885136126774"
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
                <div className="flex w-full justify-center text-center text-[10px] md:text-start md:text-base">
                    © 2024 Yayasan Lembaga Miryam | Designed & developed by IT
                    Partnership
                </div>
            </div>
        </div>
    );
};

export default Footer;
