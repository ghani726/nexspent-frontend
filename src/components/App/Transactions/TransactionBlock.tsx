import TransactionsCard from "@/components/App/Transactions/TransactionsCard";
import { IFinalTxn, ITransaction } from "@/types/transaction";
import { formatTxnDate } from "@/utils/transaction";
import React from "react";

const TransactionBlock = ({
    obj,
    EditFunc,
}: {
    obj: IFinalTxn;
    EditFunc: (obj: ITransaction) => void;
}) => {
    return (
        <div className="flex starting:translate-y-full animate-slide-in-up flex-col justify-between items-start w-full gap-2 pb-2">
            <h4 className="ml-2 text-gray-600">{formatTxnDate(obj.date)}</h4>
            <div className="flex flex-col w-full justify-between items-center gap-2">
                {obj.trasactions.map((obj) => {
                    return (
                        <TransactionsCard
                            obj={obj!}
                            key={obj?._id}
                            EditFunc={EditFunc}
                        ></TransactionsCard>
                    );
                })}
            </div>
        </div>
    );
};

export default TransactionBlock;
