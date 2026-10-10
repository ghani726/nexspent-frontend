import DatePickerComponent from "@/components/tailgrids/components/DatePicker";
import useData from "@/hooks/Data";
import { IColor } from "@/types/common";
import { ITransaction } from "@/types/transaction";
import colors from "@/utils/color";
import dayjs from "dayjs";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface IMain {
    account: "all" | string;
    category: "all" | string;
    budget: "all" | "none" | string;
    goal: "all" | "none" | string;
    fromAccount: "all" | string;
    toAccount: "all" | string;
    fromDate: string;
    toDate: string;
    // date:
    //     | "This Month"
    //     | "Last Month"
    //     | "This Week"
    //     | "Last Week"
    //     | "Today"
    //     | "Yesterday"
    //     | "All"
    //     | "Custom";
    date: string;
}
const FilterModal = ({
    showModal,
    setShowModal,
    setTransactions,
    slider,
}: {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    setTransactions: (value: ITransaction[]) => void;
    slider: number;
}) => {
    const {transactions} = useData()
    const { accounts, budgets, goals, categories } = useData();

    const dateArray = [
        "All",
        "This Month",
        "Last Month",
        "This Week",
        "Last Week",
        "Today",
        "Yesterday",
        "This Year",
        "Last Year",
        "Custom",
    ];

    const [main, setMain] = useState<IMain>({
        account: "all",
        category: "all",
        budget: "all",
        goal: "all",
        fromAccount: "all",
        toAccount: "all",
        fromDate: new Date().toISOString(),
        toDate: new Date().toISOString(),
        date: "This Month",
    });

    const filterTheTransactions = () => {
        let txns = transactions;
        // Account
        if (main.account !== "all") {
            txns = txns.filter((e) => e?.account === main.account);
        } else if(main.account === "all"){
            txns = txns.filter((e) => e?.account); 
        }

        // Category
        if (main.category !== "all") {
            txns = txns.filter((e) => e?.category === main.category);
        }

        // Goal
        if (main.goal === "none") {
            txns = txns.filter((e) => e.goal === undefined);
        } else if (main.goal !== "all") {
            txns = txns.filter((e) => e?.goal === main.goal);
        }

        // Budget
        if (main.budget === "none") {
            txns = txns.filter((e) => e?.budget === undefined);
        } else if (main.budget !== "all") {
            txns = txns.filter((e) => e?.budget === main.budget);
        }

        // From Account
        if (main.fromAccount === "none") {
            txns = txns.filter((e) => e?.fromAccount === undefined);
        } else if (main.fromAccount !== "all") {
            txns = txns.filter((e) => e?.fromAccount === main.fromAccount);
        }

        // To Account
        if (main.toAccount === "none") {
            txns = txns.filter((e) => e?.toAccount === undefined);
        } else if (main.toAccount !== "all") {
            txns = txns.filter((e) => e?.toAccount === main.toAccount);
        }

        // Date
        if (main.date === "This Month") {
            const now = dayjs();
            txns = txns.filter((e) => {
                const txDate = dayjs(e.date);
                return (
                    txDate.month() === now.month() &&
                    txDate.year() === now.year()
                );
            });
        } else if (main.date === "Last Month") {
            const lastMonth = dayjs().subtract(1, "month");
            txns = txns.filter((e) => {
                const txDate = dayjs(e.date);
                return (
                    txDate.month() === lastMonth.month() &&
                    txDate.year() === lastMonth.year()
                );
            });
        } else if (main.date === "This Week") {
            const now = dayjs();
            const startOfWeek = now.startOf("week");
            const endOfWeek = now.endOf("week");
            txns = txns.filter((e) => {
                const txDate = dayjs(e.date);

                return (
                    (txDate.isAfter(startOfWeek) ||
                        txDate.isSame(startOfWeek)) &&
                    (txDate.isBefore(endOfWeek) || txDate.isSame(endOfWeek))
                );
            });
        } else if (main.date === "Last Week") {
            const lastweek = dayjs().subtract(1, "week");
            const startOfWeek = lastweek.startOf("week");
            const endOfWeek = lastweek.endOf("week");
            txns = txns.filter((e) => {
                const txDate = dayjs(e.date);

                return (
                    (txDate.isAfter(startOfWeek) ||
                        txDate.isSame(startOfWeek)) &&
                    (txDate.isBefore(endOfWeek) || txDate.isSame(endOfWeek))
                );
            });
        } else if (main.date === "Today") {
            const now = dayjs();
            txns = txns.filter((e) => {
                const txDate = dayjs(e.date);
                return (
                    txDate.date() === now.date() &&
                    txDate.month() === now.month() &&
                    txDate.year() === now.year()
                );
            });
        } else if (main.date === "Yesterday") {
            const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
            txns = txns.filter((e) => {
                const txDate = dayjs(e.date).format("YYYY-MM-DD");
                return txDate === yesterday;
            });
        } else if (main.date === "This Year") {
            const now = dayjs();
            txns = txns.filter((e) => {
                const txDate = dayjs(e.date);
                return txDate.year() === now.year();
            });
        } else if (main.date === "Last Year") {
            const lastyear = dayjs().subtract(1, "year");
            txns = txns.filter((e) => {
                const txDate = dayjs(e.date);
                return txDate.year() === lastyear.year();
            });
        } else if (main.date === "Custom") {
            const now = dayjs().format("YYYY-MM-DD");
            const start = dayjs(new Date(main.fromDate)).format("YYYY-MM-DD");
            const end = dayjs(new Date(main.toDate)).format("YYYY-MM-DD");

            if (start > now || end > now)
                return toast.error(
                    "From and To Dates must not be greater than today.",
                );

            txns = txns.filter((e) => {
                const txDate = dayjs(e.date).format("YYYY-MM-DD");
                return txDate >= start && txDate <= end;
            });
        }
        
        setTransactions(txns.reverse());
        setShowModal(false)
    };

    const type =
        slider === 0
            ? "all"
            : slider === 1
              ? "expense"
              : slider === 2
                ? "income"
                : slider === 3
                  ? "transfer"
                  : "all";

    return (
        <div
            onClick={() => setShowModal(false)}
            className={`fixed inset-0 z-10 flex justify-center items-end ms:items-center bg-gray-900/50  backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
                showModal
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex ${showModal ? "translate-y-0" : "translate-y-220"} transition-transform overflow-auto max-h-9/10 ms:rounded-4xl ease-in-out duration-300 flex-col absolute w-full ms:max-w-9/10 md:max-w-2xl gap-4 z-50 border-2 border-transparent dark:border-gray-800 rounded-t-4xl bg-emerald-50 dark:bg-gray-900 shadow-large`}
            >
                <div className="fixed top-0 bg-linear-to-b from-white dark:from-black to-transparent ms:from-transparent dark:ms:from-transparent flex ms:border-none dark:border-emerald-800 justify-between gap-2 p-3 items-center w-full z-10">
                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={() => setShowModal(false)}
                            className="hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-950 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800  p-3 rounded-full cursor-pointer duration-300 ease-in-out shadow-small"
                        >
                            {/* <X></X> */}

                            <ArrowLeft></ArrowLeft>
                        </button>
                        <h2 className="border border-gray-200 dark:border-gray-700  bg-white dark:bg-gray-800 px-6 p-2 rounded-full font-bold text-2xl ms:text-3xl text-primary shadow-small line-clamp-1 wrap-anywhere">
                            Filter Transactions
                        </h2>
                    </div>
                </div>

                <div className="w-full h-full justify-start items-center gap-4 flex flex-col px-4 py-18 ms:px-6 ms:pb-6 overflow-auto">
                    <div
                        className={`gap-1 flex flex-col justify-start items-start flex-wrap w-full rounded-4xl`}
                    >
                        {/* Accounts */}
                        {slider !== 3 && (
                            <>
                                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                                    Account:
                                </h4>

                                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="accountz"
                                            className="hidden peer"
                                            value={"all"}
                                            checked={main.account === "all"}
                                            onChange={() =>
                                                setMain({
                                                    ...main,
                                                    account: "all",
                                                })
                                            }
                                        />
                                        <span
                                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            All
                                        </span>
                                    </label>

                                    {accounts?.map((acc) => (
                                        <label
                                            key={acc?._id}
                                            className="relative cursor-pointer flex shrink-0 p-1"
                                        >
                                            <input
                                                type="radio"
                                                name="accountz"
                                                className="hidden peer"
                                                value={acc?._id}
                                                checked={
                                                    main.account === acc?._id
                                                }
                                                onChange={() =>
                                                    setMain({
                                                        ...main,
                                                        account: acc._id!,
                                                    })
                                                }
                                            />
                                            <span
                                                className={`${colors.find((e: IColor) => e.name === acc?.bgColor)?.color || "bg-emerald-50"} ${acc?.bgColor === "White" ? "text-black" : "text-white"} text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                            >
                                                {acc?.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Categories */}
                        {slider !== 3 && (
                            <>
                                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                                    Category:
                                </h4>

                                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="category"
                                            className="hidden peer"
                                            value={"all"}
                                            checked={main.category === "all"}
                                            onChange={() =>
                                                setMain({
                                                    ...main,
                                                    category: "all",
                                                })
                                            }
                                        />
                                        <span
                                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            All
                                        </span>
                                    </label>

                                    {categories
                                        ?.filter(
                                            (cat) =>
                                                cat.categoryType === type ||
                                                type === "all",
                                        )
                                        .map((cat) => (
                                            <label
                                                key={cat?._id}
                                                className="relative cursor-pointer flex shrink-0 p-1"
                                            >
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    className="hidden peer"
                                                    value={cat?._id}
                                                    checked={
                                                        main.category ===
                                                        cat?._id
                                                    }
                                                    onChange={() =>
                                                        setMain({
                                                            ...main,
                                                            category: cat._id!,
                                                        })
                                                    }
                                                />
                                                <span
                                                    className={`${colors.find((e: IColor) => e.name === cat?.bgColor)?.color || "bg-emerald-50"} ${cat?.bgColor === "White" ? "text-black" : "text-white"} text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                                >
                                                    {cat?.name}
                                                </span>
                                            </label>
                                        ))}
                                </div>
                            </>
                        )}

                        {/* Budgets */}
                        {(slider === 1 || !slider) && (
                            <>
                                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                                    Budget:
                                </h4>

                                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="budgetz"
                                            className="hidden peer"
                                            value={"all"}
                                            checked={main.budget === "all"}
                                            onChange={() =>
                                                setMain({
                                                    ...main,
                                                    budget: "all",
                                                })
                                            }
                                        />
                                        <span
                                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            All
                                        </span>
                                    </label>

                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="budgetz"
                                            className="hidden peer"
                                            value={"none"}
                                            checked={main.budget === "none"}
                                            onChange={() =>
                                                setMain({
                                                    ...main,
                                                    budget: "none",
                                                })
                                            }
                                        />
                                        <span
                                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2  dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            No Budget
                                        </span>
                                    </label>

                                    {budgets.map((bud) => (
                                        <label
                                            key={bud?._id}
                                            className="relative cursor-pointer flex shrink-0 p-1"
                                        >
                                            <input
                                                type="radio"
                                                name="budgetz"
                                                className="hidden peer"
                                                value={bud?._id}
                                                checked={
                                                    main.budget === bud?._id
                                                }
                                                onChange={() =>
                                                    setMain({
                                                        ...main,
                                                        budget: bud._id!,
                                                    })
                                                }
                                            />
                                            <span
                                                className={`${colors.find((e: IColor) => e.name === bud?.bgColor)?.color || "bg-emerald-50"} ${bud?.bgColor === "White" ? "text-black" : "text-white"} text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                            >
                                                {bud?.title}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Goals */}
                        {(slider === 1 || !slider) && (
                            <>
                                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                                    Goal:
                                </h4>

                                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="goalz"
                                            className="hidden peer"
                                            value={"all"}
                                            checked={main.goal === "all"}
                                            onChange={() =>
                                                setMain({
                                                    ...main,
                                                    goal: "all",
                                                })
                                            }
                                        />
                                        <span
                                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            All
                                        </span>
                                    </label>

                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="goalz"
                                            className="hidden peer"
                                            value={"none"}
                                            checked={main.goal === "none"}
                                            onChange={() =>
                                                setMain({
                                                    ...main,
                                                    goal: "none",
                                                })
                                            }
                                        />
                                        <span
                                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2  dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            No Goal
                                        </span>
                                    </label>

                                    {goals.map((go) => (
                                        <label
                                            key={go?._id}
                                            className="relative cursor-pointer flex shrink-0 p-1"
                                        >
                                            <input
                                                type="radio"
                                                name="goalz"
                                                className="hidden peer"
                                                value={go?._id}
                                                checked={main.goal === go?._id}
                                                onChange={() =>
                                                    setMain({
                                                        ...main,
                                                        goal: go._id!,
                                                    })
                                                }
                                            />
                                            <span
                                                className={`${colors.find((e: IColor) => e.name === go?.bgColor)?.color || "bg-emerald-50"} ${go?.bgColor === "White" ? "text-black" : "text-white"} text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                            >
                                                {go?.title}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* From Account */}
                        {(slider === 3 || !slider) && (
                            <>
                                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                                    From Account:
                                </h4>

                                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="fromAccountz"
                                            className="hidden peer"
                                            value={"all"}
                                            checked={main.fromAccount === "all"}
                                            onChange={() =>
                                                setMain({
                                                    ...main,
                                                    fromAccount: "all",
                                                })
                                            }
                                        />
                                        <span
                                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            All
                                        </span>
                                    </label>

                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="fromAccountz"
                                            className="hidden peer"
                                            value={"all"}
                                            checked={
                                                main.fromAccount === "none"
                                            }
                                            onChange={() =>
                                                setMain({
                                                    ...main,
                                                    fromAccount: "none",
                                                })
                                            }
                                        />
                                        <span
                                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            No From Account
                                        </span>
                                    </label>

                                    {accounts?.map((acc) => (
                                        <label
                                            key={acc?._id}
                                            className="relative cursor-pointer flex shrink-0 p-1"
                                        >
                                            <input
                                                type="radio"
                                                name="fromAccountz"
                                                className="hidden peer"
                                                value={acc?._id}
                                                checked={
                                                    main.fromAccount ===
                                                    acc?._id
                                                }
                                                onChange={() =>
                                                    setMain({
                                                        ...main,
                                                        fromAccount: acc._id!,
                                                    })
                                                }
                                            />
                                            <span
                                                className={`${colors.find((e: IColor) => e.name === acc?.bgColor)?.color || "bg-emerald-50"} ${acc?.bgColor === "White" ? "text-black" : "text-white"} text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                            >
                                                {acc?.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* To Account */}
                        {(slider === 3 || !slider) && (
                            <>
                                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                                    To Account:
                                </h4>

                                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="toAccountz"
                                            className="hidden peer"
                                            value={"all"}
                                            checked={main.toAccount === "all"}
                                            onChange={() =>
                                                setMain({
                                                    ...main,
                                                    toAccount: "all",
                                                })
                                            }
                                        />
                                        <span
                                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            All
                                        </span>
                                    </label>

                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="toAccountz"
                                            className="hidden peer"
                                            value={"all"}
                                            checked={main.toAccount === "none"}
                                            onChange={() =>
                                                setMain({
                                                    ...main,
                                                    toAccount: "none",
                                                })
                                            }
                                        />
                                        <span
                                            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            No To Account
                                        </span>
                                    </label>

                                    {accounts?.map((acc) => (
                                        <label
                                            key={acc?._id}
                                            className="relative cursor-pointer flex shrink-0 p-1"
                                        >
                                            <input
                                                type="radio"
                                                name="toAccountz"
                                                className="hidden peer"
                                                value={acc?._id}
                                                checked={
                                                    main.toAccount === acc?._id
                                                }
                                                onChange={() =>
                                                    setMain({
                                                        ...main,
                                                        toAccount: acc._id!,
                                                    })
                                                }
                                            />
                                            <span
                                                className={`${colors.find((e: IColor) => e.name === acc?.bgColor)?.color || "bg-emerald-50"} ${acc?.bgColor === "White" ? "text-black" : "text-white"} text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                            >
                                                {acc?.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Date */}

                        <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                            Date:
                        </h4>

                        <div className="flex flex-wrap items-center gap-1.5 w-full pb-1 scrollbar-none ">
                            {dateArray.map((date) => (
                                <label
                                    key={date}
                                    className="relative cursor-pointer flex shrink-0 p-1"
                                >
                                    <input
                                        type="radio"
                                        name="date"
                                        className="hidden peer"
                                        value={date}
                                        checked={main.date === date}
                                        onChange={() =>
                                            setMain({
                                                ...main,
                                                date: date!,
                                            })
                                        }
                                    />
                                    <span
                                        className={`bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                    >
                                        {date}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {main.date === "Custom" && (
                            <div className="w-full bg-white dark:bg-gray-800 flex flex-col justify-center items-center gap-2 py-4 rounded-5xl border border-gray-200 dark:border-gray-700 shadow-small">
                                {/* Date Picker */}
                                <h3 className="font-semibold text-primary text-lg">
                                    From Date
                                </h3>
                                <DatePickerComponent
                                    dt={new Date()}
                                    setDT={(e) =>
                                        setMain((prev) => ({
                                            ...prev,
                                            fromDate: e.toISOString(),
                                        }))
                                    }
                                    maxDate={{
                                        value: 0,
                                        type: "days",
                                    }}
                                ></DatePickerComponent>

                                <ArrowDown></ArrowDown>

                                <h3 className="font-semibold text-primary text-lg">
                                    To Date
                                </h3>
                                <DatePickerComponent
                                    dt={new Date()}
                                    setDT={(e) =>
                                        setMain((prev) => ({
                                            ...prev,
                                            toDate: e.toISOString(),
                                        }))
                                    }
                                    maxDate={{
                                        value: 0,
                                        type: "days",
                                    }}
                                    // minDate={{
                                    //     value: -1,
                                    //     type: "days",
                                    // }}
                                ></DatePickerComponent>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end items-center w-full gap-2 fixed ms:static bottom-0 left-0 p-2 ms:p-6 ms:pt-4 ">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 hidden ms:block disabled:cursor-not-allowed cursor-pointer active:scale-95 py-2 rounded-full bg-white border border-gray-200 dark:border-transparent dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 duration-300 ease-in-out"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={filterTheTransactions}
                        className="flex shadow-medium ms:shadow-none w-full ms:w-fit p-3 ms:px-4 gap-2  justify-center items-center disabled:active:scale-100 disabled:cursor-not-allowed disabled:bg-primary/70 cursor-pointer active:scale-95 ms:py-2 rounded-full bg-primary hover:bg-primary-hover text-white hover:bg-primary-800 duration-300 ease-in-out font-medium ms:font-normal"
                    >
                        Apply Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
