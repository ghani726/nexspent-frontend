import { IFinalTxn, ITransaction } from "@/types/transaction";
import dayjs from "dayjs";

export const formatTransactions = (transactions: ITransaction[]) => {
    const finalTxns: IFinalTxn[] = [];

    for (const txn of transactions) {
        const date = dayjs(txn.date).startOf("day").toISOString();

        const foundDate = finalTxns.filter((e) => e.date === date);
        if (foundDate.length > 0) continue;

        const filteredTnxsOfThisDate = transactions.filter((e) => {
            const dt = dayjs(e.date).startOf("day").toISOString();
            if (dt === date) return e;
        });

        
        if (!filteredTnxsOfThisDate.length) {
            continue
        }

        finalTxns.push({
            date: date,
            trasactions: filteredTnxsOfThisDate,
        });
    }
    
    return finalTxns.reverse();
};

export const formatTxnDate = (e: string) => {
    const d = dayjs(e);
    if (d.isSame(dayjs(), "day")) return "Today";
    if (d.isSame(dayjs().add(1, "day"), "day")) return "Tomomorow";
    if (d.isSame(dayjs().subtract(1, "day"), "day")) return "Yesterday";
    return d.format("dddd, MMM D, YYYY");
};
