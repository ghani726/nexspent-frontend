import { Merge, Triangle } from "lucide-react";
import colors from "@/utils/color";

import type { IAccount } from "@/types/account";
import useAuth from "@/hooks/Auth";
import useData from "@/hooks/Data";

interface CardProps {
    obj: IAccount;
    ViewFunc: (value: IAccount) => void;
    MergeFunc: (_id: string, name: string) => void;
}
const AccountCard = ({ obj, ViewFunc, MergeFunc }: CardProps) => {
    const { user } = useAuth();
    const { accounts, transactions } = useData();
    const bgColors = colors
        .filter((e) => e.name === obj.bgColor)[0]
        .color.split("[")[1]
        .slice(0, -1); //Obtain the color code

    const transacts = transactions.filter(
        (e) =>
            e.account === obj._id ||
            e.fromAccount === obj._id ||
            e.toAccount === obj._id,
    );

    const showActionButtons = () => {
        const MergeButton = () => {
            return (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        MergeFunc(obj._id!, obj.name);
                    }}
                    title="Merge Account"
                    className="text-blue-500 p-1.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900 cursor-pointer"
                >
                    <Merge size={20}></Merge>
                </button>
            );
        };

        if (accounts.length > 1) return <MergeButton></MergeButton>;
    };
    return (
        <div
            style={{ borderColor: bgColors }}
            onClick={() => ViewFunc(obj)}
            className={`flex starting:translate-y-full animate-fade-in  cursor-pointer hover:shadow-medium hover:scale-[1.02] border border-gray-200 dark:border-gray-700 duration-300 ease-in-out active:scale-99 shrink-0 items-center p-3 px-6 justify-between -space-y-1 w-full bg-surface dark:bg-gray-800 rounded-full border-x-6`}
        >
            <div className="flex flex-col -space-y-1">
                <h3 className="font-bold text-[22px] -my-1.3 mr-7 line-clamp-1 wrap-anywhere">
                    {obj.name}
                </h3>
                <p
                    className={`${obj.balance === 0 ? "text-black dark:text-white" : obj.balance && obj.balance < 0 ? "text-red-500" : "text-primary"} flex justify-start items-center gap-1 font-medium`}
                >
                    {obj.balance! < 0
                        ? `-${user?.currency}${parseFloat(Math.abs(obj.balance!).toFixed(user?.decimalPrecision)).toLocaleString()}`
                        : `${user?.currency}
                        ${parseFloat(obj.balance!.toFixed(user?.decimalPrecision)).toLocaleString()}`}{" "}
                    {!obj.balance ? null : obj.balance > 0 ? (
                        <Triangle
                            className=""
                            fill="currentColor"
                            size={14}
                        ></Triangle>
                    ) : (
                        <Triangle
                            className="rotate-180"
                            fill="currentColor"
                            size={14}
                        ></Triangle>
                    )}{" "}
                </p>

                <p
                    style={{ color: bgColors }}
                    className={`text-xs flex justify-start items-center gap-1 text-shadow-2xs`}
                >
                    {transacts.length}{" "}
                    {transacts.length === 1 ? "transaction" : "transactions"}
                </p>
            </div>
            <div className="flex justify-center items-center">
                {showActionButtons()}
            </div>
        </div>
    );
};

export default AccountCard;
