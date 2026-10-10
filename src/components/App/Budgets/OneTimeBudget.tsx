import DatePickerComponent from "@/components/tailgrids/components/DatePicker";
import { ArrowDown } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

const OneTimeBudget = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}: {
    startDate: string;
    endDate: string;
    setStartDate: Dispatch<SetStateAction<string>>;
    setEndDate: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div className="w-full gap-2 pt-1 flex flex-col justify-center items-center">
            {/* Date Picker */}

            <DatePickerComponent
                dt={new Date(startDate)}
                setDT={(e) =>
                    // setForm((prev) => ({
                    //     ...prev,
                    //     startDate: e.toISOString(),
                    // }))
                    setStartDate(e.toISOString())
                }
            ></DatePickerComponent>

            <ArrowDown></ArrowDown>

            <DatePickerComponent
                dt={new Date(endDate)}
                setDT={(e) =>
                    // setForm((prev) => ({
                    //     ...prev,
                    //     endDate: e.toISOString(),
                    // }))
                    setEndDate(e.toISOString())
                }
            ></DatePickerComponent>
        </div>
    );
};

export default OneTimeBudget;
