import { Triangle } from "lucide-react";
import useData from "../../../hooks/Data";
import type { ITransaction } from "@/types/transaction";
import type { ICategory } from "@/types/category";
import type { IColor } from "@/types/common";
import colors from "@/utils/color";
import { IGoal } from "@/types/goal";
import { IBudget } from "@/types/budget";

interface Int {
    obj: ITransaction;
    EditFunc?: (data: ITransaction) => void;
}

const TransactionsCard = ({
    // title,
    // amount,
    // type,
    obj,
    // category = "",
    // account = "",
    // goal = "",
    // budget = "",
    EditFunc,
    // DeleteFunc = null,
    // MergeFunc=null,
    // icon = "",
    // bgColor = "",
}: Int) => {
    const { categories, accounts, budgets, goals } = useData();

    let icon: string | undefined = obj?.icon;
    let bgColor: string | undefined = obj?.bgColor;
    // Category
    let currentColor = null;
    let foundCategory: null | ICategory = null;
    if (obj?.category) {
        foundCategory = categories?.filter(
            (e: ICategory) => e._id === obj.category,
        )[0];
        currentColor = colors.find(
            (e: IColor) => e.name === foundCategory?.bgColor,
        );
        icon = foundCategory?.icon;
        bgColor = foundCategory?.bgColor;
    } else if (obj?.bgColor) {
        currentColor = colors.filter((e) => e.name === obj.bgColor)[0];
    }

    // Account

    const foundAccount = accounts?.filter((e) => e._id === obj?.account)[0];

    const currency = foundAccount?.currency;

    // Budget

    let foundBudget: IBudget | null = null;

    if (obj?.budget) {
        foundBudget = budgets?.filter((e) => e._id === obj?.budget)[0];
    }

    // Goals

    let foundGoal: IGoal | null = null;

    if (obj?.goal) {
        foundGoal = goals?.filter((e) => e._id === obj?.goal)[0];
    }

    const handleEdit = () => {
        EditFunc?.({
            title: obj?.title,
            description: obj?.description,
            category: obj?.category,
            date: obj?.date,
            goal: obj?.goal,
            budget: obj?.budget,
            account: obj?.account,
            amount: obj?.amount,
            bgColor: obj?.bgColor || bgColor,
            icon: icon || obj?.icon,
            type: obj?.type,
            _id: obj?._id,
        });
    };

    return (
        <div
            onClick={() => handleEdit()}
            className={`w-full starting:translate-y-full animate-fade-in flex rounded-5xl justify-between items-center bg-surface dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 duration-300 hover:scale-[1.02] cursor-pointer active:scale-99 hover:shadow-medium animate-scroll-card`}
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
                    <h3
                        className={`text-lg -my-1 font-medium line-clamp-1 wrap-anywhere`}
                    >
                        {obj?.title || foundCategory?.name}
                    </h3>
                    {obj?.type !== "transfer" && (
                        <div className="flex justify-start items-center gap-2 pr-2">
                            <span
                                className={`${colors.find((e: IColor) => e.name === foundAccount?.bgColor)?.color} ${foundAccount?.bgColor === "White" ? "text-black" : "text-white"} line-clamp-1 wrap-anywhere text-xs p-1 px-2 rounded-full`}
                            >
                                {foundAccount?.name}
                            </span>
                            {foundBudget && (
                                <span
                                    className={`${colors.find((e: IColor) => e.name === foundBudget?.bgColor)?.color} ${foundBudget?.bgColor === "White" ? "text-black" : "text-white"} line-clamp-1 wrap-anywhere text-xs p-1 px-2 rounded-full`}
                                >
                                    {foundBudget?.title}
                                </span>
                            )}
                            {foundGoal && (
                                <span
                                    className={`${colors.find((e: IColor) => e.name === foundGoal?.bgColor)?.color} ${foundGoal?.bgColor === "White" ? "text-black" : "text-white"} line-clamp-1 wrap-anywhere text-xs p-1 px-2 rounded-full`}
                                >
                                    {foundGoal?.title}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div
                className={`flex ${obj?.type === "income" ? "text-primary" : "text-red-500"} gap-1 justify-center items-center font-bold pr-2`}
            >
                {currency?.symbol}
                {obj?.amount}
                <Triangle
                    className={`${obj?.type === "expense" ? "rotate-180" : "rotate-0"}`}
                    size={14}
                    fill="currentColor"
                ></Triangle>
            </div>
        </div>
    );
};

export default TransactionsCard;
