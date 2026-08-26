import { X, LoaderCircle } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hooks/Auth.jsx";
import useData from "../../../hooks/Data.jsx";
import DatePickerComponent from "../../tailgrids/components/DatePicker.js";
import TimePickerComponent from "../../tailgrids/components/TimePicker.tsx";
import OptionPicker from "./OptionPicker.tsx";
import TypeSelector from "../Common/TypeSelector.tsx";
import DialPad from "../Common/DialPad.tsx";

// const handleCreation = async ({
//     name,
//     slider,
//     setIsLoading,
//     Cancel,
//     accessToken,
//     GetData,
// }) => {
//     if (!name.trim()) {
//         return toast.error("Please enter a category name.");
//     }
//     setIsLoading(true);
//     try {
//         const res = await CreateCategory({
//             name: name,
//             bgColor: selectedColor,
//             categoryType: slider === 0 ? "expense" : "income",
//             icon: selectedIcon,
//             token: accessToken,
//         });
//         if (res.success) {
//             toast.success("Category created successfully!");
//             setIsLoading(false);
//             GetData();
//             Cancel();
//             return;
//         } else {
//             setIsLoading(false);
//             return toast.error(res.error.message);
//         }
//     } catch (error) {
//         setIsLoading(false);
//         if (error.response) {
//             return toast.error(error.response.data.error.message);
//         } else {
//             return toast.error(error.message);
//         }
//     }
// };

// const handleEdit = async ({
//     name,
//     selectedColor,
//     selectedIcon,
//     slider,
//     editObj,
//     setIsLoading,
//     Cancel,
//     accessToken,
//     isTypeEditable,
//     GetData,
// }) => {
//     if (!name.trim()) {
//         return toast.error("Please enter a category name.");
//     }
//     setIsLoading(true);

//     try {
//         const res = await UpdateCategory({
//             name: name,
//             bgColor: selectedColor,
//             categoryType: isTypeEditable
//                 ? slider === 0
//                     ? "expense"
//                     : "income"
//                 : null,
//             icon: selectedIcon,
//             categoryID: editObj.categoryID,
//             token: accessToken,
//         });
//         if (res.success) {
//             toast.success("Category updated successfully!");
//             setIsLoading(false);
//             GetData();
//             Cancel();
//             return;
//         } else {
//             setIsLoading(false);
//             return toast.error(res.error.message);
//         }
//     } catch (error) {
//         setIsLoading(false);
//         if (error.response) {
//             return toast.error(error.response.data.error.message);
//         } else {
//             return toast.error(error.message);
//         }
//     }
// };

// // Delete Modal

// const DeleteFunc = (categoryID) => {
//     setCategoryID(categoryID);
//     openModal();
// };

// const CancelDelete = () => {
//     setCategoryID(null);
//     closeModal();
// };

// const dialogRef = useRef(null);

// const openModal = () => dialogRef.current?.showModal();

// const closeModal = () => dialogRef.current?.close();

// <DeleteModal
//     text={"category"}
//     GetData={GetData}
//     DeleteHandler={DeleteHandler}
//     dialogRef={dialogRef}
//     handleCancel={CancelDelete}
//     objID={categoryID}
// ></DeleteModal>;

// const DeleteHandler = async ({
//     objID,
//     token,
//     CancelDelete,
//     GetData,
//     setIsLoading,
// }) => {
//     setIsLoading(true);
//     try {
//         const res = await DeleteCategory({ categoryID: objID, token });

//         if (res.success) {
//             setIsLoading(false);
//             toast.success("Account Deleted successfully.");
//             GetData();
//             CancelDelete();
//         } else {
//             setIsLoading(false);
//             return toast.error(res.error.message);
//         }
//     } catch (err) {
//         setIsLoading(false);
//         if (err.response) {
//             return toast.error(err.response.data.error.message);
//         } else {
//             return toast.error(err.message);
//         }
//     }
// };

const TransactionsModal = ({
    typeOfModal,
    Cancel,
    editObj = null,
    GetData,
}: {
    typeOfModal?: string;
    Cancel: () => void;
    editObj?: unknown;
    GetData: () => void | string;
}) => {
    // Global Data
    const { categories, transactions, accounts, budgets, goals } = useData();
    const { accessToken } = useAuth();

    // States
    const [isLoading, setIsLoading] = useState(false);

    // Form Details
    const [name, setName] = useState(
        typeOfModal === "Edit" ? editObj.name : "",
    );

    const [slider, setSlider] = useState(
        typeOfModal === "Edit"
            ? editObj?.transactionType === "expense"
                ? 0
                : editObj?.transactionType === "income"
                  ? 1
                  : 2
            : 0,
    );

    const [selectedAccount, setSelectedAccount] = useState<string>(
        accounts?.[0]?._id || "",
    );
    const [selectedAccountTo, setSelectedAccountTo] = useState<string>(
        accounts?.[1]?._id || "",
    );
    const [selectedBudget, setSelectedBudget] = useState<string>(
        budgets?.[0]?._id || "",
    );
    const [selectedGoal, setSelectedGoal] = useState<string>(
        goals?.[0]?._id || "",
    );
    // Button Click Handler
    // const handleButtonClick = () => {
    //     if (typeOfModal === "Add") {
    //         handleCreation({
    //             name,
    //             slider,
    //             setIsLoading,
    //             Cancel,
    //             accessToken,
    //             GetData,
    //         });
    //     } else if (typeOfModal === "Edit") {
    //         handleEdit({
    //             name,

    //             slider,
    //             editObj,
    //             setIsLoading,
    //             Cancel,
    //             accessToken,
    //             isTypeEditable,
    //             GetData,
    //         });
    //     }
    // };

    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState<Date>(new Date());

    const [showDialPad, setShowDialPad] = useState<boolean>(false);
    const [input, setInput] = useState<number>(0);

    const {user} = useAuth()
    return (
        <div className="fixed start:scale-0 start:opacity-0 transition-all opacity-100 scale-100 ease-in-out duration-300 inset-0 z-5 backdrop-blur-sm flex justify-center items-center">
            <div
                className={`flex overflow-auto max-h-9/10 flex-col bg-surface dark:bg-gray-900 justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-6 rounded-5xl w-9/10 md:w-2/3 lg:w-1/2 gap-4`}
            >
                {/* Header */}

                <div className="flex justify-between items-center w-full">
                    <h2 className="px-1 font-bold text-3xl text-primary">
                        {typeOfModal === "Add" ? "Create" : "Edit"} Transaction
                    </h2>
                    <button
                        onClick={Cancel}
                        disabled={isLoading}
                        className="text-secondary-600 disabled:cursor-not-allowed hover:text-red-600 duration-300 ease-in-out"
                    >
                        <X></X>
                    </button>
                </div>

                {/* Main Content */}

                <div className="flex flex-col justify-center items-center w-full gap-2">
                    {/* Category Type Selector */}
                    {!editObj && (
                        <TypeSelector
                            slider={slider}
                            setSlider={setSlider}
                            show4={accounts?.length > 1 ? true : false}
                        ></TypeSelector>
                    )}

                    {/* Icon and Account Name */}
                    <div className="flex justify-between items-center w-full bg-app dark:bg-gray-800 rounded-4xl overflow-hidden cursor-pointer">
                        {slider < 2 && (
                            <div
                                className={`w-30 h-30 shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700 text-4xl flex justify-center items-center cursor-pointer `}
                            >
                                <button className="cursor-pointer bg-white h-25 w-25 rounded-full"></button>
                            </div>
                        )}
                        <button
                            onClick={() => setShowDialPad((prev) => !prev)}
                            className=" cursor-pointer w-full h-30 hover:bg-gray-200 flex flex-col justify-center items-end p-10 dark:hover:bg-gray-700"
                        >
                            {slider > 1 && (
                                <h3 className="w-full text-start text-2xl font-bold">
                                    Transfer Balance:
                                </h3>
                            )}
                            <div className="text-3xl font-bold">{user?.defaultCurrency?.symbol}{input}</div>
                            <p className=""></p>
                        </button>
                    </div>

                    {/* Date and Time */}

                    <div className="flex justify-center items-center w-full bg-app dark:bg-gray-800 p-2 rounded-3xl ms:rounded-4xl flex-col ms:flex-row gap-2">
                        <DatePickerComponent
                            dt={date}
                            setDT={setDate}
                        ></DatePickerComponent>
                        <TimePickerComponent
                            time={time}
                            setTime={setTime}
                        ></TimePickerComponent>
                    </div>

                    {/* Account, Budget and Goal */}

                    <OptionPicker
                        slider={slider}
                        selectedAccount={selectedAccount}
                        setSelectedAccount={setSelectedAccount}
                        selectedAccountTo={selectedAccountTo}
                        setSelectedAccountTo={setSelectedAccountTo}
                        selectedBudget={selectedBudget}
                        setSelectedBudget={setSelectedBudget}
                        selectedGoal={selectedGoal}
                        setSelectedGoal={setSelectedGoal}
                    ></OptionPicker>
                    <DialPad
                        input={input}
                        setInput={setInput}
                        showModal={showDialPad}
                        setShowModal={setShowDialPad}
                    ></DialPad>
                    {/* Title and Notes */}
                    <input
                        type="text"
                        placeholder="Title"
                        className="bg-app dark:bg-gray-800 w-full p-2 px-6 rounded-full outline-2 focus:outline-primary outline-transparent"
                    />
                    <textarea
                        placeholder="Notes"
                        className="bg-app  dark:bg-gray-800 w-full p-2 px-6 rounded-3xl outline-2 focus:outline-primary outline-transparent"
                    ></textarea>
                </div>

                {/* Buttons */}

                <div className="flex justify-end items-center w-full gap-2">
                    <button
                        onClick={Cancel}
                        disabled={isLoading}
                        className="px-4 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-2 rounded-full bg-app dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 duration-300 ease-in-out"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isLoading}
                        // onClick={handleButtonClick}
                        className="px-4 gap-2 flex disabled:active:scale-100 disabled:cursor-not-allowed disabled:bg-primary/70 cursor-pointer active:scale-95 py-2 rounded-full bg-primary hover:bg-primary-hover text-white hover:bg-primary-800 duration-300 ease-in-out"
                    >
                        {isLoading && (
                            <LoaderCircle className="animate-spin"></LoaderCircle>
                        )}
                        {typeOfModal === "Add" ? "Create" : "Update"} Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionsModal;
