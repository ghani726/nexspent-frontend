import useAuth from "@/hooks/Auth";
import React, { Dispatch, SetStateAction } from "react";

const BasicInputs = ({
    title,
    setTitle,
    amount,

    setShowDialPad,
}: {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    amount: number;
    setShowDialPad: Dispatch<SetStateAction<boolean>>;
}) => {
    const { user } = useAuth();
    return (
        <>
            <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                className="border-gray-600 p-1 focus:bg-white dark:focus:bg-gray-800 w-fit field-sizing-content text-center rounded-t-xl border-b-2 focus:border-primary outline-none text-2xl font-bold max-w-full px-2"
                placeholder="Budget's Title"
            />
            {/* Amount */}
            <div className="w-full font-medium text-lg flex justify-center items-end gap-2">
                Amount
                <button
                    onClick={() => {
                        setShowDialPad((prev) => !prev);
                    }}
                    className={`font-bold text-2xl bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-1 rounded-xl cursor-pointer active:scale-90 duration-300 ease-in-out`}
                >
                    {user?.currency}
                    {amount?.toLocaleString()}
                </button>
            </div>
        </>
    );
};

export default BasicInputs;
