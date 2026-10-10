import Selector from "@/components/App/Budgets/Selector";
import { Dispatch, SetStateAction, useState } from "react";
const BudgetRepeatedWeekly = ({
    cycleWeekly,
    setCycleWeekly,
}: {
    cycleWeekly: number;
    setCycleWeekly: Dispatch<SetStateAction<number>>;
}) => {
    const weekdays = [
        {
            title: "Monday",
            value: 1,
        },
        {
            title: "Tuesday",
            value: 2,
        },
        {
            title: "Wednesday",
            value: 3,
        },
        {
            title: "Thrusday",
            value: 4,
        },
        {
            title: "Friday",
            value: 5,
        },
        {
            title: "Saturday",
            value: 6,
        },
        {
            title: "Sunday",
            value: 7,
        },
    ];

    const [showWeeklyCycleModal, setShowWeeklyCycleModal] = useState(false);

    return (
        <div className="flex justify-between items-center gap-2">
            <h4 className="text-xl font-semibold">Start Day:</h4>
            <div
                onClick={() => setShowWeeklyCycleModal((prev) => !prev)}
                className="border cursor-pointer active:scale-90 duration-300 ease-in-out border-gray-200 dark:border-gray-700 p-2 px-4 rounded-full"
            >
                {weekdays.find((e) => e.value === cycleWeekly)?.title}
            </div>
            <Selector
                title="Start Day"
                showModal={showWeeklyCycleModal}
                setShowModal={setShowWeeklyCycleModal}
                value={cycleWeekly!}
                setValue={(e) => setCycleWeekly(e as number)}
                values={weekdays}
            ></Selector>
        </div>
    );
};

export default BudgetRepeatedWeekly;
