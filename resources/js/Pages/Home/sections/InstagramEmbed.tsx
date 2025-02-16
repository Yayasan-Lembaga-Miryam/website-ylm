declare global {
    interface Window {
        instgrm?: {
            Embeds: {
                process(): void;
            };
        };
    }
}

import { useEffect, useState } from 'react';

interface InstagramEmbedProps {
    unitSlug?: string;
    useDefault?: boolean;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
    unitSlug,
    useDefault = true,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const instagramHandles: { [key: string]: string } = {
        // TK Units
        'tk-xaverius-1-bandar-lampung': 'tkxaveriusbandarlampung',
        'tk-xaverius-metro': 'tkxaverius',
        'tk-xaverius-seputih-banyak': 'tkxaveriusseputihbanyak_',
        'tk-xaverius-1-palembang': 'tkxaverius1palembang',
        'tk-miryam-tenggarong-seberang': 'tk_miryam_ts',

        // SD Units
        'sd-xaverius-1-bandar-lampung': 'sdxaverius1bandarlampung',
        'sd-xaverius-metro': 'sdxaverius.metro',
        'sd-xaverius-1-palembang': 'sdxaverius1palembang',

        // SMP Units
        'smp-xaverius-1-bandar-lampung': 'smp_xavetebdl',
        'smp-xaverius-6-palembang': 'smpxavenam',
    };

    const defaultHandle = 'lembagamiryamylm';

    if (!unitSlug || (!instagramHandles[unitSlug] && !useDefault)) {
        return null;
    }

    const instagramHandle =
        unitSlug && instagramHandles[unitSlug]
            ? instagramHandles[unitSlug]
            : useDefault
              ? defaultHandle
              : null;

    if (!instagramHandle) {
        return null;
    }

    useEffect(() => {
        setIsLoading(true);
        setHasError(false);

        const existingScript = document.getElementById(
            'instagram-embed-script',
        );
        if (existingScript) {
            document.body.removeChild(existingScript);
            if (window.instgrm) {
                delete window.instgrm;
            }
        }

        const script = document.createElement('script');
        script.id = 'instagram-embed-script';
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;

        script.onload = () => {
            if (window.instgrm) {
                window.instgrm.Embeds.process();
            }
            setIsLoading(false);
        };

        script.onerror = () => {
            setHasError(true);
            setIsLoading(false);
        };

        document.body.appendChild(script);

        return () => {
            const script = document.getElementById('instagram-embed-script');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, [instagramHandle]);

    if (hasError) {
        return null;
    }

    return (
        <div className="flex w-full justify-center">
            {isLoading && <div className="p-4">Loading Instagram embed...</div>}
            <blockquote
                className="instagram-media w-full max-w-full rounded-md border-0 bg-white p-0 shadow-md md:min-w-[326px]"
                data-instgrm-permalink={`https://www.instagram.com/${instagramHandle}`}
                data-instgrm-version="14"
            >
                <div className="p-4">
                    <a
                        href={`https://www.instagram.com/${instagramHandle}`}
                        className="block w-full bg-white p-0 text-center leading-none no-underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="flex flex-row items-center">
                            <div className="mr-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"></div>
                            <div className="flex flex-grow flex-col justify-center">
                                <div className="mb-1.5 h-3.5 w-24 rounded bg-gray-200"></div>
                                <div className="h-3.5 w-16 rounded bg-gray-200"></div>
                            </div>
                        </div>
                        <div className="py-[19%]"></div>
                        <div className="mx-auto mb-3 block h-12 w-12">
                            <svg
                                width="50px"
                                height="50px"
                                viewBox="0 0 60 60"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <g
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <g
                                        transform="translate(-511.000000, -20.000000)"
                                        fill="#000000"
                                    >
                                        <g>
                                            <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </a>
                </div>
            </blockquote>
        </div>
    );
};

export default InstagramEmbed;
