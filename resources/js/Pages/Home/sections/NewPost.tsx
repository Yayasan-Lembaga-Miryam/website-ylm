import Button from "@/Components/Shared/Button";
import { FaArrowRight } from "react-icons/fa6";

const NewPost = () => {
    const data = [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
        {
            id: 5,
        },
        {
            id: 6,
        },
        {
            id: 7,
        },
        {
            id: 8,
        },
    ];

    return (
        <div className="z-10 flex h-full min-h-[80vh] w-[80%] flex-col items-center justify-center gap-12">
            <h1 className="font-poppins text-4xl font-extrabold text-white">
                Postingan Terbaru
            </h1>
            <div className="grid h-full w-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                {data.map((item) => (
                    <div className="size-[18rem] rounded-xl w-full bg-red-400"></div>
                ))}
            </div>
            <Button
                appearance="filled"
                display="text-icon"
                icon={<FaArrowRight />}
                iconPosition="right"
                className="bg-white text-blue-950 hover:bg-dark-blue hover:text-white"
            >
                Lihat Lebih Banyak
            </Button>
        </div>
    );
};

export default NewPost;
