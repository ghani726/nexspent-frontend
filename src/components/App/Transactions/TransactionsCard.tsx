import { Triangle } from "lucide-react";
import useData from "../../../hooks/Data";
import type { ITransaction } from "@/types/transaction";
import type { ICategory } from "@/types/category";
import type { IabgObj, IColor } from "@/types/common";
import colors from "@/utils/color";

interface Int extends ITransaction {
    obj: ITransaction;
    EditFunc?: (data: ITransaction) => void;
}

const TransactionsCard = ({
    title,
    amount,
    type,
    obj,
    category = "",
    account = "",
    goal = "",
    budget = "",
    EditFunc,
    // DeleteFunc = null,
    // MergeFunc=null,
    icon = "",
    bgColor = "",
}: Int) => {
    const { categories, accounts, budgets, goals } = useData();
    
    // Category
    let currentColor = null;
    let foundCategory: null | ICategory = null;
    if (category) {
        foundCategory = categories?.filter(
            (e: ICategory) => e._id === category,
        )[0];
        currentColor = colors.find(
            (e: IColor) => e.name === foundCategory?.bgColor,
        );
        icon = foundCategory?.icon;
    } else if(bgColor){
        currentColor = colors.filter((e)=> e.name === bgColor)[0]
    }
    
    // Account

    const foundAccount = accounts?.filter((e) => e._id === account)[0];

    const currency = foundAccount?.currency;

    // Budget

    let foundBudget: IabgObj | null = null;

    if (budget) {
        foundBudget = budgets?.filter((e) => e._id === budget)[0];
    }

    // Goals

    let foundGoal: IabgObj | null = null;

    if (goal) {
        foundGoal = goals?.filter((e) => e._id === goal)[0];
    }

    const handleEdit = () => {
        EditFunc?.({
            title: title,
            description: obj.description,
            category: obj.category,
            date: obj.date,
            account: account,
            amount: amount,
            bgColor: bgColor,
            icon: icon,
            type: type,
            _id: obj._id,
        });
    };
    
    return (
        <div
            onClick={() => handleEdit()}
            className={`w-full starting:translate-y-full animate-fade-in flex rounded-5xl justify-between items-center bg-surface dark:bg-gray-800 shadow-medium p-2 duration-300 hover:scale-[1.02] cursor-pointer active:scale-99 hover:shadow-large animate-scroll-card`}
        >
            <div className={`flex justify-center items-center gap-2`}>
                <div
                    className={`h-full p-2 aspect-square ${currentColor?.color} rounded-full flex justify-center items-center text-2xl`}
                >
                    {icon}
                </div>
                <div
                    className={`flex flex-col justify-between items-start gap-1`}
                >
                    <h3 className={`text-lg -my-1 font-medium line-clamp-1 wrap-anywhere`}>
                        {title || foundCategory?.name}
                    </h3>
                    {type !== "transfer" &&<div className="flex justify-start items-center gap-2 pr-2">
                        <span
                            className={`${colors.find((e: IColor) => e.name === foundAccount?.bgColor)?.color} ${foundAccount?.bgColor === "White" ? "text-black" : "text-white"} line-clamp-1 wrap-anywhere text-xs p-1 px-2 rounded-full`}
                        >
                            {foundAccount?.name}
                        </span>
                        {foundBudget && (
                            <span
                                className={`${colors.find((e: IColor) => e.name === foundBudget?.bgColor)?.color} ${foundBudget?.bgColor === "White" ? "text-black" : "text-white"} line-clamp-1 wrap-anywhere text-xs p-1 px-2 rounded-full`}
                            >
                                {foundBudget?.name}
                            </span>
                        )}
                        {foundGoal && (
                            <span
                                className={`${colors.find((e: IColor) => e.name === foundGoal?.bgColor)?.color} ${foundGoal?.bgColor === "White" ? "text-black" : "text-white"} line-clamp-1 wrap-anywhere text-xs p-1 px-2 rounded-full`}
                            >
                                {foundGoal?.name}
                            </span>
                        )}
                        
                    </div>}
                </div>
            </div>
            <div
                className={`flex ${type === "income" ? "text-primary" : "text-red-500"} gap-1 justify-center items-center font-bold pr-2`}
            >
                {currency?.symbol}
                {amount}
                <Triangle
                    className={`${type === "expense" ? "rotate-180" : "rotate-0"}`}
                    size={14}
                    fill="currentColor"
                ></Triangle>
            </div>
        </div>
    );
};

export default TransactionsCard;
