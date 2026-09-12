import { ArrowLeft, LoaderCircle, Trash2, X } from "lucide-react";
import { ReactNode } from "react";

const BaseModal = ({
    text,
    isAdd,
    showDelete,
    Cancel,
    isLoading,
    typeOfModal,
    openModal,
    handleButtonClick,
    children,
}: {
    text: string;
    isAdd?: boolean;
    showDelete?: boolean;
    Cancel: () => void;
    isLoading: boolean;
    typeOfModal: "Add" | "Edit";
    openModal?: () => void;
    handleButtonClick: () => void;
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
                <div className="sticky top-0 bg-emerald-50 dark:bg-gray-900 flex border-b ms:border-none border-emerald-300 dark:border-emerald-800 justify-between gap-2 p-3 ms:p-6 ms:pb-3 z-10 items-center w-full">
                    <div className="flex justify-center items-center gap-1">
                        <button
                            onClick={Cancel}
                            disabled={isLoading}
                            className="text-secondary-600 disabled:cursor-not-allowed hover:text-red-600 cursor-pointer duration-300 ease-in-out ms:hidden"
                        >
                            {/* <X></X> */}
                            <ArrowLeft></ArrowLeft>
                        </button>
                        <h2 className="px-1 font-bold text-2xl ms:text-3xl text-primary">
                            {typeOfModal === "Add" ? (isAdd ? "Add" : "Create") : "Update"} {text}
                        </h2>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        {showDelete && typeOfModal === "Edit" && (
                            <button
                                onClick={openModal}
                                disabled={isLoading}
                                className="text-secondary-600 disabled:cursor-not-allowed hover:text-red-600 cursor-pointer duration-300 ease-in-out"
                            >
                                <Trash2 size={22}></Trash2>
                                {/* <ArrowLeft></ArrowLeft> */}
                            </button>
                        )}
                        <button
                            onClick={Cancel}
                            disabled={isLoading}
                            className="text-secondary-600 disabled:cursor-not-allowed hover:text-red-600 cursor-pointer duration-300 ease-in-out hidden ms:block"
                        >
                            <X></X>
                            {/* <ArrowLeft></ArrowLeft> */}
                        </button>
                    </div>
                </div>
                <div className="w-full h-full justify-start items-center gap-2 flex flex-col px-4 pb-18 ms:px-6 ms:pb-2 py-3 overflow-auto">
                    {children}
                </div>

                {/* Buttons */}

                <div className="flex justify-end items-center w-full gap-2 fixed ms:static bottom-0 left-0 p-2 ms:p-6 ms:pt-3">
                    <button
                        onClick={Cancel}
                        disabled={isLoading}
                        className="px-4 hidden ms:block disabled:cursor-not-allowed cursor-pointer active:scale-95 py-2 rounded-full bg-app dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 duration-300 ease-in-out"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={handleButtonClick}
                        className="flex shadow-medium ms:shadow-none w-full ms:w-fit p-3 ms:px-4 gap-2  justify-center items-center disabled:active:scale-100 disabled:cursor-not-allowed disabled:bg-primary/70 cursor-pointer active:scale-95 ms:py-2 rounded-full bg-primary hover:bg-primary-hover text-white hover:bg-primary-800 duration-300 ease-in-out font-medium ms:font-normal"
                    >
                        {isLoading && (
                            <LoaderCircle className="animate-spin"></LoaderCircle>
                        )}
                        {typeOfModal === "Add" ? (isAdd ? "Add" : "Create") : "Update"} {text}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BaseModal;
