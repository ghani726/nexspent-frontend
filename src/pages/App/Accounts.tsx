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
import { API_Account_Delete } from "@/api/AccountsAPI";
import SearchBar from "@/components/App/Common/SearchBar";
import MergeModal from "@/components/App/Common/MergeModal";
import type { ApiError, IDeleteHandlerProps } from "@/types/common";
import type { IAccount } from "@/types/account";
import HandleErrorMessage from "@/utils/networkError";
import AccountsCard from "@/components/App/Home/AccountsCard";
import AccountViewModal from "@/components/App/Accounts/AccountViewModal";

const DeleteHandler = async ({
    _id,
    token,
    Cancel,
    GetData,
    setIsLoading,
}: IDeleteHandlerProps) => {
    setIsLoading(true);
    try {
        await API_Account_Delete({ _id: _id, token });

        setIsLoading(false);
        toast.success("Account Deleted successfully.");
        GetData();
        Cancel();
    } catch (error) {
        setIsLoading(false);
        const err = error as ApiError;
        const res = err?.response?.data;

        if (res) toast.error(res.error.message);
        else HandleErrorMessage(err);
    }
};
const Accounts = ({ GetData }: { GetData: () => void }) => {
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
            return (
                <AccountCard
                    obj={e}
                    key={e._id}
                    ViewFunc={ViewFunc}
                    MergeFunc={MergeFunc}
                ></AccountCard>
            );
        });
    };
    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [showMergeModal, setShowMergeModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    // Edit States
    const [typeOfModal, setTypeOfModal] = useState<"Create" | "Update">(
        "Create",
    );
    // const [name, setName] = useState("");
    // const [balance, setBalance] = useState(0);
    // const [bgColor, setBgColor] = useState("Default");
    const baseAccount: IAccount = {
        name: "",
        balance: 0,
        bgColor: "",
        _id: "",
    };
    const [account, setAccount] = useState(baseAccount);

    // Merge State
    const [mergeAccountID, setMergeAccountID] = useState("");
    const [mergeObj1, setMergeObj1] = useState("");
    const [mergeObj2, setMergeObj2] = useState("");

    const { accounts } = useData();

    //   Function to get back
    const Cancel = () => {
        setShowViewModal(false);
        setShowModal(false);
        setTypeOfModal("Create");
        setAccount(baseAccount);
    };

    //   Function to control edit.
    const ViewFunc = (obj: IAccount) => {
        setTypeOfModal("Update");
        setAccount(obj);
        setShowViewModal(true)
    };

    // Info Modal

    const infoRef = useRef<HTMLDialogElement>(null);

    const openInfoModal = () => infoRef.current?.showModal();

    // Merge Modal

    const MergeFunc = (id: string, name: string) => {
        if (!account._id) {
            setAccount((prev) => ({ ...prev, _id: id }));
            setMergeObj1(name);
            setShowMergeModal(true);
        } else if (id === account._id) {
            CancelMerge();
        } else if (id && id !== account._id) {
            setMergeAccountID(id);
            setMergeObj2(name);
        }
    };

    const CancelMerge = () => {
        setAccount((prev) => ({ ...prev, _id: "" }));
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
                ph={"Search account..."}
                title={"Search account..."}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            ></SearchBar>
            <MergeModal
                showMergeModal={showMergeModal}
                GetData={GetData}
                Cancel={CancelMerge}
                type="Account"
                firstID={account._id!}
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
                title="Create account"
                showModal={showModal}
                setShowModal={setShowModal}
            ></AddButton>
            {showModal && (
                <AccountsModal
                    Cancel={Cancel}
                    typeOfModal={typeOfModal}
                    editObj={AccountsCard}
                    GetData={GetData}
                ></AccountsModal>
            )}
            {showViewModal && (
                <AccountViewModal
                    Account={account}
                    GetData={GetData}
                    Cancel={Cancel}
                ></AccountViewModal>
            )}
        </div>
    );
};

export default Accounts;
