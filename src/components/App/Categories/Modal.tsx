import { useState } from "react";

import useAuth from "@/hooks/Auth";
import toast from "react-hot-toast";
import { CreateCategory, UpdateCategory } from "@/api/CategoryAPI";
import ColorPicker from "@/components/App/Common/ColorPicker";
import useData from "@/hooks/Data";
import EmojiPicker from "@/components/App/Common/EmojiPicker";
import colors from "@/utils/color";
import BaseModal from "@/components/App/Common/BaseModal";
import { ICategory } from "@/types/category";
import { ApiError } from "@/types/common";
import TypeSelector from "@/components/App/Common/TypeSelector";
import HandleErrorMessage from "@/utils/networkError";

interface ICreate {
    name: string;
    selectedColor: string;
    selectedIcon: string;
    slider: number;
    setIsLoading: (value: boolean) => void;
    Cancel: () => void;
    GetData: () => void;
    accessToken: string;
}
interface IUpdate extends ICreate {
    _id: string;
    isTypeEditable: boolean;
}
const handleCreation = async ({
    name,
    selectedColor,
    selectedIcon,
    slider,
    setIsLoading,
    Cancel,
    accessToken,
    GetData,
}: ICreate) => {
    if (!name.trim()) {
        return toast.error("Please enter a category name.");
    }
    setIsLoading(true);
    try {
        await CreateCategory({
            name: name,
            bgColor: selectedColor,
            categoryType: slider === 0 ? "expense" : "income",
            icon: selectedIcon,
            token: accessToken,
        });

        toast.success("Category created successfully!");
        setIsLoading(false);
        GetData();
        Cancel();
        return;
    } catch (error) {
        setIsLoading(false);
        const err = error as ApiError;
        const res = err?.response?.data;

        if (res) toast.error(res.error.message);
        else HandleErrorMessage(err);
    }
};

const handleEdit = async ({
    name,
    selectedColor,
    selectedIcon,
    slider,
    _id,
    setIsLoading,
    Cancel,
    accessToken,
    isTypeEditable,
    GetData,
}: IUpdate) => {
    if (!name.trim()) {
        return toast.error("Please enter a category name.");
    }
    setIsLoading(true);

    try {
        await UpdateCategory({
            name: name,
            bgColor: selectedColor,
            categoryType: isTypeEditable && slider === 0 ? "expense" : "income",

            icon: selectedIcon,
            categoryID: _id,
            token: accessToken,
        });

        toast.success("Category updated successfully!");
        setIsLoading(false);
        GetData();
        Cancel();
        return;
    } catch (error) {
        setIsLoading(false);
        const err = error as ApiError;
        const res = err?.response?.data;

        if (res) toast.error(res.error.message);
        else HandleErrorMessage(err);
    }
};

const CategoriesModal = ({
    typeOfModal,
    Cancel,
    editObj,
    GetData,
}: {
    typeOfModal: "Create" | "Update";
    editObj?: ICategory;
    Cancel: () => void;
    GetData: () => void;
}) => {
    // Global Data
    const { transactions } = useData();
    const { accessToken } = useAuth();

    // States
    const [isLoading, setIsLoading] = useState(false);
    const [showIconModal, setShowIconModal] = useState(false);

    // Checks if any transactions are linked to the category being edited. If there are, the category type cannot be changed.If not then check type of Modal if it is an edit modal dont allow to edit.
    const isTypeEditable =
        transactions.filter((e) => e.category === editObj?._id).length === 0
            ? true
            : typeOfModal === "Create"
              ? true
              : false;

    // Form Details
    const [name, setName] = useState(
        typeOfModal === "Update" ? editObj?.name : "",
    );
    const [selectedColor, setSelectedColor] = useState(
        typeOfModal === "Update" ? editObj?.bgColor : "Secondary",
    );
    const [selectedIcon, setSelectedIcon] = useState(
        typeOfModal === "Update" ? editObj?.icon : "🖼",
    );

    const [slider, setSlider] = useState(
        typeOfModal === "Update"
            ? editObj?.categoryType === "expense"
                ? 0
                : 1
            : 0,
    );
    // Button Click Handler
    const handleButtonClick = () => {
        if (typeOfModal === "Create") {
            handleCreation({
                name: name ?? "",
                selectedColor: selectedColor ?? "",
                selectedIcon: selectedIcon ?? "",
                slider,
                setIsLoading,
                Cancel,
                accessToken: accessToken ?? "",
                GetData,
            });
        } else if (typeOfModal === "Update") {
            handleEdit({
                name: name ?? "",
                selectedColor: selectedColor ?? "",
                selectedIcon: selectedIcon ?? "",
                slider,
                _id: editObj?._id ?? "",
                setIsLoading,
                Cancel,
                accessToken: accessToken ?? "",
                isTypeEditable,
                GetData,
            });
        }
    };

    return (
        <>
            <BaseModal
                Cancel={Cancel}
                typeOfModal={typeOfModal}
                isLoading={isLoading}
                handleUpdate={handleButtonClick}
                title="Category"
                children={
                    <>
                        {/* Category Type Selector */}
                        {isTypeEditable && (
                            <TypeSelector
                                slider={slider}
                                setSlider={setSlider}
                            ></TypeSelector>
                        )}

                        {/* Icon and Account Name */}
                        <div className="flex justify-start items-center gap-2 w-full">
                            <button
                                onClick={() =>
                                    setShowIconModal((prev) => !prev)
                                }
                                className={`w-16 h-16 shrink-0 text-4xl ${colors.filter((e) => e.name === selectedColor)[0].color} rounded-full`}
                            >
                                {selectedIcon}
                            </button>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                className="border-gray-600 p-1 focus:bg-white dark:focus:bg-gray-800 w-full rounded-t-xl border-b-2 focus:border-primary outline-none text-2xl font-bold"
                                placeholder="Category Name"
                            />
                        </div>

                        {/* Color Picker */}

                        <ColorPicker
                            selectedColor={selectedColor ?? ""}
                            setSelectedColor={setSelectedColor}
                        ></ColorPicker>
                        <EmojiPicker
                            showModal={showIconModal}
                            setShowModal={setShowIconModal}
                            setSelectedIcon={setSelectedIcon}
                            selectedIcon={selectedIcon ?? ""}
                        />
                    </>
                }
            ></BaseModal>
        </>
    );
};

export default CategoriesModal;
