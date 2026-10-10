import useAuth from "@/hooks/Auth";
import useData from "@/hooks/Data";
import { IBudget } from "@/types/budget";
import { ITransaction } from "@/types/transaction";
import colors from "@/utils/color";
import dayjs from "dayjs";

export const CalculateTxnsFromBudget = (obj: IBudget) => {
    // 1. Get Global data
    const { user } = useAuth();
    const { transactions } = useData();

    // 1. Filter transactions belonging to this budget
    const transacts = transactions.filter((txn) => txn.budget === obj._id);

    // 2. Set up start and end dates according to budget properties
    let start = dayjs();
    let end = dayjs();
    const now = dayjs();

    // 3. One-Time Budget Setup
    if (obj.type === "One-Time") {
        start = dayjs(obj.startDate).startOf("day");
        end = dayjs(obj.endDate).startOf("day");
    }
    // 4. Auto-Repeat Budget Setup
    else if (obj.type === "Auto-Repeat") {
        // Monthly Calculation
        if (obj.cycleType === "monthly") {
            const cycleDay = obj.cycleMonthly!;
            if (now.date() >= cycleDay) {
                start = now.date(cycleDay).startOf("day");
            } else {
                start = now.subtract(1, "month").date(cycleDay).startOf("day");
            }
            end = start.add(1, "month").subtract(1, "day").endOf("day");
        }
        // Weekly Calculation
        else if (obj.cycleType === "weekly") {
            const targetDay = obj.cycleWeekly! === 7 ? 0 : obj.cycleWeekly!;
            const currentDay = now.day();
            let diff = currentDay - targetDay;
            if (diff < 0) diff += 7;

            start = now.subtract(diff, "day").startOf("day");
            end = start.add(6, "day").endOf("day");
        }
        // Yearly Calculation
        else if (obj.cycleType === "yearly") {
            const targetMonth = obj.cycleYearly!.month - 1;
            const targetDay = obj.cycleYearly!.day;

            const thisYearAnchor = now
                .month(targetMonth)
                .date(targetDay)
                .startOf("day");

            if (
                now.isAfter(thisYearAnchor) ||
                now.isSame(thisYearAnchor, "day")
            ) {
                start = thisYearAnchor;
            } else {
                start = thisYearAnchor.subtract(1, "year");
            }
            end = start.add(1, "year").subtract(1, "day").endOf("day");
        }
    }

    // 5. Filter active period transactions
    const filteredTxnBasedOnDate = transacts.filter((txn) => {
        const date = dayjs(txn.date).startOf("day");
        const startDiff = date.diff(start, "day");
        const endDiff = date.diff(end, "day");
        return startDiff >= 0 && endDiff <= 0;
    });

    // 6. Spent amount & total window length
    const spentAmount = filteredTxnBasedOnDate.reduce(
        (acc, txn) => acc + txn.amount,
        0,
    );

    // Calculate remaining active days inclusively (e.g., Oct 9 to Oct 10 = 2 days)
    const diffNowEnd = Math.max(
        0,
        end.endOf("day").diff(now.startOf("day"), "day") + 1,
    );

    // Calculate remaining per-day spending limit
    const remainingAmount = obj.amount - spentAmount;
    const amountPerDay = parseFloat(
        (Math.max(0, remainingAmount) / (diffNowEnd || 1)).toFixed(
            user?.decimalPrecision ?? 2,
        ),
    );

    // 8. Calculate progress percentage
    const progress = (spentAmount / (obj.amount || 1)) * 100;

    // 9. Extract theme color safely
    const currentColor = colors.find((e) => e.name === obj.bgColor);
    const hexColor = currentColor?.color.includes("[")
        ? currentColor.color.split("[")[1].replace("]", "")
        : (currentColor?.color ?? "#000000");

    // 10. Format text string
    const symbol = user?.currency ?? "$";
    const spendingText = `You can spend ${symbol}${parseFloat(amountPerDay.toFixed(user?.decimalPrecision)).toLocaleString()} ${
        diffNowEnd > 1 ? `${symbol}/day for ${diffNowEnd} days` : "for today"
    }`;

    return {
        hexColor,
        spentAmount,
        progress,
        start,
        end,
        diffNowEnd,
        spendingText,
        currentColor,
        transacts,
        filteredTxnBasedOnDate,
    };
};

export const getBudgetHistorySimple = (
    obj: IBudget,
    transacts: ITransaction[], // Scoped to this budget
    currentStart: dayjs.Dayjs,
) => {
    if (obj.type === "One-Time") return [];

    const historyMap: Record<
        string,
        {
            start: dayjs.Dayjs;
            end: dayjs.Dayjs;
            spent: number;
            txns: ITransaction[];
        }
    > = {};

    transacts.forEach((txn) => {
        const txnDate = dayjs(txn.date);

        // 1. Ignore current cycle transactions
        if (!txnDate.isBefore(currentStart, "day")) return;

        // 2. Find cycle start date automatically
        let start = txnDate.startOf("month");
        let end = txnDate.endOf("month");

        if (obj.cycleType === "weekly") {
            start = txnDate.startOf("week");
            end = txnDate.endOf("week");
        } else if (obj.cycleType === "yearly") {
            start = txnDate.startOf("year");
            end = txnDate.endOf("year");
        }

        // 3. Group by date string (e.g., "2026-08-01")
        const key = start.format("YYYY-MM-DD");

        if (!historyMap[key]) {
            historyMap[key] = { start, end, spent: 0, txns: [] };
        }

        historyMap[key].spent += txn.amount;
        historyMap[key].txns.push(txn);
    });

    // 4. Return array sorted newest first
    return Object.values(historyMap)
        .sort((a, b) => b.start.valueOf() - a.start.valueOf())
        .map((item) => ({
            start: item.start,
            end: item.end,
            spentAmount: item.spent,
            totalAmount: obj.amount,
            isOverspent: item.spent > obj.amount,
            transactions: item.txns,
        }));
};
