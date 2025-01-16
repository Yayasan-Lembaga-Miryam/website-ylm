const OrganizationChart = ({
    pengurus,
}: {
    pengurus: Array<{
        id: number;
        nama: string;
        jabatan: string;
        keterangan_jabatan: string;
        updated_at: string;
        foto_url: string;
    }>;
}) => {
    const getPerson = (id: number) => {
        const person = pengurus.find((p) => p.id === id);
        return (
            person || {
                id: 0,
                nama: '',
                jabatan: '',
                keterangan_jabatan: '',
                updated_at: '',
                foto_url: '',
            }
        );
    };

    return (
        <div className="relative -mt-72 flex min-h-screen w-full items-center justify-center bg-[url(/images/bg-StructureStaff.webp)] bg-cover bg-top bg-no-repeat py-20 font-poppins text-deep-blue">
            <div className="mt-60 flex w-[80%] flex-col items-center justify-center gap-12">
                <svg viewBox="0 0 1050 1188" className="w-full max-w-5xl">
                    {/* Top leader position */}
                    <foreignObject x="405" y="0" width="240" height="300">
                        <div className="h-full w-full overflow-hidden rounded-xl border border-gray-200">
                            <div className="h-3/4 w-full overflow-hidden bg-white">
                                <img
                                    src={getPerson(1).foto_url}
                                    alt={getPerson(1).nama}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="relative h-1/4">
                                <div className="absolute bottom-0 left-0 right-0 h-full">
                                    <div className="h-full bg-gradient-to-b from-blue-400 to-blue-600 p-2 text-center text-white">
                                        <p className="text-sm font-bold">
                                            {getPerson(1).jabatan}
                                        </p>
                                        <p className="text-xs font-bold">
                                            {getPerson(1).keterangan_jabatan}
                                        </p>
                                        <p className="text-xs mt-1 break-all line-clamp-1">
                                            {getPerson(1).nama}
                                        </p>
                                    </div>
                                    <svg className="absolute -bottom-[54px] left-0 right-0">
                                        <path
                                            d="M13.0326 194.037C-12.271 194.037 -23.5066 212.794 -27 233.975L267.297 225.194C266.038 211.787 266.938 194.681 254.173 191.357C238.216 187.203 223.771 199.229 209.514 204.234C195.257 209.238 169.575 207.031 151.164 199.1C132.753 191.169 103.295 204.234 73.0816 209.238C50.7864 212.93 41.7881 194.037 13.0326 194.037Z"
                                            fill="#3484FB"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M-28.7998 235.098C-12.3484 218.548 43.7729 194.102 70.2557 204.031C103.359 216.443 122.037 220.137 140.508 211.863C158.979 203.588 183.485 195.852 199.04 196.573C270.419 199.877 269.362 225.867 265.031 232.623C264.298 233.767 255.047 234.601 240 235.192V317.4H0.000144958V235.488C-10.2714 235.361 -19.9454 235.229 -28.7998 235.098Z"
                                            fill="#14549A"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </foreignObject>

                    {/* Second row positions */}
                    {[0, 270, 540, 810].map((x, index) => (
                        <foreignObject
                            key={`row2-${index}`}
                            x={x}
                            y="430"
                            width="240"
                            height="300"
                        >
                            <div className="h-full w-full overflow-hidden rounded-xl border border-gray-200">
                                <div className="h-3/4 w-full overflow-hidden bg-white">
                                    <img
                                        src={getPerson(index + 2).foto_url}
                                        alt={getPerson(index + 2).nama}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="relative h-1/4">
                                    <div className="absolute bottom-0 left-0 right-0 h-full">
                                        <div className="h-full bg-gradient-to-b from-blue-400 to-blue-600 p-2 text-center text-white">
                                            <p className="text-sm font-bold">
                                                {getPerson(index + 2).jabatan}
                                            </p>
                                            <p className="text-xs font-bold">
                                                {
                                                    getPerson(index + 2)
                                                        .keterangan_jabatan
                                                }
                                            </p>
                                            <p className="text-xs mt-1 break-all line-clamp-1">
                                                {getPerson(index + 2).nama}
                                            </p>
                                        </div>
                                        <svg className="absolute -bottom-[54px] left-0 right-0">
                                            <path
                                                d="M13.0326 624.037C-12.271 624.037 -23.5066 642.794 -27 663.975L267.297 655.194C266.038 641.787 266.938 624.681 254.173 621.357C238.216 617.203 223.771 629.229 209.514 634.234C195.257 639.238 169.575 637.031 151.164 629.1C132.753 621.169 103.295 634.234 73.0816 639.238C50.7864 642.93 41.7881 624.037 13.0326 624.037Z"
                                                fill="#3484FB"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M-28.7998 665.098C-12.3484 648.548 43.7729 624.102 70.2557 634.031C103.359 646.443 122.037 650.137 140.508 641.863C158.979 633.588 183.485 625.852 199.04 626.573C270.419 629.877 269.362 655.867 265.031 662.623C264.298 663.767 255.047 664.601 240 665.192V747.4H0.000144958V665.488C-10.2714 665.361 -19.9454 665.229 -28.7998 665.098Z"
                                                fill="#14549A"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </foreignObject>
                    ))}

                    {/* Third row positions */}
                    {[268, 537, 807].map((x, index) => (
                        <foreignObject
                            key={`row3-${index}`}
                            x={x}
                            y="888"
                            width="240"
                            height="300"
                        >
                            <div className="h-full w-full overflow-hidden rounded-xl border border-gray-200">
                                <div className="h-3/4 w-full overflow-hidden bg-white">
                                    <img
                                        src={getPerson(index + 6).foto_url}
                                        alt={getPerson(index + 6).nama}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="relative h-1/4">
                                    <div className="absolute bottom-0 left-0 right-0 h-full">
                                        <div className="h-full bg-gradient-to-b from-blue-400 to-blue-600 p-2 text-center text-white">
                                            <p className="text-sm px-4 font-bold">
                                                {getPerson(index + 6).jabatan}
                                            </p>
                                            <p className="text-xs mt-1/2 break-all line-clamp-1">
                                                {getPerson(index + 6).nama}
                                            </p>
                                        </div>
                                        <svg className="absolute -bottom-[54px] left-0 right-0">
                                            <path
                                                d="M13.0326 1082.04C-12.271 1082.04 -23.5066 1100.79 -27 1121.97L267.297 1113.19C266.038 1099.79 266.938 1082.68 254.173 1079.36C238.216 1075.2 223.771 1087.23 209.514 1092.23C195.257 1097.24 169.575 1095.03 151.164 1087.1C132.753 1079.17 103.295 1092.23 73.0816 1097.24C50.7864 1100.93 41.7881 1082.04 13.0326 1082.04Z"
                                                fill="#3484FB"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M-28.7998 1123.1C-12.3484 1106.55 43.7729 1082.1 70.2557 1092.03C103.359 1104.44 122.037 1108.14 140.508 1099.86C158.979 1091.59 183.485 1083.85 199.04 1084.57C270.419 1087.88 269.362 1113.87 265.031 1120.62C264.298 1121.77 255.047 1122.6 240 1123.19V1205.4H0.000144958V1123.49C-10.2714 1123.36 -19.9454 1123.23 -28.7998 1123.1Z"
                                                fill="#14549A"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </foreignObject>
                    ))}

                    {/* Connection lines */}
                    <path
                        d="M388 809H928"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M657 809L657 730"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M387 888L387 811"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M657 888L657 811"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M927 888L927 811"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M118 363L927 363"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M522.5 363v-61"
                        stroke="white"
                        stroke-width="5"
                        stroke-linecap="round"
                    />
                    <path
                        d="M118 430L117.5 365"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M387.5 442L387.5 365"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M657.5 442L657.5 365"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M927.5 440L927.5 363"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
};

export default OrganizationChart;
