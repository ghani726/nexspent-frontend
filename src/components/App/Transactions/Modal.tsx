import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "@/hooks/Auth.jsx";
import useData from "@/hooks/Data.jsx";
import DatePickerComponent from "@/components/tailgrids/components/DatePicker";
import TimePickerComponent from "@/components/tailgrids/components/TimePicker";
import OptionPicker from "./OptionPicker";
import TypeSelector from "../Common/TypeSelector";
import DialPad from "@/components/App/Common/DialPad";
import CategoryPicker from "./CategoryPicker";
import {
    CreateTransaction,
    DeleteTransaction,
    UpdateTransaction,
} from "@/api/TransactionsAPI";

import type { ICategory } from "@/types/category";
import type { ApiError, IColor, IDeleteHandlerProps } from "@/types/common";
import type { ITransaction } from "@/types/transaction";
import colors from "@/utils/color";
import useBack from "@/hooks/useBack";
import DeleteModal from "@/components/App/Common/DeleteModal";
import BaseModal from "@/components/App/Common/BaseModal";

// #region => Interfaces

// #endregion
interface CreateOrEdit extends ITransaction {
    token: string;
    setIsLoading: (value: boolean) => void;
    Cancel: () => void;
    GetData: () => void | string;
}
// #region => API Handlers
const handleCreation = async ({
    title,
    description,
    type,
    amount,
    date = new Date().toISOString(),
    account,
    category,
    budget,
    goal,
    fromAccount,
    toAccount,
    token,
    setIsLoading,
    Cancel,
    GetData,
}: CreateOrEdit) => {
    setIsLoading(true);

    try {
        const res = await CreateTransaction({
            title: title ?? "",
            description: description,
            type: type,
            amount: amount,
            date: date,
            account: account,
            category: category,
            budget: budget,
            goal: goal,
            fromAccount: fromAccount,
            toAccount: toAccount,
            token: token,
        });
        if (res.success) {
            toast.success("Transaction added successfully!");
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
            return toast.error(error?.response?.data?.error?.message);
        } else {
            return toast.error(error.message);
        }
    }
};
const handleUpdate = async ({
    _id,
    title,
    description,
    type,
    amount,
    date = new Date().toISOString(),
    account,
    category,
    budget,
    goal,
    fromAccount,
    toAccount,
    token,
    setIsLoading,
    Cancel,
    GetData,
}: CreateOrEdit) => {
    setIsLoading(true);
    try {
        const res = await UpdateTransaction({
            _id: _id ?? "",
            title: title ?? "",
            description: description,
            type: type,
            amount: amount,
            date: date,
            account: account,
            category: category,
            budget: budget,
            goal: goal,
            fromAccount: fromAccount,
            toAccount: toAccount,
            token: token,
        });
        if (res.success) {
            toast.success("Transaction updated successfully!");
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
            return toast.error(error?.response?.data?.error?.message);
        } else {
            return toast.error(error.message);
        }
    }
};
const handleDelete = async ({
    _id,
    token,
    setIsLoading,
    Cancel,
    GetData,
}: IDeleteHandlerProps) => {
    setIsLoading(true);
    try {
        const res = await DeleteTransaction({
            _id: _id ?? "",
            token: token,
        });
        if (res.success) {
            toast.success("Transaction deleted successfully!");
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
            return toast.error(error?.response?.data?.error?.message);
        } else {
            return toast.error(error.message);
        }
    }
};

const TransactionsModal = ({
    typeOfModal,
    showModal,
    Cancel,
    editObj,
    GetData,
}: {
    typeOfModal: "Add" | "Edit";
    showModal: boolean;
    Cancel: () => void;
    editObj?: ITransaction;
    GetData: () => void | string;
}) => {
    // Global Data
    const { categories, accounts, budgets, goals } = useData();
    const { accessToken, user } = useAuth();

    // States
    const [isLoading, setIsLoading] = useState(false);

    const [showDialPad, setShowDialPad] = useState<boolean>(false);
    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
    const [disabledOnes, setDisabledOnes] = useState<object>({
        b: false,
        c: false,
    });

    // Category and Color UI
    const [cat, setCat] = useState<null | ICategory>(
        categories.filter((e: ICategory) => e._id === editObj?.category)[0],
    );

    const color = colors.filter((e: IColor) => e.name === cat?.bgColor)[0]
        ?.color;

    // #region => Form Details
    const [title, setTitle] = useState(
        typeOfModal === "Edit" ? editObj?.title : "",
    );
    const [description, setDescription] = useState(
        typeOfModal === "Edit" ? editObj?.description : "",
    );

    const [slider, setSlider] = useState(
        editObj?.type === "expense" ? 0 : editObj?.type === "income" ? 1 : 2,
    );

    const [input, setInput] = useState<number>(editObj?.amount || 0);

    const [date, setDate] = useState<Date>(
        new Date(editObj?.date || new Date()),
    );
    const [time, setTime] = useState<Date>(
        new Date(editObj?.date || new Date()),
    );

    const [selectedCategory, setSelectedCategory] = useState<string>(
        editObj?.category || "",
    );
    const [selectedAccount, setSelectedAccount] = useState<string>(
        editObj?.account || accounts?.[0]?._id || "",
    );
    const [selectedAccountTo, setSelectedAccountTo] = useState<string>(
        editObj?.toAccount || accounts?.[1]?._id || "",
    );
    const [selectedBudget, setSelectedBudget] = useState<string>(
        editObj?.budget || budgets?.[0]?._id || "",
    );
    const [selectedGoal, setSelectedGoal] = useState<string>(
        editObj?.goal || goals?.[0]?._id || "",
    );

    // #endregion

    // Button Click Handler
    const handleButtonClick = (): void | string => {
        // Validation
        if (!input || input === 0) {
            return toast.error("Ammount must be greater than 0.");
        }

        if (!date) {
            return toast.error("Please select a valid date.");
        }

        if (slider === 0 || slider === 1) {
            if (!selectedAccount?.trim() || !selectedCategory?.trim()) {
                return toast.error(
                    "Account and Category are required in 'Expense' and 'Income' transactions.",
                );
            }

            if (!slider && selectedBudget.trim() && selectedGoal.trim()) {
                return toast.error("Select either budget or goal.");
            }
        } else if (slider > 1) {
            if (!selectedAccount?.trim() || !selectedAccountTo.trim()) {
                throw new Error(
                    "'FromAccount' and 'ToAccount' are required in 'Transfer' transactions.",
                );
            }
        }

        const finalDate = new Date(date);
        finalDate.setHours(time.getHours(), time.getMinutes(), 0);

        if (typeOfModal === "Add") {
            handleCreation({
                title: title ?? "",
                description,
                type: !slider
                    ? "expense"
                    : slider === 1
                      ? "income"
                      : "transfer",
                amount: input,
                date: finalDate.toISOString(),
                account: selectedAccount,
                category: selectedCategory ?? "",
                budget: selectedBudget,
                goal: selectedGoal,
                fromAccount: selectedAccount,
                toAccount: selectedAccountTo,
                token: accessToken ?? "",
                setIsLoading,
                Cancel,
                GetData,
            });
        } else if (typeOfModal === "Edit") {
            handleUpdate({
                _id: editObj?._id,
                title: title ?? "",
                description,
                type: !slider
                    ? "expense"
                    : slider === 1
                      ? "income"
                      : "transfer",
                amount: input,
                date: finalDate.toISOString(),
                account: selectedAccount,
                category: selectedCategory ?? "",
                budget: selectedBudget,
                goal: selectedGoal,
                fromAccount: selectedAccount,
                toAccount: selectedAccountTo,
                token: accessToken ?? "",
                setIsLoading,
                Cancel,
                GetData,
            });
            return;
        }
    };

    useBack({
        isOpen: showModal,
        close: Cancel,
        name: "MainTransactionsModal",
    });

    // Delete Modal
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => dialogRef.current?.showModal();

    const closeModal = () => dialogRef.current?.close();

    return (
        <BaseModal
            Cancel={Cancel}
            showDelete={true}
            openModal={openModal}
            typeOfModal={typeOfModal}
            isLoading={isLoading}
            handleButtonClick={handleButtonClick}
            text="Transaction"
            children={
                <>
                    {/* Category Type Selector */}
                    {typeOfModal === "Add" && (
                        <TypeSelector
                            slider={slider}
                            setSlider={setSlider}
                            show4={accounts?.length > 1 ? true : false}
                            disabledOnes={disabledOnes}
                            extraFunc={(val) => {
                                if (val && val >= 2) {
                                    setDisabledOnes({ b: false, c: false });
                                    setSelectedCategory("");
                                    setCat(null);
                                }
                            }}
                        ></TypeSelector>
                    )}

                    {/* Icon and Account Name */}
                    <div
                        className={`flex justify-between items-center w-full bg-white dark:bg-gray-800 rounded-4xl overflow-hidden cursor-pointer shadow-sm shrink-0`}
                    >
                        {slider < 2 && (
                            <div
                                className={`w-30 h-30 shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700 text-4xl flex justify-center items-center cursor-pointer `}
                            >
                                <button
                                    onClick={() => setShowCategoryModal(true)}
                                    className={`cursor-pointer ${color || "bg-app"} h-25 w-25 rounded-full text-5xl`}
                                >
                                    {cat?.icon}
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => setShowDialPad((prev) => !prev)}
                            className="cursor-pointer w-full h-30 focus-visible:border-2 hover:bg-gray-200 flex flex-col justify-center items-end p-10 dark:hover:bg-gray-700"
                        >
                            {slider > 1 && (
                                <h3 className="w-full text-start text-2xl font-bold">
                                    Transfer Balance:
                                </h3>
                            )}
                            <div className="text-3xl font-bold max-w-full line-clamp-1 wrap-anywhere min-h-lh">
                                {user?.defaultCurrency?.symbol}
                                {input}
                            </div>
                            <p>{cat?.name}</p>
                        </button>
                    </div>

                    {/* Date and Time */}

                    <div className="flex justify-center items-center w-full bg-white dark:bg-gray-800 p-2 rounded-3xl media-400:rounded-4xl flex-col media-400:flex-row gap-2 shadow-sm">
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
                    <CategoryPicker
                        showModal={showCategoryModal}
                        setShowModal={setShowCategoryModal}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        slider={slider}
                        setSlider={setSlider}
                        setDisabledOnes={setDisabledOnes}
                        setCat={setCat}
                        isEdit={typeOfModal === "Edit" ? true : false}
                    ></CategoryPicker>
                    {/* Title and Notes */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-white shrink-0 shadow-sm dark:bg-gray-800 w-full p-2 px-6 rounded-full outline-2 focus:outline-primary outline-transparent"
                    />
                    <textarea
                        placeholder="Notes"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-white shrink-0 shadow-sm field-sizing-content max-h-[10lh] dark:bg-gray-800 w-full p-2 px-6 rounded-3xl outline-2 focus:outline-primary outline-transparent"
                    ></textarea>

                    <DeleteModal
                        text="transaction"
                        GetData={GetData}
                        DeleteHandler={handleDelete}
                        dialogRef={dialogRef}
                        handleCancel={closeModal}
                        _id={editObj?._id ?? ""}
                    ></DeleteModal>
                </>
            }
        ></BaseModal>
    );
};

export default TransactionsModal;
