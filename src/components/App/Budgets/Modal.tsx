import useAuth from "@/hooks/Auth";

import DialPad from "@/components/App/Common/DialPad";
import ColorPicker from "@/components/App/Common/ColorPicker";
import BaseModal from "@/components/App/Common/BaseModal";

import { IBudget } from "@/types/budget";
import React, { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { API_Budget_Create, API_Budget_Update } from "@/api/BudgetAPI";
import { ApiError } from "@/types/common";
import HandleErrorMessage from "@/utils/networkError";
import BudgetTypeSelector from "@/components/App/Budgets/BudgetTypeSelector";
import BasicInputs from "@/components/App/Budgets/BasicInputs";
import OneTimeBudget from "@/components/App/Budgets/OneTimeBudget";
import AutoRepeatBudget from "@/components/App/Budgets/AutoRepeatBudget";

const handleCreation = async ({
    newData,
    setIsLoading,
    GetData,
    Cancel,
    accessToken,
}: {
    newData: IBudget;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    accessToken: string;
    GetData: () => void;
    Cancel: () => void;
}) => {
    const obj: Partial<IBudget> = {
        type: newData.type,
        title: newData.title,
        amount: newData.amount,
        _id: newData._id,
        bgColor: newData.bgColor,
    };
    if (newData.type === "One-Time") {
        obj.startDate = newData.startDate;
        obj.endDate = newData.endDate;
    } else if (newData.type === "Auto-Repeat") {
        obj.cycleType = newData.cycleType;
        if (newData.cycleType === "monthly") {
            obj.cycleMonthly = newData.cycleMonthly;
        } else if (newData.cycleType === "weekly") {
            obj.cycleWeekly = newData.cycleWeekly;
        } else if (newData.cycleType === "yearly") {
            obj.cycleYearly = {
                day: newData.cycleYearly?.day ?? 1,
                month: newData.cycleYearly?.month ?? 1,
            };
        }
    }
    setIsLoading(true);
    try {
        await API_Budget_Create({
            data: obj,
            token: accessToken,
        });

        toast.success("Budget created successfully!");
        setIsLoading(false);
        GetData();
        Cancel();
        return;
    } catch (error) {
        setIsLoading(false);
        const err = error as ApiError;
        const res = err?.response?.data;

        if (res) toast.error(res.error.message);
        else HandleErrorMessage(err);
    }
};

const handleUpdate = async ({
    newData,
    editObj,
    setIsLoading,
    GetData,
    Cancel,
    accessToken,
}: {
    newData: IBudget;
    editObj: IBudget;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    accessToken: string;
    GetData: () => void;
    Cancel: () => void;
}) => {
    const obj: Partial<IBudget> = {
        _id: newData._id,
        // bgColor: newData.bgColor,
    };

    if (newData.title !== editObj?.title) obj.title = newData.title;
    if (newData.amount !== editObj?.amount) obj.amount = newData.amount;
    if (newData.bgColor !== editObj?.bgColor) obj.bgColor = newData.bgColor;

    setIsLoading(true);
    if (editObj.type === "One-Time") {
        if (newData.startDate !== editObj?.startDate) {
            obj.startDate = newData.startDate;
        } else if (newData.endDate !== editObj?.endDate) {
            obj.endDate = newData.endDate;
        }
    } else if (editObj.type === "Auto-Repeat") {
        obj.cycleType = newData.cycleType;

        if (newData.cycleType === "monthly") {
            obj.cycleMonthly = newData.cycleMonthly;
        } else if (newData.cycleType === "weekly") {
            obj.cycleWeekly = newData.cycleWeekly;
        } else if (newData.cycleType === "yearly") {
            obj.cycleYearly = {
                day: newData.cycleYearly?.day ?? 1,
                month: newData.cycleYearly?.month ?? 1,
            };
        }
    }

    try {
        await API_Budget_Update({
            data: obj,
            token: accessToken,
        });

        toast.success("Budget updated successfully!");
        setIsLoading(false);
        GetData();
        Cancel();
        return;
    } catch (error) {

        setIsLoading(false);
        const err = error as ApiError;
        const res = err?.response?.data;

        if (res) toast.error(res.error.message);
        else HandleErrorMessage(err);
    }
};

const BudgetModal = ({
    typeOfModal = "Create",
    Cancel,
    editObj,
    GetData,
}: {
    typeOfModal: "Create" | "Update";
    Cancel: () => void;
    GetData: () => void;
    editObj?: IBudget | null;
}) => {
    // States
    const [slider, setSlider] = useState(editObj?.type === "One-Time" ? 0 : 1);
    const [isLoading, setIsLoading] = useState(false);
    const [showDialPad, setShowDialPad] = useState(false);

    const [cycleMonthly, setCycleMonthly] = useState(1);
    const [cycleWeekly, setCycleWeekly] = useState(1);
    const [yearlyDay, setYearlyDay] = useState(1);
    const [yearlyMonth, setYearlyMonth] = useState(1);

    // Global Data
    const { accessToken } = useAuth();

    // Form Details
    const [form, setForm] = useState<Partial<IBudget>>({
        _id: editObj?._id || "",
        type: editObj?.type || "One-Time",
        title: editObj?.title || "",
        amount: editObj?.amount || 0,
        bgColor: editObj?.bgColor || "Default",

        startDate: editObj?.startDate || new Date().toISOString(),
        endDate:
            editObj?.endDate || dayjs(new Date()).add(1, "day").toISOString(),

        cycleType: editObj?.cycleType || "monthly",
    });

    // Button Click Handler
    const handleButtonClick = () => {
        // 1. Destructure data from response body
        const obj = { ...form };

        // 2. Set the current Type
        if (!slider) obj.type = "One-Time";
        else if (slider) obj.type = "Auto-Repeat";

        // 3. Make sure title is not empty
        if (!obj.title?.trim()) {
            return toast.error("Budget's title is required.");
        }

        // 4. Make sure amount is greater than 0.
        if (!obj.amount) {
            return toast.error("Amount must be greater than 0.");
        }

        // 5. Make sure endDate is after start date.
        const start = dayjs(obj.startDate).startOf("day");
        const end = dayjs(obj.endDate).startOf("day");

        const diff = end.diff(start, "day");

        if (diff < 1) {
            return toast.error("The minimum duration for a budget is 1 day.");
        }
        // 6. If Type is "Repeated", then append the properties to the obj
        if (obj.type === "Auto-Repeat") {
            if (obj.cycleType === "monthly") {
                obj.cycleMonthly = cycleMonthly;
            } else if (obj.cycleType === "weekly") {
                obj.cycleWeekly = cycleWeekly;
            } else if (obj.cycleType === "yearly") {
                obj.cycleYearly = {
                    day: yearlyDay,
                    month: yearlyMonth,
                };
            }
        }

        if (typeOfModal === "Create") {
            handleCreation({
                newData: obj as IBudget,
                setIsLoading,
                Cancel,
                GetData,
                accessToken: accessToken!,
            });
        } else if (typeOfModal === "Update") {
            obj._id = editObj?._id;
            handleUpdate({
                newData: obj as IBudget,
                editObj: editObj!,
                setIsLoading,
                Cancel,
                GetData,
                accessToken: accessToken!,
            });
        }
    };

    return (
        <BaseModal
            Cancel={Cancel}
            typeOfModal={typeOfModal}
            isLoading={isLoading}
            handleUpdate={handleButtonClick}
            title="Budget"
            children={
                <>
                    {typeOfModal === "Create" && (
                        <BudgetTypeSelector
                            slider={slider}
                            setSlider={setSlider}
                        ></BudgetTypeSelector>
                    )}
                    <div className="border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-4xl p-4 w-full flex flex-col jus items-center gap-2">
                        {/* Title & Amount Inputs */}
                        <BasicInputs
                            title={form.title!}
                            setTitle={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    title: e as string,
                                }))
                            }
                            amount={form.amount!}
                            setShowDialPad={setShowDialPad}
                        ></BasicInputs>
                        {/* One-Time Budget */}
                        {!slider && (
                            <OneTimeBudget
                                startDate={form.startDate!}
                                setStartDate={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        startDate: e as string,
                                    }))
                                }
                                setEndDate={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        endDate: e as string,
                                    }))
                                }
                                endDate={form.endDate!}
                            ></OneTimeBudget>
                        )}
                        {/* Auto-Repeat Budget */}
                        {slider === 1 && (
                            <AutoRepeatBudget
                                cycleType={form.cycleType!}
                                setCycleType={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        cycleType: e as IBudget["cycleType"],
                                    }))
                                }
                                // 1. Monthly
                                cycleMonthly={cycleMonthly}
                                setCycleMonthly={setCycleMonthly}
                                // 2. Weekly
                                cycleWeekly={cycleWeekly}
                                setCycleWeekly={setCycleWeekly}
                                // 3. Yearly - Day
                                yearlyDay={yearlyDay}
                                setYearlyDay={setYearlyDay}
                                // 3. Yearly - Month
                                yearlyMonth={yearlyMonth}
                                setYearlyMonth={setYearlyMonth}
                            ></AutoRepeatBudget>
                        )}
                    </div>
                    <ColorPicker
                        selectedColor={form.bgColor!}
                        setSelectedColor={(e) =>
                            setForm((prev) => ({ ...prev, bgColor: e }))
                        }
                    ></ColorPicker>
                    <DialPad
                        text="Amount"
                        input={form.amount!}
                        showModal={showDialPad}
                        setShowModal={setShowDialPad}
                        setInput={(e) =>
                            setForm((prev) => ({ ...prev, amount: e }))
                        }
                    ></DialPad>
                </>
            }
        ></BaseModal>
    );
};

export default BudgetModal;
