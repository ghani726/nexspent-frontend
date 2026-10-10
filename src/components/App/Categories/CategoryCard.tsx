import { ICategory } from "@/types/category";
import { ITransaction } from "@/types/transaction";
import colors from "@/utils/color";
import { Merge } from "lucide-react";

interface CardProps extends ICategory {
    obj: ICategory;
    transactions: ITransaction[];
    totalCategories: {
        incomeCategories: ICategory[];
        expenseCategories: ICategory[];
    };
    ViewFunc: (obj: ICategory) => void;
    MergeFunc: (_id: string, name: string) => void;
}

const CategoryCard = ({
    transactions,
    obj,
    ViewFunc,
    MergeFunc,
    totalCategories,
}: CardProps) => {
    const currentColor = colors.find((e) => e.name === obj.bgColor);

    const showActionButtons = () => {
        const MergeButton = () => {
            return (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        MergeFunc(obj._id ?? "", obj.name);
                    }}
                    title="Merge Category"
                    className="text-blue-500 p-1.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900 cursor-pointer"
                >
                    <Merge size={20}></Merge>
                </button>
            );
        };
        if (
            (obj.categoryType === "expense" &&
                totalCategories?.expenseCategories?.length > 1) ||
            (obj.categoryType === "income" &&
                totalCategories?.incomeCategories?.length > 1)
        ) {
            return <MergeButton></MergeButton>;
        }
    };
    return (
        <div
            onClick={() => ViewFunc(obj)}
            className={`w-full starting:translate-y-full animate-fade-in flex rounded-full justify-between items-center bg-surface dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 duration-300 hover:scale-[1.02] cursor-pointer active:scale-99 hover:shadow-medium animate-scroll-card`}
        >
            <div className={`flex justify-center items-center gap-2`}>
                <div
                    className={`h-full p-2 pb-3 aspect-square ${currentColor?.color} rounded-full flex justify-center items-center text-3xl`}
                >
                    {obj.icon}
                </div>
                <div className={`flex flex-col justify-center items-start`}>
                    <h3
                        className={`text-[22px] -my-1.5 font-bold line-clamp-1 break-all`}
                    >
                        {obj.name}
                    </h3>
                    <p className={`text-xs text-gray-600`}>
                        {obj.categoryType?.[0].toUpperCase() +
                            obj.categoryType?.slice(1)}
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
            </div>
        </div>
    );
};

export default CategoryCard;
