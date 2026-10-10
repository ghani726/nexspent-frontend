import ViewModal from "@/components/App/Common/ViewModel";
import React, { useRef, useState } from "react";
import { ApiError, IDeleteHandlerProps } from "@/types/common";
import toast from "react-hot-toast";
import HandleErrorMessage from "@/utils/networkError";
import useData from "@/hooks/Data";
import DeleteModal from "@/components/App/Common/DeleteModal";
import { formatTransactions } from "@/utils/transaction";
import TransactionBlock from "@/components/App/Transactions/TransactionBlock";
import TransactionsModal from "@/components/App/Transactions/Modal";
import { ITransaction } from "@/types/transaction";
import AddButton from "@/components/App/Common/AddButton";
import { IAccount } from "@/types/account";
import { API_Account_Delete } from "@/api/AccountsAPI";
import AccountsModal from "@/components/App/Accounts/Modal";

const DeleteHandler = async ({
    _id,
    token,
    Cancel,
    GetData,
    setIsLoading,
}: IDeleteHandlerProps) => {
    setIsLoading(true);

    try {
        await API_Account_Delete({ _id, token });

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

const AccountViewModal = ({
    Account,
    Cancel,
    GetData,
}: {
    Account: IAccount;
    Cancel: () => void;
    GetData: () => void;
}) => {
    
    // 1. Update Modal State
    const [showModal, setShowModal] = useState(false);
    const [showTxnModal, setShowTxnModal] = useState(false);

    // 2. Get user, transactions, and categories from Global Context
    const { transactions, accounts } = useData();
    const transacts = transactions.filter(
        (txn) => txn.account === Account._id,
    ); //Filter out all transactions with this account id.
    // 7. Delete Dialog Ref
    const dialogRef = useRef<HTMLDialogElement>(null);

    // 8. Prepare all Transactions for the UI
    const finalTxns = formatTransactions(transacts);

    // 9. Txn state
    const [txn, setTxn] = useState<Partial<ITransaction> | null>({
        account: Account._id,
    });
    const [typeOfModal, setTypeOfModal] = useState<"Create" | "Update">(
        "Create",
    );

    // 10. Edit function for TXN
    const EditFunc = (obj: ITransaction) => {
        setTypeOfModal("Update");
        setTxn((prev) => ({ ...prev, ...obj }));
        setShowTxnModal(true);
    };

    // 11. Cancel function for TXN
    const CancelTxn = () => {
        setShowTxnModal(false);
        setTypeOfModal("Create");
        setTxn(null)
    };
    
    return (
        <ViewModal
            title="Account"
            Cancel={Cancel}
            handleUpdate={() => setShowModal(true)}
            showDelete={accounts.length > 1 && transacts.length === 0}
            openModal={() => dialogRef.current?.showModal()}
            children={
                <>
                    <div className="flex flex-col gap-2 justify-between items-center w-full">
        
                        <div
                            className={`text-3xl font-bold wrap-anywhere w-full text-center`}
                        >
                            {Account.name}
                        </div>
                        <p className="text-gray-700 dark:text-gray-400">
                            {transacts?.length}{" "}
                            {transacts?.length === 1
                                ? "transaction"
                                : "transactions"}
                        </p>
                        <div className="flex flex-col justify-start items-center w-full pb-16">
                            {finalTxns.map((e) => {
                                return (
                                    <TransactionBlock
                                        key={e.date}
                                        obj={e}
                                        EditFunc={EditFunc}
                                    ></TransactionBlock>
                                );
                            })}
                        </div>
                    </div>
                    <AddButton
                        showModal={showTxnModal}
                        setShowModal={setShowTxnModal}
                        title="Create Transaction"
                        position="absolute"
                    />
                    {showModal && (
                        
                        <AccountsModal
                            Cancel={Cancel}
                            GetData={GetData}
                            editObj={Account}
                            typeOfModal={"Update"}
                        ></AccountsModal>
                    )}
                    <DeleteModal
                        text={"account"}
                        Cancel={Cancel}
                        GetData={GetData}
                        DeleteHandler={DeleteHandler}
                        dialogRef={dialogRef}
                        handleCancel={() => dialogRef.current?.close()}
                        _id={Account._id!}
                    ></DeleteModal>
                    {showTxnModal && (
                        <TransactionsModal
                            Cancel={CancelTxn}
                            typeOfModal={typeOfModal}
                            GetData={GetData}
                            editObj={txn! as ITransaction}
                            allowedAccount={Account._id}
                            showTypeSelector={true}
                            showTransfer={false}
                        ></TransactionsModal>
                    )}
                </>
            }
        ></ViewModal>
    );
};

export default AccountViewModal;
