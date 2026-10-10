import { useState } from "react";
import DialPad from "@/components/App/Common/DialPad";

import useAuth from "@/hooks/Auth";
import toast from "react-hot-toast";
import { API_Account_Create, API_Account_Update } from "@/api/AccountsAPI";
import ColorPicker from "@/components/App/Common/ColorPicker";
import { ApiError } from "@/types/common";
import BaseModal from "@/components/App/Common/BaseModal";
import HandleErrorMessage from "@/utils/networkError";
import { IAccount } from "@/types/account";

interface CreateInterface extends IAccount {
    _id?: string;
    setIsLoading: (value: boolean) => void;
    accessToken: string;
    GetData: () => void;
    Cancel: () => void;
}

const handleCreation = async ({
    setIsLoading,
    name,
    balance,
    bgColor,
    accessToken,
    GetData,
    Cancel,
}: CreateInterface) => {
    if (!name.trim()) {
        return toast.error("Account name is required");
    }
    setIsLoading(true);
    try {
        const res = await API_Account_Create({
            name: name,
            balance: balance,
            bgColor: bgColor,
            token: accessToken,
        });
        if (res.success) {
            toast.success("Account created successfully!");
            setIsLoading(false);
            GetData();
            Cancel();
            return;
        } else {
            return toast.error(res.error.message);
        }
    } catch (error) {
        setIsLoading(false);
        const err = error as ApiError;
        const res = err?.response?.data;

        if (res) toast.error(res.error.message);
        else HandleErrorMessage(err);
    }
};

const handleUpdate = async ({
    setIsLoading,
    name,
    bgColor,
    _id,
    accessToken,
    GetData,
    Cancel,
}: CreateInterface) => {
    if (!name.trim()) {
        return toast.error("Account name is required");
    }
    setIsLoading(true);
    try {
        const res = await API_Account_Update({
            name: name,
            bgColor: bgColor,
            _id: _id,
            token: accessToken,
        });
        if (res.success) {
            toast.success("Account updated successfully!");
            setIsLoading(false);
            GetData();
            Cancel();
            return;
        } else {
            setIsLoading(false);
            return toast.error(res.error.message);
        }
    } catch (error) {
        setIsLoading(false);
        const err = error as ApiError;
        const res = err?.response?.data;

        if (res) toast.error(res.error.message);
        else HandleErrorMessage(err);
    }
};

const AccountsModal = ({
    typeOfModal,
    Cancel,
    editObj,
    GetData,
}: {
    typeOfModal: "Create" | "Update";
    Cancel: () => void;
    editObj: IAccount;
    GetData: () => void;
}) => {
    // Loading State
    const [isLoading, setIsLoading] = useState(false);

    const { user, accessToken } = useAuth();
    const [showDialPad, setShowDialPad] = useState(false);

    // Form Details
    const [name, setName] = useState(
        typeOfModal === "Update" ? editObj.name : "",
    );
    const [balance, setBalance] = useState(
        typeOfModal === "Update" ? editObj.balance : 0,
    );
    const [selectedColor, setSelectedColor] = useState(
        typeOfModal === "Update" ? editObj.bgColor : "Default",
    );

    const handleButtonClick = () => {
        if (typeOfModal === "Create") {
            handleCreation({
                setIsLoading,
                name,
                balance,
                bgColor: selectedColor,
                accessToken: accessToken ?? "",
                GetData,
                Cancel,
            });
        } else if (typeOfModal === "Update") {
            handleUpdate({
                setIsLoading,
                name,
                _id: editObj._id!,
                bgColor: selectedColor,
                accessToken: accessToken ?? "",
                GetData,
                Cancel,
            });
        }
    };

    return (
        <BaseModal
            Cancel={Cancel}
            typeOfModal={typeOfModal}
            isLoading={isLoading}
            handleUpdate={handleButtonClick}
            title="Account"
            children={
                <>
                    {/* Account Name */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className="border-gray-600 p-1 focus:bg-white dark:focus:bg-gray-800 w-fit field-sizing-content text-center rounded-t-xl border-b-2 focus:border-primary outline-none text-2xl font-bold max-w-full"
                        placeholder="Account Name"
                    />

                    {/* Balance */}
                    {typeOfModal === "Create" && (
                        <div className="w-full font-medium text-lg flex justify-center items-end gap-2">
                            Starting from
                            <button
                                onClick={() =>
                                    typeOfModal === "Create" &&
                                    setShowDialPad((prev) => !prev)
                                }
                                className={`font-bold text-2xl bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-1 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
                            >
                                {user?.currency}
                                {balance?.toLocaleString()}
                            </button>
                        </div>
                    )}

                    {/* Color Picker */}
                    <ColorPicker
                        selectedColor={selectedColor!}
                        setSelectedColor={setSelectedColor}
                    ></ColorPicker>

                    <DialPad
                        text="Balance"
                        input={balance!}
                        showModal={showDialPad}
                        setShowModal={setShowDialPad}
                        setInput={setBalance}
                    ></DialPad>
                </>
            }
        ></BaseModal>
    );
};

export default AccountsModal;
