import dayjs from "dayjs";
import useData from "../../../hooks/Data";
import relativeTime from "dayjs/plugin/relativeTime"
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

    const foundAccount = accounts?.filter((e) => e._id === account)[0]
    
    const currency = foundAccount?.currency

    // Budget

    let foundBudget = null

    if(budget){
        foundBudget = budgets?.filter(e => e._id === budget)
    }

    // Goals

    let foundGoals = null

    if(budget){
        foundGoals = budgets?.filter(e => e._id === budget)
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
            className={`w-full starting:translate-y-full animate-fade-in flex rounded-full justify-between items-center bg-surface dark:bg-gray-800 shadow-medium p-2 duration-300 hover:scale-[1.02] cursor-pointer active:scale-99 hover:shadow-large animate-scroll-card`}
        >
            <div className={`flex justify-center items-center gap-2`}>
                <div
                    className={`h-full p-2 pb-3 aspect-square ${currentColor?.color} rounded-full flex justify-center items-center text-xl`}
                >
                    {icon}
                </div>
                <div className={`flex flex-col justify-center items-start`}>
                    <h3 className={`text-xl -my-1.5 font-bold`}>{title}</h3>
                    <div className="flex justify-start items-center"></div>
                </div>
            </div>
            <div className={`flex justify-center items-center pr-2`}>
                {currency?.symbol}
                {amount}
            </div>
        </div>
    );
};

export default TransactionsCard;
