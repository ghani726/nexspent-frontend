import useAuth from "@/hooks/Auth";
import { IBudget } from "@/types/budget";
import { CalculateTxnsFromBudget } from "@/utils/budget";

// import { Edit, Trash2 } from "lucide-react";

interface CardProps {
    obj: IBudget;
    ViewFunc: (obj: IBudget) => void;
}

const BudgetCard = ({ obj, ViewFunc }: CardProps) => {
    // 1. Pass data to view modal
    const handleEdit = () => {
        ViewFunc?.({
            _id: obj._id,
            type: obj.type,
            title: obj.title,
            amount: obj.amount,
            bgColor: obj.bgColor,

            // One-Time
            startDate: obj?.startDate,
            endDate: obj?.endDate,

            // Auto-Repeat
            cycleType: obj?.cycleType,
            cycleMonthly: obj.cycleMonthly,
            cycleWeekly: obj.cycleWeekly,
            cycleYearly: obj.cycleYearly,
        });
    };

    // 2. Get Global Data
    const { user } = useAuth();

    // 3. Obtain necessary things from the utility
    const { hexColor, spentAmount, progress, start, end, spendingText } =
        CalculateTxnsFromBudget(obj);

    return (
        <div
            onClick={handleEdit}
            className={`w-full starting:translate-y-full animate-fade-in flex flex-col rounded-3xl justify-between items-center bg-surface dark:bg-gray-800 hover:shadow-medium border border-gray-200 dark:border-gray-700 duration-300 hover:scale-[1.02] cursor-pointer active:scale-99 animate-scroll-card gap-1 overflow-hidden`}
        >
            <div
                style={{
                    backgroundColor: `color-mix(in srgb, ${hexColor} 50%, transparent)`,
                }}
                className={`w-full flex justify-between items-start p-4 px-6 flex-col gap-1`}
            >
                <h3 className={`text-2xl font-bold line-clamp-1 break-all`}>
                    {obj.title}
                </h3>

                <div className="flex justify-between gap-1 items-center">
                    <h4 className="text-lg font-bold flex items-end leading-none">
                        {user?.currency}
                        {parseFloat(spentAmount.toFixed(user?.decimalPrecision)).toLocaleString()}
                    </h4>
                    <p className="flex text-sm items-end text-gray-700 dark:text-gray-200 leading-none">
                        spent of {user?.currency}
                        {parseFloat(obj.amount.toFixed(user?.decimalPrecision)).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center w-full gap-4 px-6 p-4">
                <div className="flex shrink-0 flex-col justify-center items-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        {start?.format("ddd, MMM DD")}
                    </p>
                    {start?.year() !== end?.year() && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {start?.year()}
                        </p>
                    )}
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
                        className={`absolute left-1/2 -translate-x-1/2 text-xs rounded-full flex justify-center px-3 ${progress > 0 ? "text-white text-shadow-sm text-shadow-black/50" : "text-gray-700 dark:text-gray-300"} items-center font-medium`}
                    >
                        {parseFloat(progress.toFixed(user?.decimalPrecision))}%
                    </div>
                </div>
                <div className="flex shrink-0 flex-col justify-center items-center">
                    <p className="text-xs text-gray-400">
                        {end?.format("ddd, MMM DD")}
                    </p>
                    {start?.year() !== end?.year() && (
                        <p className="text-xs text-gray-400">{end?.year()}</p>
                    )}
                </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 pt-0 px-6 pb-4">
                {progress > 100
                    ? `You have over spent ${user?.currency}${parseFloat((spentAmount - obj.amount).toFixed(user?.decimalPrecision))}`
                    : spendingText}
            </p>
        </div>
    );
};

export default BudgetCard;
