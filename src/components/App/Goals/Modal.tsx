import useAuth from "@/hooks/Auth";

import DialPad from "@/components/App/Common/DialPad";
import ColorPicker from "@/components/App/Common/ColorPicker";
import EmojiPicker from "@/components/App/Common/EmojiPicker";
import BaseModal from "@/components/App/Common/BaseModal";

import colors from "@/utils/color";
import { IGoal } from "@/types/goal";
import React, { Dispatch, SetStateAction, useState } from "react";
import DatePickerComponent from "@/components/tailgrids/components/DatePicker";
import { ArrowDown } from "lucide-react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { API_Goal_Create, API_Goal_Update } from "@/api/GoalAPI";
import { ApiError } from "@/types/common";
import HandleErrorMessage from "@/utils/networkError";

const handleCreation = async ({
    newData,
    setIsLoading,
    GetData,
    Cancel,
    accessToken,
}: {
    newData: IGoal;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    accessToken: string;
    GetData: () => void;
    Cancel: () => void;
}) => {
    setIsLoading(true);
    try {
        await API_Goal_Create({
            title: newData.title,
            goalAmount: newData.goalAmount,
            startDate: newData.startDate,
            endDate: newData.endDate,
            icon: newData.icon,
            bgColor: newData.bgColor,
            token: accessToken,
        });

        toast.success("Goal created successfully!");
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
    newData: IGoal;
    editObj: IGoal;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    accessToken: string;
    GetData: () => void;
    Cancel: () => void;
}) => {
    const obj: Partial<IGoal> = {
        _id: newData._id,
        bgColor: newData.bgColor,
        icon: newData.icon,
    };

    if (newData.title !== editObj?.title) obj.title = newData.title;
    if (newData.goalAmount !== editObj?.goalAmount)
        obj.goalAmount = newData.goalAmount;
    if (newData.startDate !== editObj?.startDate)
        obj.startDate = newData.startDate;
    if (newData.endDate !== editObj?.endDate) obj.endDate = newData.endDate;
    setIsLoading(true);

    try {
        await API_Goal_Update({
            ...obj,
            token: accessToken,
        });

        toast.success("Goal updated successfully!");
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

const GoalModal = ({
    typeOfModal = "Create",
    Cancel,
    editObj,
    GetData,
}: {
    typeOfModal: "Create" | "Update";
    Cancel: () => void;
    GetData: () => void;
    editObj?: IGoal | null;
}) => {
    // States
    const [isLoading, setIsLoading] = useState(false);
    const [showDialPad, setShowDialPad] = useState(false);
    const [showIconModal, setShowIconModal] = useState(false);

    // Global Data
    const { user, accessToken } = useAuth();

    // Form Details
    const [form, setForm] = useState<Partial<IGoal>>({
        _id: editObj?._id || "",
        title: editObj?.title || "",
        goalAmount: editObj?.goalAmount || 0,
        startDate: editObj?.startDate || new Date().toISOString(),
        endDate:
            editObj?.endDate || dayjs(new Date()).add(1, "day").toISOString(),
        bgColor: editObj?.bgColor || "Default",
        icon: editObj?.icon || "🎯",
    });

    // Button Click Handler
    const handleButtonClick = () => {
        // 1. Destructure data from response body
        const obj = { ...form };

        // 2. Make sure title is not empty
        if (!obj.title?.trim()) {
            return toast.error("Goal's title is required.");
        }

        // 3. Make sure goalAmount is greater than 0.
        if (!obj.goalAmount) {
            return toast.error("'Target to save' must be greater than 0.");
        }

        // 4. If startDate is less than today, or greater than a week, throw error
        const today = dayjs(new Date()).startOf("day");
        const start = dayjs(obj.startDate).startOf("day");

        const diff1 = start.diff(today, "day");

        if (diff1 < 0 && typeOfModal === "Create") {
            return toast.error("Start date cannot be less than today.");
        } else if (diff1 > 7 && typeOfModal === "Create") {
            return toast.error(
                "Start date cannot be more than 7 days in advance.",
            );
        }

        // 5. Make sure endDate is after start date.
        const end = dayjs(obj.endDate);

        const diff = end.diff(start, "day");

        if (diff < 1) {
            return toast.error("The minimum duration for a goal is 1 day.");
        }

        if (typeOfModal === "Create") {
            handleCreation({
                newData: obj as IGoal,
                setIsLoading,
                Cancel,
                GetData,
                accessToken: accessToken!,
            });
        } else if (typeOfModal === "Update") {
            obj._id = editObj?._id;
            handleUpdate({
                newData: obj as IGoal,
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
            title="Goal"
            children={
                <>
                    {/* Icon and Goal Title */}
                    <div className="flex justify-start items-center gap-4 w-full">
                        <button
                            onClick={() => setShowIconModal((prev) => !prev)}
                            className={`w-16 h-16 shrink-0 text-4xl ${colors.filter((e) => e.name === form.bgColor)[0].color} rounded-full`}
                        >
                            {form.icon}
                        </button>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={(e) => {
                                setForm((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }));
                            }}
                            className="border-gray-600 p-1 focus:bg-white dark:focus:bg-gray-800 w-full rounded-t-xl border-b-2 focus:border-primary outline-none text-2xl font-bold"
                            placeholder="Goal's Title"
                        />
                    </div>

                    {/* Color Picker */}

                    <ColorPicker
                        selectedColor={form.bgColor!}
                        setSelectedColor={(e) =>
                            setForm((prev) => ({ ...prev, bgColor: e }))
                        }
                    ></ColorPicker>
                    {/* Amount */}
                    <div className="w-full font-medium text-lg flex justify-center items-end gap-2">
                        Target to save
                        <button
                            onClick={() => {
                                if (typeOfModal === "Create")
                                    setShowDialPad((prev) => !prev);
                            }}
                            className={`font-bold text-2xl bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 p-1 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
                        >
                            {user?.defaultCurrency?.symbol}
                            {form?.goalAmount?.toLocaleString()}
                        </button>
                    </div>

                    {/* Date Picker */}

                    <DatePickerComponent
                        dt={new Date(form.startDate!)}
                        setDT={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                startDate: e.toISOString(),
                            }))
                        }
                        maxDate={{
                            value: 1,
                            type: "weeks",
                        }}
                        minDate={{
                            value: 0,
                            type: "days",
                        }}
                    ></DatePickerComponent>

                    <ArrowDown></ArrowDown>

                    <DatePickerComponent
                        dt={new Date(form.endDate!)}
                        setDT={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                endDate: e.toISOString(),
                            }))
                        }
                        // maxDate={{
                        //     value: 1,
                        //     type: "weeks",
                        // }}
                        minDate={{
                            value: -1,
                            type: "days",
                        }}
                    ></DatePickerComponent>

                    <DialPad
                        dP={user?.defaultDecimalPrecision}
                        text="Balance"
                        input={form.goalAmount!}
                        showModal={showDialPad}
                        setShowModal={setShowDialPad}
                        setInput={(e) =>
                            setForm((prev) => ({ ...prev, goalAmount: e }))
                        }
                        currencySymbol={user?.defaultCurrency?.symbol}
                    ></DialPad>
                    <EmojiPicker
                        showModal={showIconModal}
                        setShowModal={setShowIconModal}
                        setSelectedIcon={(e) =>
                            setForm((prev) => ({ ...prev, icon: e }))
                        }
                        selectedIcon={form.icon!}
                    />
                </>
            }
        ></BaseModal>
    );
};

export default GoalModal;
