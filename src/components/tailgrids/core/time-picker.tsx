"use client";

import { cn } from "../../../utils/cn";
import { useEffect, useRef, useState } from "react";
import {
    Button,
    MenuTrigger,
    Popover,
    type ButtonProps,
} from "react-aria-components";
import { useMenuTriggerState } from "react-stately";

const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) =>
        String(start + i).padStart(2, "0"),
    );

export function TimePicker({
    children,
    onSelect,
    selectedTime,
}: {
    children: React.ReactNode;
    onSelect?: (data: Date) => void;
    selectedTime?: Date;
}) {
    const triggerState = useMenuTriggerState({});

    const [hour, setHour] = useState<string>(() => {
        if (!selectedTime) return "01"; // Default fallback
        const h = selectedTime.getHours();
        const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
        return String(hour12).padStart(2, "0"); // Keeps it two digits like "01", "09", etc.
    });
    const [minute, setMinute] = useState<string>(() => {
        if (!selectedTime) return "00"; // Default fallback
        const m = selectedTime.getMinutes();
        return String(m).padStart(2, "0"); // Keeps it two digits like "01", "09", etc.
    });
    const [period, setPeriod] = useState<string>(() => {
        if (!selectedTime) return "AM";
        const h = selectedTime.getHours();

        return h >= 12 ? "PM" : "AM";
    });

    const handleChange = (
        type: "hour" | "minute" | "period",
        value: string,
    ) => {
        if (type === "hour") setHour(value);
        if (type === "minute") setMinute(value);
        if (type === "period") setPeriod(value);

        const final = {
            hour: type === "hour" ? value : hour,
            minute: type === "minute" ? value : minute,
            period: type === "period" ? value : period,
        };

        const date = toDate({
            hour: final.hour,
            minute: final.minute,
            period: final.period,
        });

        onSelect?.(date);
        triggerState.close();
    };

    return (
        <MenuTrigger>
            {children}
            <Popover className="bg-white dark:bg-gray-900 dark:text-white border border-gray-50 dark:border-black p-2 shadow-medium outline-none rounded-4xl gap-3">
                <div className="grid max-w-fit min-w-40 grid-cols-[1fr_2px_1fr_2px_1fr] gap-1.5">
                    <TimeColumn
                        values={range(1, 12)}
                        onChange={(v) => handleChange("hour", v)}
                        defaultValue={hour}
                    />
                    <div className="h-full w-px bg-gray-200 dark:bg-gray-800" />{" "}
                    <TimeColumn
                        values={range(0, 59)}
                        onChange={(v) => handleChange("minute", v)}
                        defaultValue={minute}
                    />
                    <div className="h-full w-px bg-gray-200 dark:bg-gray-800" />
                    <TimeColumn
                        values={["AM", "PM"]}
                        onChange={(v) => handleChange("period", v)}
                        defaultValue={period}
                    />
                </div>
            </Popover>
        </MenuTrigger>
    );
}

function TimeColumn({
    values,
    onChange,
    defaultValue,
}: {
    values: string[];
    onChange?: (value: string) => void;
    defaultValue?: string;
}) {
    const [selected, setSelected] = useState(defaultValue || values[0]);
    const selectedRef = useRef<HTMLButtonElement>(null); // <--- Add this

    useEffect(() => {
        selectedRef.current?.scrollIntoView({
            block: "center",
            behavior: "instant",
        });
    }, [defaultValue]);

    return (
        <div
            className={`flex max-h-73 flex-col gap-1 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden`}
        >
            {values.map((value) => (
                <button
                    key={value}
                    ref={selected === value ? selectedRef : null} // <--- Add this ref check
                    onClick={() => {
                        setSelected(value);
                        onChange?.(value);
                    }}
                    className={cn(
                        "grid size-11.5 shrink-0 rounded-full place-items-center text-sm transition",
                        selected === value
                            ? "bg-primary text-white font-bold"
                            : "text-title-50 hover:bg-datepicker-selected-hover-background",
                    )}
                >
                    {value}
                </button>
            ))}
        </div>
    );
}

export function TimePickerTrigger({ className, ...props }: ButtonProps) {
    return (
        <Button
            className={cn("outline-none min-w-fit", className)}
            {...props}
        />
    );
}

type ToDateParams = {
    hour: string;
    minute: string;
    period: string;
};

function toDate({ hour, minute, period }: ToDateParams) {
    let hour24 = parseInt(hour);
    if (period === "AM" && hour24 === 12) {
        hour24 = 0; // Midnight case
    } else if (period === "PM" && hour24 !== 12) {
        hour24 += 12;
    }

    const date = new Date();
    date.setHours(hour24, parseInt(minute), 0, 0);

    return date;
}
