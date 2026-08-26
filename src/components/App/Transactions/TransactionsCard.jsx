import { Triangle } from "lucide-react";
import useData from "../../../hooks/Data";

const TransactionsCard = ({
    title,
    amount,
    transactionType,
    obj,
    category = null,
    account = null,
    goal = null,
    budget = null,
    EditFunc = null,
    // DeleteFunc = null,
    // MergeFunc=null,
    icon = null,
    bgColor = null,
}) => {
    const { colors, categories, accounts, budgets, goals } = useData();

    // Category
    let currentColor = null;
    if (category) {
        const foundCategory = categories?.filter((e) => e._id === category)[0];
        currentColor = colors.find((e) => e.name === foundCategory?.bgColor);
        icon = foundCategory?.icon;
    }

    // Account

    const foundAccount = accounts?.filter((e) => e._id === account)[0];

    const currency = foundAccount?.currency;

    // Budget

    let foundBudget = null;

    if (budget) {
        foundBudget = budgets?.filter((e) => e._id === budget);
    }

    // Goals

    let foundGoal = null;

    if (budget) {
        foundGoal =  goals?.filter((e) => e._id === goal);
    }

    const handleEdit = () => {
        EditFunc?.({
            title,
            bgColor,
            icon,
            categoryID: obj._id,
        });
    };

    return (
        <div
            className={`w-full starting:translate-y-full animate-fade-in flex rounded-5xl justify-between items-center bg-surface dark:bg-gray-800 shadow-medium p-2 duration-300 hover:scale-[1.02] cursor-pointer active:scale-99 hover:shadow-large animate-scroll-card`}
        >
            <div className={`flex justify-center items-center gap-2`}>
                <div
                    className={`h-full p-2 pb-3 aspect-square ${currentColor?.color} rounded-full flex justify-center items-center text-2xl`}
                >
                    {icon}
                </div>
                <div
                    className={`flex flex-col justify-center items-start gap-1`}
                >
                    <h3 className={`text-lg -my-1 font-medium line-clamp-1`}>{title}</h3>
                    <div className="flex justify-start items-center">
                        <span
                            className={`${colors.find((e) => e.name === foundAccount?.bgColor)?.color} ${foundAccount?.bgColor === "White" ? "text-black": "text-white"} text-xs p-1 px-2 rounded-full`}
                        >
                            {foundAccount?.name}
                        </span>
                        {foundBudget && <span
                            className={`${colors.find((e) => e.name === foundBudget?.bgColor)?.color} ${foundBudget?.bgColor === "White" ? "text-black": "text-white"} text-xs p-1 px-2 rounded-full`}
                        >
                            {foundBudget?.name}
                        </span>}
                        {foundGoal && <span
                            className={`${colors.find((e) => e.name === foundGoal?.bgColor)?.color} ${foundGoal?.bgColor === "White" ? "text-black": "text-white"} text-xs p-1 px-2 rounded-full`}
                        >
                            {foundGoal?.name}
                        </span>}
                    </div>
                </div>
            </div>
            <div
                className={`flex ${transactionType === "income" ? "text-primary" : "text-red-500"} gap-1 justify-center items-center font-bold pr-2`}
            >
                {currency?.symbol}
                {amount}
                <Triangle className={`${transactionType === "expense"  ? "rotate-180": "rotate-0"}`} size={14} fill="currentColor"></Triangle>
            </div>
        </div>
    );
};

export default TransactionsCard;
