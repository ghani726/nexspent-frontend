import { LoaderCircle, Info, MergeIcon } from "lucide-react";
import { useRef, useState } from "react";

import useAuth from "@/hooks/Auth";
import toast from "react-hot-toast";
import { MergeCategory } from "@/api/CategoryAPI";
import { MergeAccount } from "@/api/AccountsAPI";
import InfoModal from "./InfoModal.js";
import { ApiError } from "@/types/common.js";

interface MergePropsForHandlers {
    firstID: string;
    mergeID: string;
    accessToken: string;
    setIsLoading: (value: boolean) => void;
    Cancel: () => void;
    GetData: () => void;
}
const handleMergeCategory = async ({
    firstID,
    mergeID,
    setIsLoading,
    Cancel,
    accessToken,
    GetData,
}: MergePropsForHandlers) => {
    setIsLoading(true);
    try {
        const res = await MergeCategory({
            categoryID: firstID,
            mergeCategoryID: mergeID,
            token: accessToken,
        });
        if (res.success) {
            toast.success("Category merged successfully!");
            setIsLoading(false);
            GetData();
            Cancel();
            return;
        } else {
            setIsLoading(false);
            return toast.error(res.error.message);
        }
    } catch (err) {
        const error = err as ApiError;
        setIsLoading(false);
        if (error?.response?.data?.error?.message) {
            return toast.error(error.response.data.error.message);
        } else {
            return toast.error(error.message);
        }
    }
};
const handleMergeAccount = async ({
    firstID,
    mergeID,
    setIsLoading,
    Cancel,
    accessToken,
    GetData,
}: MergePropsForHandlers) => {
    setIsLoading(true);
    try {
        const res = await MergeAccount({
            accountID: firstID,
            mergeAccountID: mergeID,
            token: accessToken,
        });
        if (res.success) {
            toast.success("Account merged successfully!");
            setIsLoading(false);
            GetData();
            Cancel();
            return;
        } else {
            setIsLoading(false);
            return toast.error(res.error.message);
        }
    } catch (err) {
        const error = err as ApiError;
        setIsLoading(false);
        if (error?.response?.data?.error?.message) {
            return toast.error(error.response.data.error.message);
        } else {
            return toast.error(error.message);
        }
    }
};

const MergeModal = ({
    showMergeModal,
    type = "Category",
    Cancel,
    firstID,
    mergeID,
    mergeObj1,
    mergeObj2,
    GetData,
}: {
    showMergeModal: boolean;
    type: "Account" | "Category";
    Cancel: () => void;
    GetData: () => void;
    firstID: string;
    mergeID: string;
    mergeObj1: string;
    mergeObj2: string;
}) => {
    // Global Data
    const { accessToken } = useAuth();

    // States
    const [isLoading, setIsLoading] = useState(false);

    // Button Click Handler
    const handleButtonClick = () => {
        if (type === "Category") {
            handleMergeCategory({
                firstID,
                mergeID,
                setIsLoading,
                Cancel,
                accessToken: accessToken ?? "",
                GetData,
            });
        } else if (type === "Account") {
            handleMergeAccount({
                firstID,
                mergeID,
                setIsLoading,
                Cancel,
                accessToken: accessToken ?? "",
                GetData,
            });
        }
    };

    const infoRef = useRef<HTMLDialogElement>(null);

    const openInfoModal = () => infoRef.current?.showModal();

    return (
        <div
            className={`flex text-black ${!showMergeModal ? "translate-y-[-200%] scale-0 opacity-0 w-0 h-0 p-0" : "translate-0 scale-100 opacity-100"} duration-300 ease-in-out gap-4 flex-col bg-surface dark:bg-gray-800 text-white justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-4 rounded-5xl w-full`}
        >
            {/* Header */}

            <div className="flex items-center justify-between w-full">
                <h4 className="px-1 text-xl font-bold text-primary">
                    Merge {type}
                </h4>
                <button
                    onClick={openInfoModal}
                    title="Info"
                    className="p-1.5 text-black dark:text-white rounded-full cursor-pointer"
                >
                    <Info size={20} strokeWidth={2.8}></Info>
                </button>
                <InfoModal
                    ref={infoRef}
                    title={`Merging ${type}`}
                    desc={`This feature allows you to merge all of your current ${type.toLowerCase()} transactions${type === "Account" ? " and balance" : ""} to another ${type.toLowerCase()} allowing you to delete the current ${type.toLowerCase()}. For more detailed info, please vist the guide.`}
                    icon={<MergeIcon size={36}></MergeIcon>}
                ></InfoModal>
            </div>

            {/* Main Content */}

            <div className="flex flex-col items-center justify-center w-full gap-2">
                <p className="w-full text-center text-black dark:text-white">
                    Merge{" "}
                    <strong className="text-primary line-clamp-1 wrap-anywhere">
                        {mergeObj1}
                    </strong>{" "}
                    with{" "}
                    <strong
                        className={`${mergeObj2 ? "text-primary" : "text-gray-600"} line-clamp-1 wrap-anywhere`}
                    >
                        {mergeObj2 ||
                            `Select ${type === "Category" ? "a" : "an"} ${type.toLowerCase()} to merge with.`}
                    </strong>
                </p>
            </div>

            {/* Buttons */}

            <div className="flex items-center justify-end w-full gap-2">
                <button
                    onClick={Cancel}
                    disabled={isLoading}
                    className="p-2 px-3 text-xs duration-300 ease-in-out rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 dark:bg-gray-700 disabled:cursor-not-allowed active:scale-95 bg-app"
                >
                    Cancel
                </button>
                <button
                    disabled={isLoading}
                    onClick={handleButtonClick}
                    className="flex gap-2 p-2 px-3 text-xs font-semibold text-white duration-300 ease-in-out rounded-full cursor-pointer disabled:active:scale-100 disabled:cursor-not-allowed disabled:bg-primary/70 active:scale-95 bg-primary hover:bg-primary-hover hover:bg-primary-800"
                >
                    {isLoading && (
                        <LoaderCircle className="animate-spin"></LoaderCircle>
                    )}
                    Merge {type}
                </button>
            </div>
        </div>
    );
};

export default MergeModal;
