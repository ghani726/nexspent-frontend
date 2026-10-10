import Selector from "@/components/App/Budgets/Selector";
import DialPad from "@/components/App/Common/DialPad";
import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const BudgetRepeatedYearly = ({
    // 1. Day
    yearlyDay,
    setYearlyDay,

    // 2. Month
    yearlyMonth,
    setYearlyMonth,
}: {
    // 1. Day
    yearlyDay: number;
    setYearlyDay: Dispatch<SetStateAction<number>>;

    // 2. Month
    yearlyMonth: number;
    setYearlyMonth: Dispatch<SetStateAction<number>>;
}) => {
    const months = [
        {
            title: "January",
            value: 1,
        },
        {
            title: "February",
            value: 2,
        },
        {
            title: "March",
            value: 3,
        },
        {
            title: "April",
            value: 4,
        },
        {
            title: "May",
            value: 5,
        },
        {
            title: "June",
            value: 6,
        },
        {
            title: "July",
            value: 7,
        },
        {
            title: "August",
            value: 8,
        },
        {
            title: "September",
            value: 9,
        },
        {
            title: "October",
            value: 10,
        },
        {
            title: "November",
            value: 11,
        },
        {
            title: "December",
            value: 12,
        },
    ];

    const [showYearlyDialPad, setShowYearlyDialPad] = useState(false);
    const [showYearlyCycleModal, setShowYearlyCycleModal] = useState(false);
    
    return (
        <>
            <div className="flex justify-between items-center gap-2">
                <h4 className="text-xl font-semibold">Start Day:</h4>
                <div
                    onClick={() => setShowYearlyDialPad(true)}
                    className="border cursor-pointer active:scale-90 duration-300 ease-in-out border-gray-200 dark:border-gray-700 p-2 px-3 rounded-full gap-2 flex justify-between items-center text-xl font-medium"
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setYearlyDay((prev) => prev - 1);
                        }}
                        disabled={yearlyDay! <= 1 ? true : false}
                        className="disabled:bg-red-300 dark:disabled:bg-red-400 disabled:cursor-not-allowed bg-red-500 text-white cursor-pointer active:scale-95 duration-300 ease-in-out rounded-full p-1"
                    >
                        <Minus strokeWidth={3.5} size={12}></Minus>
                    </button>
                    <button
                        className="cursor-pointer"
                        onClick={() => setShowYearlyDialPad(true)}
                    >
                        {yearlyDay}{" "}
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();

                            setYearlyDay((prev) => prev + 1);
                        }}
                        disabled={yearlyDay! >= 28 ? true : false}
                        className="bg-primary text-white cursor-pointer active:scale-95 duration-300 disabled:cursor-not-allowed disabled:bg-secondary ease-in-out rounded-full p-1"
                    >
                        <Plus strokeWidth={3.5} size={12}></Plus>
                    </button>
                </div>

                <DialPad
                    showTools={false}
                    minValue={1}
                    maxValue={28}
                    text="Start Day"
                    input={yearlyDay}
                    showModal={showYearlyDialPad}
                    setShowModal={setShowYearlyDialPad}
                    setInput={(e) => setYearlyDay(e)}
                ></DialPad>
            </div>
            <div className="flex justify-between items-center gap-2">
                <h4 className="text-xl font-semibold">Start Month:</h4>
                <div
                    onClick={() => setShowYearlyCycleModal((prev) => !prev)}
                    className="border cursor-pointer active:scale-90 duration-300 ease-in-out border-gray-200 dark:border-gray-700 p-2 px-4 rounded-full"
                >
                    {months.find((e) => e.value === yearlyMonth)?.title}
                </div>
                <Selector
                    title="Start Month"
                    showModal={showYearlyCycleModal}
                    setShowModal={setShowYearlyCycleModal}
                    value={yearlyMonth}
                    setValue={(e) => setYearlyMonth(e as number)}
                    values={months}
                ></Selector>
            </div>
        </>
    );
};

export default BudgetRepeatedYearly;
