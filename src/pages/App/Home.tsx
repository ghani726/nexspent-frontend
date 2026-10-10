import AddButton from "@/components/App/Common/AddButton";
import TransactionsModal from "@/components/App/Transactions/Modal";
import TransactionBlock from "@/components/App/Transactions/TransactionBlock";
import useAuth from "@/hooks/Auth";
import useData from "@/hooks/Data";
import { ITransaction } from "@/types/transaction";
import { formatTransactions } from "@/utils/transaction";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router";
const Home = ({ GetData }: { GetData: () => void }) => {
    // Data
    const { accounts, transactions } = useData();

    // User
    const { user } = useAuth();
    const [showTxnModal, setShowTxnModal] = useState(false);
    const [typeOfModal, setTypeOfModal] = useState<"Create" | "Update">(
        "Create",
    );
    const [txn, setTxn] = useState<ITransaction | null>(null);

    // Greeting Calculator

    const Greeting = () => {
        const hours = new Date().getHours();

        if (hours >= 5 && hours < 12) {
            return "Morning";
        } else if (hours >= 12 && hours < 17) {
            return "Afternoon";
        } else if (hours >= 17 && hours < 21) {
            return "Evening";
        } else {
            return "Night";
        }
    };

    const now = dayjs();
    const txns = transactions.filter((e) => {
        const txDate = dayjs(e.date);
        return txDate.month() === now.month() && txDate.year() === now.year();
    });

    const finalTxns = formatTransactions(txns).reverse();
    const balance = accounts.reduce((acc, obj) => acc + obj.balance!, 0);

    const EditFunc = (obj: ITransaction) => {
        setTypeOfModal("Update");
        setTxn((prev) => ({ ...prev, ...obj }));
        setShowTxnModal(true);
    };

    const CancelTxn = () => {
        setShowTxnModal(false);
        setTypeOfModal("Create");
        setTxn(null)
    };
    return (
        <div className="relative w-full lg:max-w-7/10 flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col">
                <h3 className="font-bold text-xl">Good {Greeting()}</h3>
                <h1 className="font-bold line-clamp-1 text-3xl text-primary">
                    {user?.fullName}
                </h1>
            </div>
            <AddButton
                showModal={showTxnModal}
                setShowModal={setShowTxnModal}
                title="Transaction"
            ></AddButton>
            {/* Balance */}
            <div className="flex flex-col w-full bg-white dark:bg-gray-800   border border-gray-200 dark:border-gray-700 shadow-medium p-6 rounded-4xl gap-2">
                <div className="flex flex-col">
                    <h3 className="text-xl font-semibold">Total Balance</h3>
                    <h2
                        className={`text-3xl font-bold ${balance > 0 ? "text-primary" : balance < 0 ? "text-red-600" : "text-black"}`}
                    >
                        {balance < 0
                            ? `-${user?.currency}${parseFloat(Math.abs(balance).toFixed(user?.decimalPrecision)).toLocaleString()}`
                            : `${user?.currency}
                        ${parseFloat(balance.toFixed(user?.decimalPrecision)).toLocaleString()}`}
                    </h2>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col sm:flex-row sm:gap-2 justify-center items-center p-4 rounded-3xl bg-emerald-100/50 dark:bg-emerald-900/50 border border-gray-200 dark:border-gray-700 w-1/2 min-w-0">
                        <h3 className="text-xl font-semibold text-primary wrap-anywhere">
                            {user?.currency}
                            {parseFloat(txns
                                .filter((e) => e.type === "income")
                                .reduce((total, obj) => total + obj.amount, 0)
                                .toFixed(user?.decimalPrecision))
                                .toLocaleString()}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                            Income
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-2 justify-center items-center p-4 rounded-3xl bg-red-100/50 dark:bg-red-900/50 border border-gray-200 dark:border-gray-700 w-1/2 wrap-anywhere">
                        <h3 className="text-xl font-semibold text-red-600">
                            {user?.currency}
                            {parseFloat(txns
                                .filter((e) => e.type === "expense")
                                .reduce((total, obj) => total + obj.amount, 0)
                                .toFixed(user?.decimalPrecision))
                                .toLocaleString()}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                            Expense
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full gap-2">
                <h3 className="text-2xl font-semibold text-primary px-2">
                    Recent Transactions:
                </h3>

                <div className="w-full gap-2 flex flex-col duration-300 ease-in-out">
                    {finalTxns.map((e) => (
                        <TransactionBlock
                            obj={e}
                            EditFunc={EditFunc}
                        ></TransactionBlock>
                    ))}
                </div>
                <div className="flex w-full justify-center items-center">
                    <Link
                        to={"/app/transactions"}
                        className="px-4 p-2 rounded-full text-white bg-primary text-sm w-fit"
                    >
                        View All
                    </Link>
                </div>
            </div>
            {showTxnModal && (
                <TransactionsModal
                    Cancel={CancelTxn}
                    typeOfModal={typeOfModal}
                    GetData={GetData}
                    editObj={txn! as ITransaction}
                ></TransactionsModal>
            )}
        </div>
    );
};

export default Home;
