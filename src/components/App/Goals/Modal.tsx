import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { AddAccount, EditAccount } from "@/api/AccountsAPI";
import useAuth from "@/hooks/Auth";
import useData from "@/hooks/Data";
import DialPad from "@/components/App/Common/DialPad";
import ColorPicker from "@/components/App/Common/ColorPicker";
import EmojiPicker from "@/components/App/Common/EmojiPicker";
import BaseModal from "@/components/App/Common/BaseModal";
import { ApiError } from "@/types/common";
import colors from "@/utils/color";

// const handleCreation = async ({
//     setName,
//     setIsLoading,
//     Cancel,
//     amount,
//     selectedColor,
//     accessToken,
// }) => {
//     setIsLoading(true);
//     try {
//         const res = await AddAccount({
//             name: name,
//             amount: amount,
//             bgColor: selectedColor,
//             token: accessToken,
//         });
//         if (res.success) {
//             toast.success("Account added successfully!");
//             setIsLoading(false);
//             // setShowModal(false);
//             Cancel();
//             return;
//         } else {
//             return toast.error(res.error.message);
//         }
//     } catch (err) {
//         const error = err as ApiError
//         setIsLoading(false);
//         if (error?.response?.data?.error?.message) {
//             return toast.error(error?.response?.data?.error?.message);
//         } else {
//             return toast.error(error.message);
//         }
//     }
// };

// const handleEdit = async ({
//     setName,
//     setIsLoading,
//     Cancel,
//     accessToken,
//     editObj,
//     selectedColor,
// }) => {
    
//     setIsLoading(true);
//     try {
//         const res = await EditAccount({
//             name: name,

//             bgColor: selectedColor,

//             accountID: editObj.accountID,
//             token: accessToken,
//         });
//         if (res.success) {
//             toast.success("Account updated successfully!");
//             setIsLoading(false);
//             // setShowModal(false);
//             Cancel();
//             return;
//         } else {
//             return toast.error(res.error.message);
//         }
//     } catch (err) {
//         const error = err as ApiError;
//         setIsLoading(false);
//         if (error?.response?.data?.error?.message) {
//             return toast.error(error?.response?.data?.error?.message);
//         } else {
//             return toast.error(error.message);
//         }
//     }
// };

const AccountsModal = ({ typeOfModal, Cancel, editObj, GetData }: {
    typeOfModal: "Add"| "Edit"
    Cancel: ()=> void
    GetData: ()=> void
    editObj: unknown
}) => {
    // End Date Ref
    const endDateRef = useRef(null);

    // Format current date to YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    // States
    const [isLoading, setIsLoading] = useState(false);
    const [showDialPad, setShowDialPad] = useState(false);
    const [showIconModal, setShowIconModal] = useState(false);

    // Global Data
    const { user, accessToken } = useAuth();

    // Form Details
    const [name, setName] = useState(
        typeOfModal === "Edit" ? editObj.name : "",
    );
    const [amount, setAmount] = useState(
        typeOfModal === "Edit" ? editObj.amount : 0,
    );
    const [selectedColor, setSelectedColor] = useState(
        typeOfModal === "Edit" ? editObj.bgColor : "Secondary",
    );
    const [selectedIcon, setSelectedIcon] = useState(
        typeOfModal === "Edit" ? editObj.icon : "🖼",
    );
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState("");

    // Button Click Handler
    const handleButtonClick = () => {
        // if (typeOfModal === "Add") {
        //     handleCreation({
        //         setName,
        //         setIsLoading,
        //         Cancel,
        //         amount,
        //         selectedColor,
        //         accessToken,
        //     });
        // } else if (typeOfModal === "Edit") {
        //     handleEdit({
        //         setName,
        //         setIsLoading,
        //         Cancel,
        //         accessToken,
        //         editObj,
        //         selectedColor,
        //     });
        // }
    };

    useEffect(() => {
        if (startDate > endDate && endDate !== "") {
            toast.error("End date cannot be before start date");
            setEndDate(""); //eslint-disable-line
        }
    }, [startDate, endDate]);

    return (
        <BaseModal
            Cancel={Cancel}
            typeOfModal={typeOfModal}
            isLoading={isLoading}
            handleButtonClick={handleButtonClick}
            text="Goal"
            children={
                <>
                    {/* Icon and Account Name */}
                    <div className="flex justify-start items-center gap-2 w-full">
                        <button
                            onClick={() => setShowIconModal((prev) => !prev)}
                            className={`w-16 h-16 shrink-0 text-4xl ${colors.filter((e) => e.name === selectedColor)[0].color} rounded-full`}
                        >
                            {selectedIcon}
                        </button>
                        <input
                            type="text"
                            onClick={() => setShowDialPad(false)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && e.preventDefault()
                            }
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className="border-transparent p-1 focus:bg-app dark:focus:bg-gray-800 w-full rounded-t-xl border-b-2 focus:border-primary outline-none text-2xl font-bold"
                            placeholder="Account Name"
                        />
                    </div>

                    {/* Amount */}
                    <div className="w-full font-medium text-lg flex justify-center items-end gap-2">
                        Target to save
                        <button
                            onClick={() => {
                                if (typeOfModal === "Add")
                                    setShowDialPad((prev) => !prev);
                            }}
                            className={`font-bold text-2xl bg-gray-200 dark:bg-gray-800 p-1 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
                        >
                            {user?.defaultCurrency?.symbol}
                            {amount.toLocaleString()}
                        </button>
                    </div>

                    {/* Date Picker */}

                    <div
                        className={`w-full font-medium text-lg flex flex-col justify-center items-center gap-2`}
                    >
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className={`font-bold text-2xl bg-gray-200 dark:bg-gray-800 p-1 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
                        />
                        <div className="relative inline-flex items-center justify-center font-bold text-2xl bg-gray-200 dark:bg-gray-800 p-2 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out">
                            {!endDate ? (
                                <>
                                    {/* Label displayed when no date is selected */}
                                    <span className="text-gray-500 pointer-events-none select-none">
                                        Until Forever
                                    </span>

                                    {/* Invisible date input covering 100% of the pill area */}
                                    <input
                                        ref={endDateRef}
                                        type="date"
                                        value={endDate}
                                        onChange={(e) =>
                                            setEndDate(e.target.value)
                                        }
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                                    />
                                </>
                            ) : (
                                /* Standard visible date input when a date is selected */
                                <input
                                    ref={endDateRef}
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="font-bold text-2xl bg-transparent cursor-pointer focus:outline-none"
                                />
                            )}
                        </div>
                    </div>

                    {/* Color Picker */}

                    <ColorPicker
                        heading="Color"
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                    ></ColorPicker>
                    <DialPad
                        dP={user?.defaultDecimalPrecision}
                        text="Balance"
                        input={amount}
                        showModal={showDialPad}
                        setShowModal={setShowDialPad}
                        setInput={setAmount}
                        currencySymbol={user?.defaultCurrency?.symbol}
                    ></DialPad>
                    <EmojiPicker
                        showModal={showIconModal}
                        setShowModal={setShowIconModal}
                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                    />
                </>
            }
        ></BaseModal>
    );
};

export default AccountsModal;
