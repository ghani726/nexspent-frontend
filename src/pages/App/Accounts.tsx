import { useState } from "react";
import { useRef } from "react";
import { Wallet } from "lucide-react";
import toast from "react-hot-toast";
import AccountCard from "@/components/App/Accounts/AccountCard";
import AddButton from "@/components/App/Common/AddButton";
import AccountsModal from "@/components/App/Accounts/Modal";
import useData from "@/hooks/Data";
import InfoModal from "@/components/App/Common/InfoModal";
import InfoButton from "@/components/App/Common/InfoButton";
import DeleteModal from "@/components/App/Common/DeleteModal";
import { DeleteAccount } from "@/api/AccountsAPI";
import SearchBar from "@/components/App/Common/SearchBar";
import MergeModal from "@/components/App/Common/MergeModal";
import type { ApiError, IAccount, ICurrency, IDeleteHandlerProps } from "@/types/common";
import { baseCurrency } from "@/utils/currencies";

const DeleteHandler = async ({
    _id,
    token,
    Cancel,
    GetData,
    setIsLoading,
}: IDeleteHandlerProps) => {
    setIsLoading(true);
    try {
        const res = await DeleteAccount({ accountID: _id, token });

        if (res.success) {
            setIsLoading(false);
            toast.success("Account Deleted successfully.");
            GetData();
            Cancel();
        } else {
            setIsLoading(false);
            return toast.error(res.error.message);
        }
    } catch (error) {
		const err = error as ApiError
        setIsLoading(false);
        if (err?.response?.data?.error?.message) {
            return toast.error(err.response.data.error.message);
        } else {
            return toast.error(err.message);
        }
    }
};
const Accounts = ({ GetData }: {GetData: ()=> void}) => {
    //#region

    // Search
    const [searchValue, setSearchValue] = useState("");

    const acts = () => {
        // 1. Filter accounts based on search text
        const filteredAccounts = accounts.filter((act) => {
            const matchesSearch = searchValue.trim()
                ? act.name.toLowerCase().includes(searchValue.toLowerCase())
                : true;
            return matchesSearch;
        });

        // 2. Map filtered array to JSX and RETURN it
        return filteredAccounts.map((e) => {
            const txns = transactions.filter((i) => i.account === e._id);
			
            return (
                <AccountCard
					_id={e._id}
                    key={e._id}
                    name={e.name}
                    balance={e.balance}
                    currency={e.currency}
                    accountsLength={accounts.length}
                    bgColor={e.bgColor}
                    transactions={txns}
                    decimalPrecision={e.decimalPrecision}
                    EditFunc={EditFunc}
                    DeleteFunc={DeleteFunc}
                    MergeFunc={MergeFunc}
                ></AccountCard>
            );
        });
    };
    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [showMergeModal, setShowMergeModal] = useState(false);

    // Edit States
    const [typeOfModal, setTypeOfModal] = useState<"Add" | "Edit">("Add");
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [decimalPrecision, setDecimalPrecision] = useState(0);
    const [bgColor, setBgColor] = useState("Default");
    const [currency, setCurrency] = useState<ICurrency | null>(null);

    // Edit, Delete and Merge States
    const [accountID, setAccountID] = useState("");

    // Merge State
    const [mergeAccountID, setMergeAccountID] = useState("");
    const [mergeObj1, setMergeObj1] = useState("");
    const [mergeObj2, setMergeObj2] = useState("");

    const { accounts, transactions } = useData();

    //   Function to get back
    const Cancel = () => {
        setShowModal(false);
        setTypeOfModal("Add");
        setName("");
        setBalance(0);
        setBgColor("Default");
        setCurrency(null);
        setDecimalPrecision(0);
        setAccountID("");
    };

    //   Function to control edit.
    const EditFunc = ({name, balance, decimalPrecision, bgColor, currency, _id}: IAccount) => {
        setTypeOfModal("Edit");
        setName(name);
        setBalance(balance);
        setDecimalPrecision(decimalPrecision?? 0);
        setBgColor(bgColor);
        setCurrency(currency);
        setAccountID(_id);
        setShowModal(true);
    };

    // Delete Function

    const DeleteFunc = (accountID: string) => {
        setAccountID(accountID);
        openModal();
    };

    const CancelDelete = () => {
        setAccountID("");
        closeModal();
    };

    // Modalbackground: var(--color-gray-900);

    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => dialogRef.current?.showModal();

    const closeModal = () => dialogRef.current?.close();

    // Info Modal

    const infoRef = useRef<HTMLDialogElement>(null);

    const openInfoModal = () => infoRef.current?.showModal();

    // Merge Modal
	
    const MergeFunc = (id: string, name: string) => {
        if (!accountID) {
            setAccountID(id);
            setMergeObj1(name);
            setShowMergeModal(true);
        } else if (id === accountID) {
            CancelMerge();
        } else if (id && id !== accountID) {
            setMergeAccountID(id);
            setMergeObj2(name);
        }
    };

    const CancelMerge = () => {
        setAccountID("");
        setMergeAccountID("");
        setMergeObj1("");
        setMergeObj2("");
        setShowMergeModal(false);
    };

    //
    // #endregion

    //   HTML
    return (
        <div className="relative w-full lg:max-w-7/10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold line-clamp-1 text-3xl text-primary">
                    Accounts
                </h2>
                <InfoButton openInfoModal={openInfoModal}></InfoButton>
                <InfoModal
                    ref={infoRef}
                    title={"Accounts"}
                    desc={
                        "Every transaction belongs to an account, which represents where your money is stored or spent - like cash, or credit."
                    }
                    icon={<Wallet size={36}></Wallet>}
                ></InfoModal>
            </div>
            <SearchBar
                // className="w-full"
                ph={"Search account..."}
                title={"Search account..."}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            ></SearchBar>
            <MergeModal
                // Ref={mergeRef}
                showMergeModal={showMergeModal}
                GetData={GetData}
                Cancel={CancelMerge}
                type="Account"
                firstID={accountID}
                mergeID={mergeAccountID}
                mergeObj1={mergeObj1}
                mergeObj2={mergeObj2}
            ></MergeModal>
            <div
                className={`w-full ${showMergeModal ? "m-0" : "-mt-12"} gap-2 flex flex-col`}
            >
                {acts()}
            </div>
            <AddButton
                title="Add account"
                showModal={showModal}
                setShowModal={setShowModal}
            ></AddButton>
            {showModal && (
                <AccountsModal
                    Cancel={Cancel}
                    showModal={showModal}
                    typeOfModal={typeOfModal}
                    editObj={{
                        name,
                        balance,
                        decimalPrecision,
                        bgColor,
                        currency: currency || baseCurrency,
                        _id: accountID,
                    }}
                    GetData={GetData}
                ></AccountsModal>
            )}
            <DeleteModal
                text="account"
                GetData={GetData}
                DeleteHandler={DeleteHandler}
                dialogRef={dialogRef}
                handleCancel={CancelDelete}
                _id={accountID}
            ></DeleteModal>
        </div>
    );
};

export default Accounts;
