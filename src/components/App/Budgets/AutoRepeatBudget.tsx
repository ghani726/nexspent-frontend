import CycleTypeRepeatBudget from "@/components/App/Budgets/Repeated/CycleType";
import BudgetRepeatedMonthly from "@/components/App/Budgets/Repeated/Monthly";
import BudgetRepeatedWeekly from "@/components/App/Budgets/Repeated/Weekly";
import BudgetRepeatedYearly from "@/components/App/Budgets/Repeated/Yearly";
import React, { Dispatch, SetStateAction } from "react";

const AutoRepeatBudget = ({
    cycleType,
    setCycleType,

    // 1. Monthly
    cycleMonthly,
    setCycleMonthly,

    // 2. Weekly
    cycleWeekly,
    setCycleWeekly,

    // 1. Yearly - Day
    yearlyDay,
    setYearlyDay,

    // 2. Yearly - Month
    yearlyMonth,
    setYearlyMonth,
}: {
    cycleType: string;
    setCycleType: Dispatch<SetStateAction<string>>;

    // Monthly
    cycleMonthly: number;
    setCycleMonthly: Dispatch<SetStateAction<number>>;

    // Weekly
    cycleWeekly: number;
    setCycleWeekly: Dispatch<SetStateAction<number>>;

    yearlyDay: number;
    setYearlyDay: Dispatch<SetStateAction<number>>;

    yearlyMonth: number;
    setYearlyMonth: Dispatch<SetStateAction<number>>;
}) => {
    return (
        <div className="w-full gap-2 flex flex-col justify-center items-center">
            <CycleTypeRepeatBudget
                cycleType={cycleType}
                setCycleType={setCycleType}
            ></CycleTypeRepeatBudget>
            {cycleType === "monthly" && (
                <BudgetRepeatedMonthly
                    cycleMonthly={cycleMonthly}
                    setCycleMonthly={setCycleMonthly}
                ></BudgetRepeatedMonthly>
            )}
            {cycleType === "weekly" && (
                <BudgetRepeatedWeekly
                    cycleWeekly={cycleWeekly}
                    setCycleWeekly={setCycleWeekly}
                ></BudgetRepeatedWeekly>
            )}
            {cycleType === "yearly" && (
                <BudgetRepeatedYearly
                    // 1. Day
                    yearlyDay={yearlyDay}
                    setYearlyDay={setYearlyDay}
                    // 1. Month
                    yearlyMonth={yearlyMonth}
                    setYearlyMonth={setYearlyMonth}
                ></BudgetRepeatedYearly>
            )}
        </div>
    );
};

export default AutoRepeatBudget;
