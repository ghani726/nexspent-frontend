import { Info } from "lucide-react";

const InfoButton = ({ openInfoModal }) => {
    return (
        <button
            onClick={openInfoModal}
            title="More"
            className="p-1.5 h-full hover:bg-gray-200 dark:hover:bg-gray-800 aspect-square flex justify-center items-center rounded-full cursor-pointer"
        >
            <Info size={20} strokeWidth={2.8}></Info>
        </button>
    );
};

export default InfoButton;
