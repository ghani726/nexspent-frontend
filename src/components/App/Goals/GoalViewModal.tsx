import ProgressRing from "@/components/App/Common/ProgressRing";
import ViewModal from "@/components/App/Common/ViewModel";
import GoalModal from "@/components/App/Goals/Modal";
import { IGoal } from "@/types/goal";
import React, { useRef, useState } from "react";
import colors from "@/utils/color";
import useAuth from "@/hooks/Auth";
import dayjs from "dayjs";
import { ApiError, IDeleteHandlerProps } from "@/types/common";
import toast from "react-hot-toast";
import HandleErrorMessage from "@/utils/networkError";
import { API_Goal_Delete } from "@/api/GoalAPI";
import useData from "@/hooks/Data";
import DeleteModal from "@/components/App/Common/DeleteModal";
import { formatTransactions } from "@/utils/transaction";
import TransactionBlock from "@/components/App/Transactions/TransactionBlock";
import TransactionsModal from "@/components/App/Transactions/Modal";
import { ITransaction } from "@/types/transaction";
import AddButton from "@/components/App/Common/AddButton";

const DeleteHandler = async ({
    _id,
    token,
    Cancel,
    GetData,
    setIsLoading,
}: IDeleteHandlerProps) => {
    setIsLoading(true);

    try {
        await API_Goal_Delete({ _id, token });

        setIsLoading(false);
        toast.success("Goal Deleted successfully.");
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

const GoalViewModal = ({
    Goal,
    Cancel,
    GetData,
}: {
    Goal: IGoal;
    Cancel: () => void;
    GetData: () => void;
}) => {
    // 1. Update Modal State
    const [showModal, setShowModal] = useState(false);
    const [showTxnModal, setShowTxnModal] = useState(false);

    // 2. Get user and transactions from Global Context
    const { user } = useAuth();
    const { transactions } = useData();

    // 3. Initiliazing dates at 00:00
    const today = dayjs(new Date()).startOf("day");
    const start = dayjs(Goal.startDate).startOf("day");
    const end = dayjs(Goal.endDate).startOf("day");

    // 4. Differences between dates
    const diffES = end.diff(start, "days");
    const diffST = today.diff(start, "days");

    // 5. Small util vairables
    const progress = (Goal.savedAmount! / Goal.goalAmount) * 100;
    const currentColor = colors.find((e) => e.name === Goal.bgColor);
    const amount = parseFloat(
        ((Goal.goalAmount - Goal.savedAmount!) / diffES).toFixed(
            user?.decimalPrecision,
        ),
    );
    const transacts = transactions.filter((txn) => txn.goal === Goal._id);

    // 6. Util Functin to render start date.
    const showStart = () => {
        if (!diffST) return "Today";

        if (start.year() !== end.year()) {
            return `${start.format("MMM DD")} ${start.year()}`;
        } else {
            return start.format("MMM DD");
        }
    };

    // 7. Delete Dialog Ref
    const dialogRef = useRef<HTMLDialogElement>(null);

    // 8. Prepare all Transactions for the UI
    const finalTxns = formatTransactions(transacts);

    // 9. Txn state
    const [txn, setTxn] = useState<Partial<ITransaction> | null>({
        goal: Goal._id,
        type: "expense",
    });
    const [typeOfModal, setTypeOfModal] = useState<"Create" | "Update">(
        "Create",
    );

    // 10. Edit function for TXN
    const EditFunc = ({
        title,
        description,
        type,
        amount,
        date,
        account,
        category,
        budget,
        goal,
        toAccount,
        fromAccount,
        _id,
    }: ITransaction) => {
        setTypeOfModal("Update");
        setTxn((prev) => ({
            ...prev,
            title: title!,
        }));
        setTxn((prev) => ({
            ...prev,
            description: description ?? "",
        }));
        setTxn((prev) => ({
            ...prev,
            type: type,
        }));
        setTxn((prev) => ({
            ...prev,
            amount: amount,
        }));
        setTxn((prev) => ({
            ...prev,
            date: date?.toLocaleString() ?? "",
        }));
        setTxn((prev) => ({
            ...prev,
            category: category ?? "",
        }));
        setTxn((prev) => ({
            ...prev,
            fromAccount: account || (fromAccount ?? ""),
        }));
        setTxn((prev) => ({
            ...prev,
            toAccount: toAccount ?? "",
        }));
        setTxn((prev) => ({
            ...prev,
            budget: budget ?? "",
        }));
        setTxn((prev) => ({
            ...prev,
            goal: goal ?? "",
        }));
        setTxn((prev) => ({
            ...prev,
            _id: _id ?? "",
        }));
        setShowTxnModal(true);
    };

    // 11. Cancel function for TXN
    const CancelTxn = () => {
        setShowTxnModal(false);
        setTypeOfModal("Create");
        setTxn(null);
    };

    console.log(Goal.status);

    return (
        <ViewModal
            title="Goal"
            Cancel={Cancel}
            handleUpdate={() => setShowModal(true)}
            showDelete={true}
            showUpdate={
                Goal.status === "completed" || Goal.status === "failed"
                    ? false
                    : true
            }
            openModal={() => dialogRef.current?.showModal()}
            children={
                <>
                    <ProgressRing
                        size="XL"
                        percentage={Math.round(progress)}
                        children={
                            <div className="flex flex-col justify-between items-center h-full gap-2 p-4">
                                <div
                                    className={`h-18 p-3 aspect-square ${currentColor?.color} rounded-full flex justify-center items-center text-4xl`}
                                >
                                    {Goal.icon}
                                </div>
                                <h3
                                    className={`text-3xl font-bold line-clamp-1 break-all`}
                                >
                                    {/* {Math.round(progress)}% */}
                                    {Goal.status === "failed"
                                        ? "Failed"
                                        : `${parseFloat(
                                              progress.toFixed(
                                                  user?.decimalPrecision,
                                              ),
                                          )}%`}
                                </h3>
                                <div className="flex justify-between gap-1 items-end">
                                    <h4 className="text-xl">
                                        {user?.currency}
                                        {parseFloat(
                                            Goal.savedAmount!.toFixed(
                                                user?.decimalPrecision,
                                            ),
                                        )?.toLocaleString()}
                                    </h4>
                                    <p className="flex items-end text-gray-600 ">
                                        / {user?.currency}
                                        {parseFloat(
                                            Goal.goalAmount.toFixed(
                                                user?.decimalPrecision,
                                            ),
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        }
                    ></ProgressRing>

                    <div className="flex flex-col gap-2 justify-between items-center w-full">
                        <div
                            className={`p-2 px-6 font-bold rounded-full text-lg ${Goal.status === "pending" ? "bg-yellow-500 text-white" : Goal.status === "active" ? "bg-blue-500 text-white" : Goal.status === "completed" ? "bg-primary text-white" : "bg-red-500 text-white"}`}
                        >
                            {Goal.status.toUpperCase()}
                        </div>
                        <div
                            className={`text-2xl font-bold line-clamp-1 break-all`}
                        >
                            <p className="">
                                {showStart()} - {end.format("MMM DD")}{" "}
                                {start.year() !== end.year() && end.year()}
                            </p>
                        </div>

                        <p>
                            {Goal.status === "active" ||
                            Goal.status === "pending"
                                ? `${user?.currency}
                        ${amount}/day for ${diffES} days`
                                : Goal.status === "failed"
                                  ? "Failed"
                                  : "Completed"}
                        </p>
                        <p>
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
                        <GoalModal
                            Cancel={Cancel}
                            GetData={GetData}
                            editObj={Goal}
                            typeOfModal={"Update"}
                        ></GoalModal>
                    )}
                    <DeleteModal
                        text={"goal"}
                        Cancel={Cancel}
                        GetData={GetData}
                        DeleteHandler={DeleteHandler}
                        dialogRef={dialogRef}
                        handleCancel={() => dialogRef.current?.close()}
                        _id={Goal._id!}
                    ></DeleteModal>
                    {showTxnModal && (
                        <TransactionsModal
                            Cancel={CancelTxn}
                            typeOfModal={typeOfModal}
                            GetData={()=> {
                                GetData()
                                Cancel()
                            }}
                            editObj={txn! as ITransaction}
                            showTypeSelector={false}
                            allowedGoal={Goal._id}
                        ></TransactionsModal>
                    )}
                </>
            }
        ></ViewModal>
    );
};

export default GoalViewModal;
