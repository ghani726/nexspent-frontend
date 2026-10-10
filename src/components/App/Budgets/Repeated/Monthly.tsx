import DialPad from "@/components/App/Common/DialPad";
import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const BudgetRepeatedMonthly = ({
    cycleMonthly,
    setCycleMonthly,
}: {
    cycleMonthly: number;
    setCycleMonthly: Dispatch<SetStateAction<number>>;
}) => {
    const [showMonthlyDialPad, setShowMonthlyDialPad] = useState(false);

    return (
        <div className="flex justify-between items-center gap-2">
            <h4 className="text-xl font-semibold">Start Day:</h4>
            <div
                onClick={() => setShowMonthlyDialPad(true)}
                className="border cursor-pointer active:scale-90 duration-300 ease-in-out border-gray-200 dark:border-gray-700 p-2 px-3 rounded-full gap-2 flex justify-between items-center text-xl font-medium"
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // setForm((prev) => ({
                        //     ...prev,
                        //     cycleMonthly: prev.cycleMonthly! - 1,
                        // }));
                        setCycleMonthly((prev) => prev - 1);
                    }}
                    disabled={cycleMonthly <= 1 ? true : false}
                    className="disabled:bg-red-300 dark:disabled:bg-red-400 disabled:cursor-not-allowed bg-red-500 text-white cursor-pointer active:scale-95 duration-300 ease-in-out rounded-full p-1"
                >
                    <Minus strokeWidth={3.5} size={12}></Minus>
                </button>
                <button
                    className="cursor-pointer"
                    onClick={() => setShowMonthlyDialPad(true)}
                >
                    {cycleMonthly}{" "}
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // setForm((prev) => ({
                        //     ...prev,
                        //     cycleMonthly: prev.cycleMonthly! + 1,
                        // }));
                        setCycleMonthly((prev) => prev + 1);
                    }}
                    disabled={cycleMonthly >= 28 ? true : false}
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
                input={cycleMonthly}
                showModal={showMonthlyDialPad}
                setShowModal={setShowMonthlyDialPad}
                setInput={(e) => setCycleMonthly(e)}
            ></DialPad>
        </div>
    );
};

export default BudgetRepeatedMonthly;
