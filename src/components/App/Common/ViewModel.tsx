import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { ReactNode } from "react";

const ViewModal = ({
    title,
    showDelete,
    openModal,
    handleUpdate,
    Cancel,
    children,
}: {
    title: string;
    showDelete?: boolean;
    openModal?: () => void;
    handleUpdate: () => void;
    Cancel: () => void;
    children?: ReactNode;
}) => {
    return (
        <div
            onClick={Cancel}
            className="fixed start:scale-0 start:opacity-0 transition-all opacity-100 scale-100 ease-in-out duration-300 inset-0 z-5 backdrop-blur-sm flex justify-center items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex overflow-hidden w-full h-full ms:h-fit rounded-none justify-start ms:max-h-9/10 flex-col bg-emerald-50 dark:bg-gray-900 ms:justify-between items-center shadow-large p-0 ms:rounded-5xl ms:w-9/10 md:w-2/3 lg:w-1/2 dark:shadow-primary relative`}
            >
                {/* Header */}
                <div className="absolute top-0 bg-linear-to-b from-white dark:from-black to-transparent ms:from-transparent dark:ms:from-transparent flex ms:border-none dark:border-emerald-800 justify-between gap-2 p-3 items-center w-full">
                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={Cancel}
                            className="hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-950 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800  p-3 rounded-full cursor-pointer duration-300 ease-in-out shadow-small"
                        >
                            {/* <X></X> */}
                            <ArrowLeft></ArrowLeft>
                        </button>
                        <h2 className="border border-gray-200 dark:border-gray-700  bg-white dark:bg-gray-800 px-6 p-2 rounded-full font-bold text-2xl ms:text-3xl text-primary shadow-small line-clamp-1 wrap-anywhere">
                            {title}
                        </h2>
                    </div>
                    <div className="flex justify-center items-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-full shadow-small">
                        <button
                            onClick={handleUpdate}
                            className="hover:text-primary-hover hover:bg-emerald-100 dark:hover:bg-emerald-900/50 p-3 rounded-full  cursor-pointer duration-300 ease-in-out"
                        >
                            <Edit></Edit>
                        </button>
                        {showDelete && (
                            <>
                                <span className="h-6 w-px bg-gray-300"></span>
                                <button
                                    onClick={openModal}
                                    className="hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 p-3 rounded-full   cursor-pointer duration-300 ease-in-out"
                                >
                                    <Trash2></Trash2>
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-full h-full justify-start items-center gap-4 flex flex-col px-4 py-18 ms:px-6 ms:pb-6 overflow-auto">
                    {children}
                </div>

                {/* Buttons */}
                {/* 
                <div className="flex justify-end items-center w-full gap-2 fixed ms:static bottom-0 left-0 p-2 ms:p-6 ms:pt-4">
                    <button
                        disabled={isLoading}
                        onClick={handleButtonClick}
                        className="flex shadow-medium ms:shadow-none w-full ms:w-fit p-4 ms:px-4 gap-2  justify-center items-center disabled:active:scale-100  disabled:bg-primary/70 cursor-pointer active:scale-95 ms:py-2 rounded-full bg-primary hover:bg-primary-hover text-white hover:bg-primary-800 duration-300 ease-in-out font-medium ms:font-normal"
                    >
                        {isLoading && (
                            <LoaderCircle className="animate-spin"></LoaderCircle>
                        )}
                        {text}
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default ViewModal;
