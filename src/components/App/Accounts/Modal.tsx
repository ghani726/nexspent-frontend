import { Minus, Plus } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import DialPad from "../Common/DialPad";
import SearchBar from "../Common/SearchBar";
import CurrencyCard from "./CurrencyCard";

import useAuth from "@/hooks/Auth";
import toast from "react-hot-toast";
import { AddAccount, EditAccount } from "@/api/AccountsAPI";
import ColorPicker from "../Common/ColorPicker";
import currencies, { baseCurrency } from "@/utils/currencies";
import { ApiError, IAccount, ICurrency } from "@/types/common";
import BaseModal from "@/components/App/Common/BaseModal";
import useBack from "@/hooks/useBack";

interface CreateInterface extends Omit<IAccount, "_id"> {
    _id?: string;
    setIsLoading: (value: boolean) => void;
    accessToken: string;
    GetData: () => void;
    Cancel: () => void;
}

interface Update extends Omit<CreateInterface, "balance"> {
    accountID: string;
}
const handleCreation = async ({
    setIsLoading,
    name,
    balance,
    decimalPrecision,
    bgColor,
    currency,
    accessToken,
    GetData,
    Cancel,
}: CreateInterface) => {
    if (!name.trim()) {
        return toast.error("Account name is required");
    }
    setIsLoading(true);
    try {
        const res = await AddAccount({
            name: name,
            balance: balance,
            decimalPrecision: decimalPrecision,
            bgColor: bgColor,
            currency: currency,
            token: accessToken,
        });
        if (res.success) {
            toast.success("Account added successfully!");
            setIsLoading(false);
            GetData();
            Cancel();
            return;
        } else {
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

const handleEdit = async ({
    setIsLoading,
    name,
    decimalPrecision,
    bgColor,
    accountID,
    currency,
    accessToken,
    GetData,
    Cancel,
}: Update) => {
    if (!name.trim()) {
        return toast.error("Account name is required");
    }
    setIsLoading(true);
    try {
        const res = await EditAccount({
            name: name,
            decimalPrecision: decimalPrecision,
            bgColor: bgColor,
            currency: currency,
            accountID: accountID,
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

const AccountsModal = ({
    showModal,
    typeOfModal,
    Cancel,
    editObj,
    GetData,
}: {
    showModal: boolean
    typeOfModal: "Add" | "Edit";
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
        typeOfModal === "Edit" ? editObj.name : "",
    );
    const [balance, setBalance] = useState(
        typeOfModal === "Edit" ? editObj.balance : 0,
    );
    const [dP, setDP] = useState(
        typeOfModal === "Edit" ? editObj?.decimalPrecision || 0 : 0,
    );
    const [selectedColor, setSelectedColor] = useState(
        typeOfModal === "Edit" ? editObj.bgColor : "Default",
    );
    const [selectedCurrency, setSelectedCurrency] = useState<ICurrency>(
        (typeOfModal === "Edit" ? editObj.currency : user?.defaultCurrency) ??
            baseCurrency,
    );

    //   By Default select user's default currency

    useEffect(() => {
        setSelectedCurrency(user?.defaultCurrency ?? baseCurrency); //eslint-disable-line

        if (user?.defaultCurrency) {
            const indexOfCurrency = currencies.findIndex(
                (e) => e.code === user?.defaultCurrency.code,
            );

            // Remove it from there and store it.
            const removedCurrency = currencies.splice(indexOfCurrency, 1);

            // Add it to the start
            currencies.unshift(removedCurrency[0]);
        }
    }, [user]);

    const [searchValue, setSearchValue] = useState("");

    const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
        const currency = JSON.parse(event?.target?.value);
        setSelectedCurrency(currency);

        // Find Currency in the array.
        const indexOfCurrency = currencies.findIndex(
            (e) => e.code === currency.code,
        );

        // Remove it from there and store it.
        const removedCurrency = currencies.splice(indexOfCurrency, 1);

        // Add it to the start
        currencies.unshift(removedCurrency[0]);
    };

    const handleButtonClick = () => {
        if (typeOfModal === "Add") {
            handleCreation({
                setIsLoading,
                name,
                balance,
                decimalPrecision: dP,
                bgColor: selectedColor,
                currency: selectedCurrency,
                accessToken: accessToken ?? "",
                GetData,
                Cancel,
            });
        } else if (typeOfModal === "Edit") {
            handleEdit({
                setIsLoading,
                name,
                accountID: editObj._id,
                decimalPrecision: dP,
                bgColor: selectedColor,
                currency: selectedCurrency,
                accessToken: accessToken ?? "",
                GetData,
                Cancel,
            });
        }
    };

    const showCurrencyCards = () => {
        // 1. Filter currencies if search value exists
        let filteredCurrencies;

        if (searchValue?.trim().length > 0) {
            filteredCurrencies = currencies.filter(
                (e) =>
                    e?.code
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    e?.country
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()),
            );
        } else {
            filteredCurrencies = currencies;
        }

        // 2. Return the mapped JSX array directly
        return filteredCurrencies.map((e) => (
            <CurrencyCard
                key={e.code}
                e={e}
                selectedCurrency={selectedCurrency}
                handleCurrencyChange={handleCurrencyChange}
            />
        ));
    };

    useBack({
        isOpen: showModal,
        close: Cancel,
        name: "MainTransactionsModal",
    });

    return (
        <BaseModal
            Cancel={Cancel}
            typeOfModal={typeOfModal}
            isLoading={isLoading}
            handleButtonClick={handleButtonClick}
            isAdd={true}
            text="Account"
            children={
                <>
                    {/* Account Name */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className="border-transparent p-1 focus:bg-app dark:focus:bg-gray-800 w-fit field-sizing-content text-center rounded-t-xl border-b-2 focus:border-primary outline-none text-2xl font-bold max-w-full"
                        placeholder="Account Name"
                    />

                    {/* Balance */}
                    <div className="w-full font-medium text-lg flex justify-center items-end gap-2">
                        {typeOfModal === "Edit"
                            ? "Current Balance"
                            : "Starting from"}
                        <button
                            onClick={() =>
                                typeOfModal === "Add" &&
                                setShowDialPad((prev) => !prev)
                            }
                            className={`font-bold text-2xl bg-gray-200 dark:bg-gray-800 p-1 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
                        >
                            {selectedCurrency?.symbol}
                            {balance.toLocaleString("en-US", {
                                minimumFractionDigits: dP,
                                maximumFractionDigits: dP,
                            })}
                        </button>
                    </div>

                    {/* Decimal Precision */}
                    <div className="w-full font-medium text-xl flex justify-center items-center gap-2">
                        <h3 className="text-xl font-bold">
                            Decimal Precision:
                        </h3>
                        <div className="flex justify-center items-center gap-1">
                            <button
                                onClick={() => {
                                    setDP((prev) => prev - 1);
                                    setShowDialPad(false);
                                }}
                                disabled={dP === 0 ? true : false}
                                className="disabled:bg-red-300 dark:disabled:bg-red-400 disabled:cursor-not-allowed bg-red-500 text-white mt-1 cursor-pointer active:scale-95 duration-300 ease-in-out rounded-full p-1"
                            >
                                <Minus strokeWidth={3.5} size={12}></Minus>
                            </button>

                            <span
                                className={`font-bold text-3xl rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
                            >
                                {dP}
                            </span>
                            <button
                                onClick={() => {
                                    setDP((prev) => prev + 1);
                                    setShowDialPad(false);
                                }}
                                disabled={dP === 9 ? true : false}
                                className="bg-primary text-white mt-1 cursor-pointer active:scale-95 duration-300 disabled:cursor-not-allowed disabled:bg-secondary ease-in-out rounded-full p-1"
                            >
                                <Plus strokeWidth={3.5} size={12}></Plus>
                            </button>
                        </div>
                    </div>

                    {/* Color Picker */}
                    <ColorPicker
                        heading="Color"
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                    ></ColorPicker>

                    {/* Currency */}

                    <div className="w-full flex flex-col gap-2 items-start max-h-120 md:max-h-90 overflow-scroll">
                        <h4 className="font-bold text-xl">Currency:</h4>
                        <div className="flex relative justify-between px-2 gap-2 items-center w-full">
                            <SearchBar
                                full={true}
                                ph={
                                    "Search currency by name or currency code..."
                                }
                                title={
                                    "Search currency by name or currency code..."
                                }
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                            ></SearchBar>
                        </div>
                        <div
                            className={`ease-in-out w-full overflow-y-auto duration-300 h-auto grid grid-cols-[repeat(auto-fit,minmax(125px,1fr))] `}
                        >
                            {showCurrencyCards()}
                        </div>
                    </div>
                    <DialPad
                        dP={dP}
                        text="Balance"
                        input={balance}
                        showModal={showDialPad}
                        setShowModal={setShowDialPad}
                        setInput={setBalance}
                        currencySymbol={selectedCurrency?.symbol}
                    ></DialPad>
                </>
            }
        ></BaseModal>
    );
};

export default AccountsModal;
