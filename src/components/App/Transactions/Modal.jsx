import { X, LoaderCircle } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hooks/Auth.jsx";
import toast from "react-hot-toast";
import { CreateCategory, UpdateCategory } from "../../../api/CategoryAPI.js";
import useData from "../../../hooks/Data.jsx";
import DatePickerComponent from "../../tailgrids/components/DatePicker.jsx";
import TimePickerComponent from "../../tailgrids/components/TimePicker.jsx";
// import {
//     DateInput,
//     DateSegment,
//     Dialog,
//     Calendar,
//     CalendarCell,
//     CalendarGrid,
//     Heading,
//     Text, // Import Text for the header
// } from "react-aria-components";
// import {
//     DatePicker,
//     DatePickerGroup,
//     DatePickerTrigger,
//     DatePickerPopover,
// } from "../../tailgrids/core/date-picker.js";

const handleCreation = async ({
    name,
    selectedColor,
    selectedIcon,
    slider,
    setIsLoading,
    Cancel,
    accessToken,
    GetData,
}) => {
    if (!name.trim()) {
        return toast.error("Please enter a category name.");
    }
    setIsLoading(true);
    try {
        const res = await CreateCategory({
            name: name,
            bgColor: selectedColor,
            categoryType: slider === 0 ? "expense" : "income",
            icon: selectedIcon,
            token: accessToken,
        });
        if (res.success) {
            toast.success("Category created successfully!");
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
        if (error.response) {
            return toast.error(error.response.data.error.message);
        } else {
            return toast.error(error.message);
        }
    }
};

const handleEdit = async ({
    name,
    selectedColor,
    selectedIcon,
    slider,
    editObj,
    setIsLoading,
    Cancel,
    accessToken,
    isTypeEditable,
    GetData,
}) => {
    if (!name.trim()) {
        return toast.error("Please enter a category name.");
    }
    setIsLoading(true);

    try {
        const res = await UpdateCategory({
            name: name,
            bgColor: selectedColor,
            categoryType: isTypeEditable
                ? slider === 0
                    ? "expense"
                    : "income"
                : null,
            icon: selectedIcon,
            categoryID: editObj.categoryID,
            token: accessToken,
        });
        if (res.success) {
            toast.success("Category updated successfully!");
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
        if (error.response) {
            return toast.error(error.response.data.error.message);
        } else {
            return toast.error(error.message);
        }
    }
};

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
}) => {
    // Global Data
    const { categories, transactions, accounts, budgets, goals, colors } =
        useData();
    const { accessToken } = useAuth();

    // States
    const [isLoading, setIsLoading] = useState(false);

    // Checks if any transactions are linked to the category being edited. If there are, the category type cannot be changed.If not then check type of Modal if it is an edit modal dont allow to edit.
    const isTypeEditable =
        transactions.filter((e) => e.category === editObj?._id).length === 0
            ? true
            : typeOfModal === "Add"
              ? true
              : false;

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

    const [selectedAccount, setSelectedAccount] = useState(
        accounts?.[0]?._id || "",
    );
    const [selectedBudget, setSelectedBudget] = useState(
        budgets?.[0]?._id || "",
    );
    const [selectedGoal, setSelectedGoal] = useState(goals?.[0]?._id || "");
    // Button Click Handler
    const handleButtonClick = () => {
        if (typeOfModal === "Add") {
            handleCreation({
                name,

                slider,
                setIsLoading,
                Cancel,
                accessToken,
                GetData,
            });
        } else if (typeOfModal === "Edit") {
            handleEdit({
                name,

                slider,
                editObj,
                setIsLoading,
                Cancel,
                accessToken,
                isTypeEditable,
                GetData,
            });
        }
    };

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

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
                    {isTypeEditable && (
                        <div className="flex justify-center items-center w-full">
                            <div
                                className={`flex duration-300 ease-in-out bg-gray-100 dark:bg-gray-800 justify-center items-center rounded-full relative`}
                            >
                                <div
                                    className={`absolute shadow-medium top-0 left-0 w-1/3 h-full rounded-full bg-surface dark:bg-gray-700 duration-300 ease-in-out`}
                                    style={{
                                        transform: `translateX(${slider * 100}%)`,
                                    }}
                                ></div>
                                <div
                                    onClick={() => {
                                        setSlider(0);
                                    }}
                                    className={`w-1/3 p-3 px-4 z-3 flex justify-center items-center shrink-0 rounded-full text-red-500 cursor-pointer duration-300 ease-in-out ${slider === 0 && "font-semibold"}`}
                                >
                                    Expense
                                </div>
                                <div
                                    onClick={() => {
                                        setSlider(1);
                                    }}
                                    className={`w-1/3 p-3 px-4 z-3 flex justify-center items-center shrink-0 rounded-full text-primary cursor-pointer duration-300 ease-in-out ${slider === 1 && "font-semibold"}`}
                                >
                                    Income
                                </div>
                                <div
                                    onClick={() => {
                                        setSlider(2);
                                    }}
                                    className={`w-1/3 p-3 px-4 z-3 flex justify-center items-center shrink-0 rounded-full text-blue-500 cursor-pointer duration-300 ease-in-out ${slider === 2 && "font-semibold"}`}
                                >
                                    Transfer
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Icon and Account Name */}
                    <div className="flex justify-between items-center w-full bg-app dark:bg-gray-800 rounded-4xl overflow-hidden">
                        <div
                            className={`w-30 h-30 shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700 text-4xl flex justify-center items-center`}
                        >
                            <button className="bg-white h-25 w-25 rounded-full"></button>
                        </div>
                        <button className="w-full h-30 hover:bg-gray-200 flex flex-col justify-center items-end p-10 dark:hover:bg-gray-700">
                            <div className="text-3xl font-bold">$0</div>
                            <p className=""></p>
                        </button>
                    </div>

                    {/* Date and Time */}

                    <div className="flex justify-center items-center w-full bg-app dark:bg-gray-800 p-2 rounded-3xl ms:rounded-4xl flex-col [@media(min-width: 440px)]:flex-row gap-2">
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
                    <div className="flex flex-col w-full p-5 items-start justify-start bg-app dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl gap-3 overflow-hidden">
                        {/* Account Row */}
                        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden">
                            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                                {slider == 2 ? "From Account" : "Account"}:
                            </h4>
                            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                {accounts?.map((acc) => (
                                    <label
                                        key={acc?._id}
                                        className="relative cursor-pointer flex shrink-0 p-1"
                                    >
                                        <input
                                            type="radio"
                                            name="account"
                                            className="hidden peer"
                                            value={acc?._id}
                                            checked={
                                                selectedAccount === acc?._id
                                            }
                                            onChange={() =>
                                                setSelectedAccount(acc._id)
                                            }
                                        />
                                        <span
                                            className={`${colors.find((e) => e.name === acc?.bgColor)?.color || "bg-gray-200"} ${
                                                acc?.bgColor === "White"
                                                    ? "text-black"
                                                    : "text-white"
                                            } text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            {acc?.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Budget Row */}
                        {budgets?.length > 0 && !selectedGoal && (
                            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden border-t border-gray-100 dark:border-gray-700/50 pt-3">
                                <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 shrink-0 min-w-25">
                                    Budget:
                                </h4>
                                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="budget"
                                            className="hidden peer"
                                            value=""
                                            checked={selectedBudget === ""}
                                            onChange={() =>
                                                setSelectedBudget("")
                                            }
                                        />
                                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-black dark:peer-checked:ring-white">
                                            No Budget
                                        </span>
                                    </label>
                                    {accounts?.map((bud) => (
                                        <label
                                            key={bud?._id}
                                            className="relative cursor-pointer flex shrink-0 p-1"
                                        >
                                            <input
                                                type="radio"
                                                name="budget"
                                                className="hidden peer"
                                                value={bud._id}
                                                checked={
                                                    selectedBudget === bud?._id
                                                }
                                                onChange={() =>
                                                    setSelectedBudget(bud._id)
                                                }
                                            />
                                            <span
                                                className={`${colors.find((e) => e.name === bud?.bgColor)?.color || "bg-gray-200"} ${
                                                    bud?.bgColor === "White"
                                                        ? "text-black"
                                                        : "text-white"
                                                } text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-black dark:peer-checked:ring-white`}
                                            >
                                                {bud?.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Goal Row */}
                        {goals?.length >0  && !selectedBudget && (
                            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden border-t border-gray-100 dark:border-gray-700/50 pt-3">
                                <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 shrink-0 min-w-25">
                                    Goal:
                                </h4>
                                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="goal"
                                            className="hidden peer"
                                            value=""
                                            checked={selectedGoal === ""}
                                            onChange={() => setSelectedGoal("")}
                                        />
                                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-black dark:peer-checked:ring-white">
                                            No Goal
                                        </span>
                                    </label>
                                    {accounts?.map((go) => (
                                        <label
                                            key={go?._id}
                                            className="relative cursor-pointer flex shrink-0 p-1"
                                        >
                                            <input
                                                type="radio"
                                                name="goal"
                                                className="hidden peer"
                                                value={go._id}
                                                checked={
                                                    selectedGoal === go?._id
                                                }
                                                onChange={() =>
                                                    setSelectedGoal(go._id)
                                                }
                                            />
                                            <span
                                                className={`${colors.find((e) => e.name === go?.bgColor)?.color || "bg-gray-200"} ${
                                                    go?.bgColor === "White"
                                                        ? "text-black"
                                                        : "text-white"
                                                } text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-black dark:peer-checked:ring-white`}
                                            >
                                                {go?.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
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
                        onClick={handleButtonClick}
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
