import useAuth from "@/hooks/Auth";
import useData from "@/hooks/Data";
import { IGoal } from "@/types/goal";
import colors from "@/utils/color";
import dayjs from "dayjs";
// import { Edit, Trash2 } from "lucide-react";

interface CardProps {
    obj: IGoal;
    ViewFunc: (obj: IGoal) => void;
}

const GoalCard = ({ obj, ViewFunc }: CardProps) => {
    const currentColor = colors.find((e) => e.name === obj.bgColor);

    const handleEdit = () => {
        ViewFunc?.({
            status: obj.status,
            title: obj.title,
            goalAmount: obj.goalAmount,
            savedAmount: obj.savedAmount,
            startDate: obj.startDate,
            endDate: obj.endDate,
            bgColor: obj.bgColor,
            icon: obj.icon,
            _id: obj._id,
        });
    };

    // const showActionButtons = () => {
    //     const EditButton = () => {
    //         return (
    //             <button
    //                 onClick={(e) => {
    //                     e.stopPropagation();
    //                     handleEdit();
    //                 }}
    //                 title="Edit Category"
    //                 className="text-primary	 p-1.5 rounded-full hover:bg-secondary/50 cursor-pointer"
    //             >
    //                 <Edit size={20}></Edit>
    //             </button>
    //         );
    //     };

    //     const DeleteButton = () => {
    //         return (
    //             <button
    //                 onClick={(e) => {
    //                     e.stopPropagation();
    //                     DeleteFunc(obj._id ?? "");
    //                 }}
    //                 title="Delete"
    //                 className="text-red-500 p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-950 cursor-pointer"
    //             >
    //                 <Trash2 size={20}></Trash2>
    //             </button>
    //         );
    //     };

    //     return (
    //         <>
    //             <EditButton></EditButton>
    //             <DeleteButton></DeleteButton>
    //         </>
    //     );
    // };

    const { user } = useAuth();
    const { transactions } = useData();
    const start = dayjs(obj.startDate);
    const end = dayjs(obj.endDate);

    const diff = end.diff(start, "days");

    const amount = parseFloat(
        ((obj.goalAmount - obj.savedAmount!) / diff).toFixed(
            user?.decimalPrecision,
        ),
    );

    const transacts = transactions.filter((txn) => txn.goal === obj._id);

    const progress = (obj.savedAmount! / obj.goalAmount) * 100;
    return (
        <div
            onClick={handleEdit}
            className={`w-full starting:translate-y-full animate-fade-in flex flex-col rounded-3xl justify-between items-center bg-surface dark:bg-gray-800 hover:shadow-medium border border-gray-200 dark:border-gray-700 p-6 duration-300 hover:scale-[1.02] cursor-pointer active:scale-99 animate-scroll-card gap-1`}
        >
            {/* <div className={`flex justify-center items-center gap-2`}>
                <div
                    className={`h-full p-2 aspect-square ${currentColor?.color} rounded-full flex justify-center items-center text-3xl`}
                >
                    {obj.icon}
                </div>
                <div className={`flex flex-col justify-center items-start`}>
                    <h3
                        className={`text-[22px] -my-1.5 font-bold line-clamp-1 break-all`}
                    >
                        {obj.title}
                    </h3>
                    <p className={`text-xs text-gray-600`}>
                        
                    </p>
                    <p className={`text-xs text-gray-600`}>
                        {transactions?.length}{" "}
                        {transactions?.length === 1
                            ? "transaction"
                            : "transactions"}
                    </p>
                </div>
            </div>
            <div className={`flex justify-center items-center pr-2`}>
                {showActionButtons()}
            </div> */}
            <div className="w-full flex justify-between items-start">
                <div className="flex flex-col">
                    <h3 className={`text-2xl font-bold line-clamp-1 break-all`}>
                        {obj.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {obj.status === "active" || obj.status === "pending"
                            ? `${user?.currency}
                        ${amount}/day for ${diff} days`
                            : obj.status === "failed"
                              ? "Failed"
                              : "Completed"}
                    </p>
                </div>
                <div
                    className={`h-full p-2 aspect-square ${currentColor?.color} rounded-full flex justify-center items-center text-3xl`}
                >
                    {obj.icon}
                </div>
            </div>
            <div className="flex justify-between items-center w-full">
                <p className={`text-sm text-gray-600 dark:text-gray-400`}>
                    {transacts?.length}{" "}
                    {transacts?.length === 1 ? "transaction" : "transactions"}
                </p>
                <div className="flex justify-between gap-1 items-end">
                    <h4 className="text-xl font-bold">
                        {user?.currency}
                        {parseFloat(
                            obj.savedAmount!.toFixed(user?.decimalPrecision),
                        ).toLocaleString()}
                    </h4>
                    <p className="flex items-end text-gray-600">
                        / {user?.currency}
                        {parseFloat(
                            obj.goalAmount.toFixed(user?.decimalPrecision),
                        ).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
                <div className="flex shrink-0 flex-col justify-center items-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        {start.format("MMM DD")}
                    </p>
                    {start.year() !== end.year() && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {start.year()}
                        </p>
                    )}
                </div>
                <div
                    className={`w-full h-4 rounded-full bg-emerald-100 dark:bg-gray-700 relative`}
                >
                    <div
                        style={{ width: `${progress}%` }}
                        className={`h-full rounded-full ${currentColor?.color} absolute left-0 top-0`}
                    ></div>
                    <div
                        className={`absolute -top-1/4 left-1/2 -translate-x-1/2 -bottom-1/4 text-xs ${currentColor?.color} p-2 rounded-full flex justify-center items-center text-white px-3 border-2 border-black font-bold`}
                    >
                        {obj.status === "failed"
                            ? "Failed"
                            : `${parseFloat(
                                  progress.toFixed(user?.decimalPrecision),
                              )}%`}
                        
                    </div>
                </div>
                <div className="flex shrink-0 flex-col justify-center items-center">
                    <p className="text-xs text-gray-400">
                        {end.format("MMM DD")}
                    </p>
                    {start.year() !== end.year() && (
                        <p className="text-xs text-gray-400">{end.year()}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoalCard;
