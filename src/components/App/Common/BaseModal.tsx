import { ArrowLeft, LoaderCircle, Trash2 } from "lucide-react";
import { ReactNode } from "react";

const BaseModal = ({
    title,
    showDelete,
    Cancel,
    isLoading,
    typeOfModal,
    openModal,
    handleUpdate,
    children,
}: {
    title: string;
    showDelete?: boolean;
    Cancel: () => void;
    isLoading: boolean;
    typeOfModal: "Create" | "Update";
    openModal?: () => void;
    handleUpdate: () => void;
    children?: ReactNode;
}) => {
    return (
        <div
            onClick={Cancel}
            className="fixed start:scale-0 start:opacity-0 transition-all opacity-100 scale-100 ease-in-out duration-300 inset-0 z-15 backdrop-blur-sm flex justify-center items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex overflow-hidden w-full h-full ms:h-fit rounded-none justify-start ms:max-h-9/10 flex-col bg-emerald-50 dark:bg-gray-900 ms:justify-between items-center shadow-large p-0 ms:rounded-5xl ms:w-9/10 md:w-2/3 lg:w-1/2 dark:shadow-primary relative`}
            >
                {/* Header */}
                <div className="absolute top-0 bg-linear-to-b from-white dark:from-black to-transparent ms:from-transparent dark:ms:from-transparent flex ms:border-none dark:border-emerald-800 justify-between gap-2 p-3 ms:p-4 items-center w-full z-5">
                    <div className="flex justify-center items-center gap-2 min-w-0">
                        <button
                            onClick={Cancel}
                            className="hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-950 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800  p-3 rounded-full cursor-pointer duration-300 ease-in-out shadow-small"
                        >
                            <ArrowLeft></ArrowLeft>
                        </button>
                        <h2 className="border border-gray-200 dark:border-gray-700  bg-white dark:bg-gray-800 px-6 p-2 rounded-full font-bold text-2xl ms:text-3xl text-primary shadow-small truncate">
                            {typeOfModal} {title}
                        </h2>
                    </div>

                    {showDelete && (
                        <button
                            onClick={openModal}
                            className="hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-950/50 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800  p-3 rounded-full cursor-pointer duration-300 ease-in-out shadow-small"
                        >
                            <Trash2></Trash2>
                        </button>
                    )}
                </div>
                <div className="w-full h-full justify-start items-center gap-4 flex flex-col px-4 py-20 ms:py-22 ms:px-6 ms:pb-6 overflow-auto">
                    {children}
                </div>

                {/* Buttons */}

                <div className="flex justify-end items-center w-full gap-2 fixed ms:static bottom-0 left-0 p-2 ms:p-6 ms:pt-2 ">
                    <button
                        onClick={Cancel}
                        disabled={isLoading}
                        className="px-4 hidden ms:block disabled:cursor-not-allowed cursor-pointer active:scale-95 py-2 rounded-full bg-white border border-gray-200 dark:border-transparent dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 duration-300 ease-in-out"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={handleUpdate}
                        className="flex shadow-medium ms:shadow-none w-full ms:w-fit p-3 ms:px-4 gap-2  justify-center items-center disabled:active:scale-100 disabled:cursor-not-allowed disabled:bg-primary/70 cursor-pointer active:scale-95 ms:py-2 rounded-full bg-primary hover:bg-primary-hover text-white hover:bg-primary-800 duration-300 ease-in-out font-medium ms:font-normal"
                    >
                        {isLoading && (
                            <LoaderCircle className="animate-spin"></LoaderCircle>
                        )}
                        {typeOfModal} {title}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BaseModal;
