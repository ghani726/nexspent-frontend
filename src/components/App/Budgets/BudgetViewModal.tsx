import ViewModal from "@/components/App/Common/ViewModel";
import BudgetModal from "@/components/App/Budgets/Modal";
import { IBudget } from "@/types/budget";
import { useRef, useState } from "react";

import useAuth from "@/hooks/Auth";

import { ApiError, IDeleteHandlerProps } from "@/types/common";
import toast from "react-hot-toast";
import HandleErrorMessage from "@/utils/networkError";
import { API_Budget_Delete } from "@/api/BudgetAPI";

import DeleteModal from "@/components/App/Common/DeleteModal";
import { formatTransactions } from "@/utils/transaction";
import TransactionBlock from "@/components/App/Transactions/TransactionBlock";
import TransactionsModal from "@/components/App/Transactions/Modal";
import { ITransaction } from "@/types/transaction";
import AddButton from "@/components/App/Common/AddButton";
import {
    CalculateTxnsFromBudget,
    getBudgetHistorySimple,
} from "@/utils/budget";
import { History } from "lucide-react";
import HistoryModal from "@/components/App/Budgets/HistoryModal";

const DeleteHandler = async ({
    _id,
    token,
    Cancel,
    GetData,
    setIsLoading,
}: IDeleteHandlerProps) => {
    setIsLoading(true);

    try {
        await API_Budget_Delete({ _id, token });

        setIsLoading(false);
        toast.success("Budget Deleted successfully.");
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

const BudgetViewModal = ({
    Budget,
    Cancel,
    GetData,
}: {
    Budget: IBudget;
    Cancel: () => void;
    GetData: () => void;
}) => {
    // 1. Update Modal State
    const [showModal, setShowModal] = useState(false);
    const [showTxnModal, setShowTxnModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);

    // 2. Get user and transactions from Global Context
    const { user } = useAuth();

    // 3. Obtain necessary things from the utility
    const {
        hexColor,
        spentAmount,
        progress,
        start,
        end,
        diffNowEnd,
        spendingText,
        transacts,
        filteredTxnBasedOnDate,
    } = CalculateTxnsFromBudget(Budget);

    // 6. Util Functin to render start date.
    const showStart = () => {
        if (!diffNowEnd) return "Today";

        if (start?.year() !== end?.year()) {
            return `${start?.format("ddd, MMM DD")} ${start?.year()}`;
        } else {
            return start?.format("ddd, MMM DD");
        }
    };

    // 7. Delete Dialog Ref
    const dialogRef = useRef<HTMLDialogElement>(null);

    // 8. Prepare all Transactions for the UI
    const finalTxns = formatTransactions(filteredTxnBasedOnDate);

    // 9. Txn state
    const [txn, setTxn] = useState<Partial<ITransaction> | null>({
        budget: Budget._id,
        type: "expense",
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

    // 12. History of the budget
    const history = getBudgetHistorySimple(Budget, transacts, start);
    history.unshift({
        start: start,
        end: end,
        spentAmount: spentAmount,
        totalAmount: Budget.amount,
        isOverspent: spentAmount > Budget.amount,
        transactions: filteredTxnBasedOnDate,
    });

    return (
        <ViewModal
            title="Budget"
            Cancel={Cancel}
            handleUpdate={() => setShowModal(true)}
            showDelete={true}
            openModal={() => dialogRef.current?.showModal()}
            children={
                <>
                    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-4xl border-2 border-gray-200 dark:border-gray-700 mt-2 flex flex-col items-center gap-2">
                        <h2
                            className={`w-full flex justify-center font-bold text-4xl wrap-anywhere`}
                        >
                            {Budget.title}
                        </h2>
                        <div className="flex justify-start gap-1 items-center">
                            <h4 className="text-xl font-bold flex items-end leading-none">
                                {user?.currency}
                                {spentAmount.toLocaleString()}
                            </h4>
                            <p className="flex items-end text-gray-700 dark:text-gray-300 leading-none">
                                spent of {user?.currency}
                                {Budget.amount.toLocaleString()}
                            </p>
                        </div>
                        <div
                            className={`w-full h-6 rounded-full bg-gray-100 dark:bg-gray-700 relative`}
                        >
                            <div
                                style={{
                                    width: `${progress > 100 ? 100 : progress}%`,
                                    backgroundColor: `${progress > 100 ? "#EF4444" : `color-mix(in srgb, ${hexColor} 50%, transparent)`}`,
                                }}
                                className={`h-full rounded-full absolute left-0 top-0`}
                            ></div>
                            <div
                                className={`absolute ${progress > 0 ? "text-white text-shadow-sm text-shadow-black/50" : "text-gray-700 dark:text-gray-300"} left-1/2 top-1/2 -translate-1/2 text-xs rounded-full flex justify-center px-3 items-center font-medium`}
                            >
                                {parseFloat(progress.toFixed(user?.decimalPrecision))}%
                            </div>
                        </div>
                        <div className={`font-medium line-clamp-1 break-all`}>
                            <p className="">
                                {showStart()} - {end?.format("ddd, MMM DD")}{" "}
                                {start?.year() !== end?.year() && end?.year()}
                            </p>
                        </div>
                        <p className="text-sm text-gray-500">
                            {progress > 100
                                ? `You have over spent ${user?.currency}${spentAmount - Budget.amount}`
                                : spendingText}
                        </p>
                        <p className="text-gray-500">
                            {filteredTxnBasedOnDate?.length}{" "}
                            {filteredTxnBasedOnDate?.length === 1
                                ? "transaction"
                                : "transactions"}
                        </p>
                        {Budget.type === "Auto-Repeat" && (
                            <button
                                onClick={() =>
                                    setShowHistoryModal((prev) => !prev)
                                }
                                className="flex justify-center items-center gap-2  px-4 p-2 bg-primary text-white rounded-full hover:bg-primary-hover cursor-pointer active:scale-95 duration-300 ease-in-out"
                            >
                                View History <History></History>{" "}
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 justify-between items-center w-full p-2"></div>

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
                    {showModal && (
                        <BudgetModal
                            Cancel={Cancel}
                            GetData={GetData}
                            editObj={Budget}
                            typeOfModal={"Update"}
                        ></BudgetModal>
                    )}
                    <DeleteModal
                        text={"budget"}
                        Cancel={Cancel}
                        GetData={GetData}
                        DeleteHandler={DeleteHandler}
                        dialogRef={dialogRef}
                        handleCancel={() => dialogRef.current?.close()}
                        _id={Budget._id!}
                    ></DeleteModal>
                    {showTxnModal && (
                        <TransactionsModal
                            Cancel={CancelTxn}
                            typeOfModal={typeOfModal}
                            GetData={GetData}
                            editObj={txn! as ITransaction}
                            showTypeSelector={false}
                            allowedBudget={Budget._id}
                        ></TransactionsModal>
                    )}
                    {showHistoryModal && (
                        <HistoryModal
                            Cancel={() => setShowHistoryModal(false)}
                            History={history}
                            hexColor={hexColor}
                            EditFunc={EditFunc}
                        ></HistoryModal>
                    )}
                    <AddButton
                        showModal={showTxnModal}
                        setShowModal={setShowTxnModal}
                        title="Create Transaction"
                        position="absolute"
                    />
                </>
            }
        ></ViewModal>
    );
};

export default BudgetViewModal;
