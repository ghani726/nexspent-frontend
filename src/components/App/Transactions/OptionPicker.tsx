import React from "react";
import useData from "../../../hooks/Data";

interface Props {
    slider: number;
    selectedAccount: string;
    setSelectedAccount: (data: string) => void;
    selectedAccountTo: string;
    setSelectedAccountTo: (data: string) => void;
    selectedBudget: string;
    setSelectedBudget: (data: string) => void;
    selectedGoal: string;
    setSelectedGoal: (data: string) => void;
}

const OptionPicker = ({
    slider,
    selectedAccount,
    setSelectedAccount,
    selectedAccountTo,
    setSelectedAccountTo,
    selectedBudget,
    setSelectedBudget,
    selectedGoal,
    setSelectedGoal,
}: Props) => {
    const {
        accounts,
        budgets,
        goals,
        colors,
    }: {
        accounts: abgObj[];
        budgets: abgObj[];
        goals: abgObj[];
        colors: Color[];
    } = useData();

    interface Color {
        name: string;
        color: string;
    }

    interface abgObj {
        _id: string;
        name: string;
        bgColor: string;
    }

    return (
        <div className="flex flex-col w-full p-5 items-start justify-start bg-app dark:bg-gray-800 shadow-sm rounded-3xl gap-3 overflow-hidden">
            {/* Account Row */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden">
                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                    {slider == 2 ? "From Account" : "Account"}:
                </h4>
                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                    {accounts?.map((acc: abgObj) => (
                        <label
                            key={acc?._id}
                            className="relative cursor-pointer flex shrink-0 p-1"
                        >
                            <input
                                type="radio"
                                name="account"
                                className="hidden peer"
                                value={acc?._id}
                                checked={selectedAccount === acc?._id}
                                onChange={() => {
                                    setSelectedAccount(acc._id);

                                    const filtered: abgObj[] = accounts.filter(
                                        (e: abgObj) => e._id !== acc._id,
                                    );

                                    // If it is already select and was not filtered out, let it be, else select the first one.
                                    if (
                                        filtered.some(
                                            (e: abgObj) =>
                                                e._id === selectedAccountTo,
                                        )
                                    )
                                        return;
                                    setSelectedAccountTo(filtered[0]._id);
                                }}
                            />
                            <span
                                className={`${colors.find((e: Color) => e.name === acc?.bgColor)?.color || "bg-gray-200"} ${acc?.bgColor === "White" ? "text-black" : "text-white"} text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                            >
                                {acc?.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Budgets and Goals */}
            {!slider && (
                <>
                    {/* Budget Row */}
                    {budgets?.length > 0 && !selectedGoal && (
                        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden border-t border-gray-100 dark:border-gray-700/50 pt-3">
                            <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 shrink-0 min-w-25">
                                Budget:
                            </h4>
                            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                <label className="relative cursor-pointer flex shrink-0 p-1">
                                    <input
                                        type="radio"
                                        name="budget"
                                        className="hidden peer"
                                        value=""
                                        checked={selectedBudget === ""}
                                        onChange={() => setSelectedBudget("")}
                                    />
                                    <span className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white">
                                        No Budget
                                    </span>
                                </label>
                                {accounts?.map((bud: abgObj) => (
                                    <label
                                        key={bud?._id}
                                        className="relative cursor-pointer flex shrink-0 p-1"
                                    >
                                        <input
                                            type="radio"
                                            name="budget"
                                            className="hidden peer"
                                            value={bud._id}
                                            checked={
                                                selectedBudget === bud?._id
                                            }
                                            onChange={() =>
                                                setSelectedBudget(bud._id)
                                            }
                                        />
                                        <span
                                            className={`${colors.find((e: Color) => e.name === bud?.bgColor)?.color || "bg-gray-200"} ${
                                                bud?.bgColor === "White"
                                                    ? "text-black"
                                                    : "text-white"
                                            } text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            {bud?.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Goal Row */}
                    {goals?.length > 0 && !selectedBudget && (
                        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden border-t border-gray-100 dark:border-gray-700/50 pt-3">
                            <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 shrink-0 min-w-25">
                                Goal:
                            </h4>
                            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                <label className="relative cursor-pointer flex shrink-0 p-1">
                                    <input
                                        type="radio"
                                        name="goal"
                                        className="hidden peer"
                                        value=""
                                        checked={selectedGoal === ""}
                                        onChange={() => setSelectedGoal("")}
                                    />
                                    <span className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white">
                                        No Goal
                                    </span>
                                </label>
                                {accounts?.map((go: abgObj) => (
                                    <label
                                        key={go?._id}
                                        className="relative cursor-pointer flex shrink-0 p-1"
                                    >
                                        <input
                                            type="radio"
                                            name="goal"
                                            className="hidden peer"
                                            value={go._id}
                                            checked={selectedGoal === go?._id}
                                            onChange={() =>
                                                setSelectedGoal(go._id)
                                            }
                                        />
                                        <span
                                            className={`${colors.find((e: Color) => e.name === go?.bgColor)?.color || "bg-gray-200"} ${
                                                go?.bgColor === "White"
                                                    ? "text-black"
                                                    : "text-white"
                                            } text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                        >
                                            {go?.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* To Account */}
            {slider > 1 && (
                <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden">
                    <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                        To Account:
                    </h4>
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                        {accounts
                            .filter((e: abgObj) => e._id !== selectedAccount)
                            .map((toObj) => (
                                <label
                                    key={toObj?._id}
                                    className="relative cursor-pointer flex shrink-0 p-1"
                                >
                                    <input
                                        type="radio"
                                        name="goal"
                                        className="hidden peer"
                                        value={toObj._id}
                                        checked={
                                            selectedAccountTo === toObj?._id
                                        }
                                        onChange={() =>
                                            setSelectedAccountTo(toObj._id)
                                        }
                                    />
                                    <span
                                        className={`${colors.find((e: Color) => e.name === toObj?.bgColor)?.color || "bg-gray-200"} ${
                                            toObj?.bgColor === "White"
                                                ? "text-black"
                                                : "text-white"
                                        } text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                    >
                                        {toObj?.name}
                                    </span>
                                </label>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OptionPicker;
