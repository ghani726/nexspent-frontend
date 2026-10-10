import React from "react";
import useData from "../../../hooks/Data";
import colors from "@/utils/color";
import type { IColor } from "@/types/common";

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
    allowedAccount?: string;
    allowedGoal?: {
        type: "Create" | "Update";
        _id: string;
    };
    allowedBudget?: {
        type: "Create" | "Update";
        _id: string;
    };
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
    allowedAccount,
    allowedGoal,
    allowedBudget,
}: Props) => {
    const { accounts, budgets, goals } = useData();

    return (
        <div className="flex shrink-0 flex-col w-full p-5 items-start justify-start bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent rounded-3xl gap-3 overflow-hidden">
            {/* Account Row */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden">
                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                    {slider == 2 ? "From Account" : "Account"}:
                </h4>
                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                    {allowedAccount &&
                        accounts.find((e) => e._id === allowedAccount) && (
                            <label
                                key={allowedAccount}
                                className="relative cursor-pointer flex shrink-0 p-1"
                            >
                                <input
                                    type="radio"
                                    name="account"
                                    className="hidden peer"
                                    value={allowedAccount}
                                    checked={selectedAccount === allowedAccount}
                                    onChange={() => {
                                        setSelectedAccount(allowedAccount);

                                        const filtered = accounts.filter(
                                            (e) => e._id !== allowedAccount,
                                        );

                                        setSelectedAccountTo(filtered[0]._id!);
                                    }}
                                />
                                <span
                                    className={`${colors.find((e: IColor) => e.name === accounts.find((e) => e._id === allowedAccount)?.bgColor)?.color || "bg-emerald-50"} ${accounts.find((e) => e._id === allowedAccount)?.bgColor === "White" ? "text-black" : "text-white"} text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                >
                                    {
                                        accounts.find(
                                            (e) => e._id === allowedAccount,
                                        )?.name
                                    }
                                </span>
                            </label>
                        )}
                    {!allowedAccount &&
                        accounts?.map((acc) => (
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
                                        setSelectedAccount(acc._id!);

                                        const filtered = accounts.filter(
                                            (e) => e._id !== acc._id,
                                        );

                                        // If it is already select and was not filtered out, let it be, else select the first one.
                                        if (
                                            filtered.some(
                                                (e) =>
                                                    e._id === selectedAccountTo,
                                            )
                                        )
                                            return;
                                        setSelectedAccountTo(filtered[0]._id!);
                                    }}
                                />
                                <span
                                    className={`${colors.find((e: IColor) => e.name === acc?.bgColor)?.color || "bg-emerald-50"} ${acc?.bgColor === "White" ? "text-black" : "text-white"} text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
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
                        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden border-t border-gray-200 dark:border-gray-700/50 pt-3">
                            <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 shrink-0 min-w-25">
                                Budget:
                            </h4>
                            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                {(!allowedBudget ||
                                    allowedBudget.type === "Update") && (
                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="budget"
                                            className="hidden peer"
                                            value=""
                                            checked={selectedBudget === ""}
                                            onChange={() =>
                                                setSelectedBudget("")
                                            }
                                        />
                                        <span className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white">
                                            No Budget
                                        </span>
                                    </label>
                                )}
                                {!allowedBudget &&
                                    budgets?.map((bud) => (
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
                                                    setSelectedBudget(bud._id!)
                                                }
                                            />
                                            <span
                                                className={`${colors.find((e: IColor) => e.name === bud?.bgColor)?.color || "bg-emerald-50"} ${
                                                    bud?.bgColor === "White"
                                                        ? "text-black"
                                                        : "text-white"
                                                } text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                            >
                                                {bud?.title}
                                            </span>
                                        </label>
                                    ))}
                                {allowedBudget &&
                                    budgets.find(
                                        (bud) => bud._id === allowedBudget._id,
                                    ) && (
                                        <label className="relative cursor-pointer flex shrink-0 p-1">
                                            <input
                                                type="radio"
                                                name="budget"
                                                className="hidden peer"
                                                value={allowedBudget._id}
                                                checked={
                                                    selectedBudget ===
                                                    allowedBudget._id
                                                }
                                                onChange={() =>
                                                    setSelectedBudget(
                                                        allowedBudget._id,
                                                    )
                                                }
                                            />
                                            <span
                                                className={`${colors.find((e: IColor) => e.name === budgets.find((bud) => bud._id === allowedBudget._id)?.bgColor)?.color || "bg-emerald-50"} ${
                                                    budgets.find(
                                                        (bud) =>
                                                            bud._id ===
                                                            allowedBudget._id,
                                                    )?.bgColor === "White"
                                                        ? "text-black"
                                                        : "text-white"
                                                } text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                            >
                                                {
                                                    budgets.find(
                                                        (go) =>
                                                            go._id ===
                                                            allowedBudget._id,
                                                    )?.title
                                                }
                                            </span>
                                        </label>
                                    )}
                            </div>
                        </div>
                    )}

                    {/* Goal Row */}
                    {goals?.length > 0 && !selectedBudget && (
                        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden border-t border-gray-200 dark:border-gray-700/50 pt-3">
                            <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 shrink-0 min-w-25">
                                Goal:
                            </h4>
                            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                                {(!allowedGoal ||
                                    allowedGoal.type === "Update") && (
                                    <label className="relative cursor-pointer flex shrink-0 p-1">
                                        <input
                                            type="radio"
                                            name="goal"
                                            className="hidden peer"
                                            value=""
                                            checked={selectedGoal === ""}
                                            onChange={() => setSelectedGoal("")}
                                        />
                                        <span className="bg-emerald-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white">
                                            No Goal
                                        </span>
                                    </label>
                                )}
                                {!allowedGoal &&
                                    goals
                                        ?.filter((go) => go.status === "active")
                                        ?.map((go) => (
                                            <label
                                                key={go?._id}
                                                className="relative cursor-pointer flex shrink-0 p-1"
                                            >
                                                <input
                                                    type="radio"
                                                    name="goal"
                                                    className="hidden peer"
                                                    value={go._id}
                                                    checked={
                                                        selectedGoal === go?._id
                                                    }
                                                    onChange={() =>
                                                        setSelectedGoal(go._id!)
                                                    }
                                                />
                                                <span
                                                    className={`${colors.find((e: IColor) => e.name === go?.bgColor)?.color || "bg-emerald-50"} ${
                                                        go?.bgColor === "White"
                                                            ? "text-black"
                                                            : "text-white"
                                                    } text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                                >
                                                    {go?.title}
                                                </span>
                                            </label>
                                        ))}
                                {allowedGoal &&
                                    goals.find(
                                        (go) => go._id === allowedGoal._id,
                                    ) && (
                                        <label className="relative cursor-pointer flex shrink-0 p-1">
                                            <input
                                                type="radio"
                                                name="goal"
                                                className="hidden peer"
                                                value={allowedGoal._id}
                                                checked={
                                                    selectedGoal ===
                                                    allowedGoal._id
                                                }
                                                onChange={() =>
                                                    setSelectedGoal(
                                                        allowedGoal._id,
                                                    )
                                                }
                                            />
                                            <span
                                                className={`${colors.find((e: IColor) => e.name === goals.find((go) => go._id === allowedGoal._id)?.bgColor)?.color || "bg-emerald-50"} ${
                                                    goals.find(
                                                        (go) =>
                                                            go._id ===
                                                            allowedGoal._id,
                                                    )?.bgColor === "White"
                                                        ? "text-black"
                                                        : "text-white"
                                                } text-xs font-medium px-3.5 py-2 rounded-full shadow-xs transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black peer-checked:ring-black dark:peer-checked:ring-white`}
                                            >
                                                {
                                                    goals.find(
                                                        (go) =>
                                                            go._id ===
                                                            allowedGoal._id,
                                                    )?.title
                                                }
                                            </span>
                                        </label>
                                    )}
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* To Account */}
            {slider > 1 && (
                <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden border-t border-gray-300 dark:border-gray-700/50 pt-3">
                    <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-400 shrink-0 min-w-25">
                        To Account:
                    </h4>
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
                        {accounts
                            .filter((e) => e._id !== selectedAccount)
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
                                            setSelectedAccountTo(toObj._id!)
                                        }
                                    />
                                    <span
                                        className={`${colors.find((e: IColor) => e.name === toObj?.bgColor)?.color || "bg-emerald-50"} ${
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
