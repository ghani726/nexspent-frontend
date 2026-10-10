import Selector from "@/components/App/Budgets/Selector";
import { Dispatch, SetStateAction, useState } from "react";

const CycleTypeRepeatBudget = ({
    cycleType,
    setCycleType,
}: {
    cycleType: string;
    setCycleType: Dispatch<SetStateAction<string>>;
}) => {
    const formatedCycleType = cycleType[0]
        .toUpperCase()
        .concat(cycleType.slice(1));

    const [showCycleModal, setShowCycleModal] = useState(false);

    return (
        <div className="flex justify-between items-center gap-2">
            <h4 className="text-xl font-semibold">Cycle Type:</h4>
            <div
                onClick={() => setShowCycleModal((prev) => !prev)}
                className="border cursor-pointer active:scale-90 duration-300 ease-in-out border-gray-200 dark:border-gray-700 p-2 px-4 rounded-full"
            >
                {formatedCycleType}
            </div>
            <Selector
                title="Cycle"
                showModal={showCycleModal}
                setShowModal={setShowCycleModal}
                value={cycleType}
                setValue={(e) => setCycleType(e as string)}
                values={[
                    {
                        title: "Monthly",
                        value: "monthly",
                    },
                    {
                        title: "Weekly",
                        value: "weekly",
                    },
                    {
                        title: "Yearly",
                        value: "yearly",
                    },
                ]}
            ></Selector>
        </div>
    );
};

export default CycleTypeRepeatBudget;
