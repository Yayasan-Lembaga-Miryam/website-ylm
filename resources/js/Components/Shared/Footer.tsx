import { CiInstagram, CiYoutube } from 'react-icons/ci';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdFax } from 'react-icons/md';

const Footer = () => {
    return (
        <div className="z-50 flex h-80 w-full items-center justify-center bg-dark-blue">
            <div className="flex h-full w-[80%] flex-col items-center justify-between gap-10 py-14 text-white">
                <div className="flex w-full items-center justify-between">
                    <div className="w-1/3 space-y-3">
                        <img src="/images/img-LogoText.png" alt="Logo YLM" />
                        <p className="text-justify text-sm">
                            Jl. Patimura No.36, Gunung Mas, Kec. Tlk. Betung
                            Utara, Kota Bandar Lampung, Lampung 35011
                        </p>
                    </div>
                    <div className="flex h-full flex-col items-start justify-between gap-3">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-sm">
                                <IoMdMail />
                                <span>Email : lembagamiryam@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <FaPhoneAlt />
                                <span>Telp : 0721481934</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <MdFax />
                                <span>Fax : 35211</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
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
                <div className="flex w-full justify-center">
                    © 2024 Yayasan Lembaga Miryam | Designed & developed by IT
                    Partnership
                </div>
            </div>
        </div>
    );
};

export default Footer;
