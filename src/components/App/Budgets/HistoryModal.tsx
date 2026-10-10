import ViewModal from "@/components/App/Common/ViewModel";
import TransactionBlock from "@/components/App/Transactions/TransactionBlock";
import useAuth from "@/hooks/Auth";
import { ITransaction } from "@/types/transaction";
import { formatTransactions } from "@/utils/transaction";
import dayjs from "dayjs";
import React, { useState } from "react";

interface HistoryBud {
    isOverspent: boolean;
    spentAmount: number;
    totalAmount: number;
    transactions: ITransaction[];
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
}
const HistoryCard = ({
    bud,
    idx,
    currencySymbol,
    dP = 2,
    hexColor,
    EditFunc,
}: {
    bud: HistoryBud;
    idx: number;
    currencySymbol: string;
    dP: number;
    hexColor: string;
    EditFunc: (obj: ITransaction) => void;
}) => {
    const progress = (bud.spentAmount / bud.totalAmount) * 100;
    const [showTxns, setShowTxns] = useState(false);
    return (
        <div
            onClick={() => setShowTxns((prev) => !prev)}
            className="flex flex-col justify-center items-start bg-white p-6 rounded-4xl w-full border border-gray-200 dark:border-gray-700 gap-2"
        >
            <h3 className="text-2xl font-bold">
                {!idx
                    ? "Current Period"
                    : `${bud.start.format("MMM DD")} to ${bud.end.format("MMM DD, YYYY")}`}
            </h3>
            <div className="flex justify-between gap-1 items-center">
                <h4 className="font-bold text-lg flex items-end leading-none">
                    {/* {user?.defaultCurrency.symbol} */}
                    {currencySymbol}
                    {bud.spentAmount.toLocaleString()}
                </h4>
                <p className="flex text-xs items-end text-gray-700 dark:text-gray-200 leading-none">
                    spent of {currencySymbol}
                    {bud.totalAmount.toLocaleString()}
                </p>
            </div>
            <div
                className={`w-full h-4 rounded-full bg-gray-100 dark:bg-gray-700 relative`}
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
                    {parseFloat(progress.toFixed(dP))}%
                </div>
            </div>
            <p className="text-gray-500 text-sm">
                {bud.transactions?.length}{" "}
                {bud.transactions?.length === 1
                    ? "transaction"
                    : "transactions"}
            </p>
            {showTxns}
            {showTxns && (
                <ShowTransactions
                    txns={bud.transactions}
                    EditFunc={EditFunc}
                    // Cancel={() => {
                    //     setShowTxns(false);
                    // }}
                ></ShowTransactions>
            )}
        </div>
    );
};

const ShowTransactions = ({
    txns,
    EditFunc,
}: {
    txns: ITransaction[];
    EditFunc: (obj: ITransaction) => void;
}) => {
    const finalTxns = formatTransactions(txns);

    return (
        <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full h-dvh flex justify-center items-center bg-black/15">
            <div className="flex flex-col bg-white border-2 border-gray-300 dark:border-gray-700 p-6 px-4 rounded-5xl w-full max-w-95/100 ms:max-w-8/10 sm:max-w-7/10 md:max-w-xl lg:max-w-160 gap-2 max-h-9/10">
                <h2 className="text-2xl px-2 text-primary font-bold">
                    Transactions:
                </h2>
                <div className="flex flex-col justify-start items-center w-full overflow-auto px-2">
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
        </div>
    );
};

const HistoryModal = ({
    Cancel,
    History,
    hexColor,
    EditFunc,
}: {
    Cancel: () => void;
    hexColor: string;
    History: HistoryBud[];
    EditFunc: (obj: ITransaction) => void;
}) => {
    const { user } = useAuth();
    return (
        <div>
            <ViewModal
                title="Budget History"
                Cancel={Cancel}
                showDelete={false}
                showUpdate={false}
                children={
                    <>
                        <div className="flex flex-col justify-center items-center w-full gap-2">
                            {History.map((bud, idx) => (
                                <HistoryCard
                                    bud={bud}
                                    idx={idx}
                                    currencySymbol={
                                        user?.currency ?? "$"
                                    }
                                    dP={user!.decimalPrecision!}
                                    hexColor={hexColor}
                                    EditFunc={EditFunc}
                                ></HistoryCard>
                            ))} 
                        </div>
                    </>
                }
            ></ViewModal>
        </div>
    );
};

export default HistoryModal;
