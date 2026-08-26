import { Calendar as CalendarIcon } from "lucide-react";
import { today, parseDate, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "react-aria-components";
import {
    Calendar,
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarGridHeader,
    CalendarHeader,
    CalendarHeading,
    NavButton,
} from "../core/calendar";
import { DateInput, DateSegment } from "../core/date-field";
import {
    DatePicker,
    DatePickerGroup,
    DatePickerPopover,
    DatePickerTrigger,
} from "../core/date-picker";
import { useState } from "react";
import dayjs from "dayjs";
import { DateValue } from "@react-types/calendar";

const DatePickerComponent = ({
    dt,
    setDT,
}: {
    dt: Date;
    setDT: (data: Date) => void;
}) => {
    const now = dayjs(dt);
    const dateString = now.format("YYYY-MM-DD");

    const [date, setDate] = useState<DateValue | null>(parseDate(dateString));

    const currentDate = today(getLocalTimeZone());
    const maxDate = currentDate.add({ months: 1 });

    const [calenderKey, setCalenderKey] = useState(0);

    return (
        <I18nProvider>
            <DatePicker
                className={`w-fit`}
                maxValue={maxDate}
                value={date}
                onChange={(calenderDate) => {
                    if (!calenderDate) return;

                    setDate(calenderDate);
                    const newDate = new Date(
                        calenderDate?.year,
                        calenderDate?.month - 1,
                        calenderDate?.day,
                    );

                    setDT(newDate);
                }}
                key={calenderKey}
                defaultValue={today(getLocalTimeZone())}
            >
                {/* <FieldLabel>Event Date</FieldLabel> */}

                <DatePickerGroup className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800/50 focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 max-w-sm w-fit pr-4">
                    <DateInput className="flex flex-row flex-wrap items-center text-gray-800 dark:text-gray-200 text-sm outline-none ring-0 border-none focus:outline-none focus:ring-0 focus-visible:outline-none">
                        {(segment) => (
                            <DateSegment
                                segment={segment}
                                className="px-0.5 tabular-nums outline-none rounded hover:bg-blue-50 dark:hover:bg-primary/50 focus:bg-primary/90 dark:focus:bg-primary focus:text-white dark:focus:text-white transition-colors"
                            />
                        )}
                    </DateInput>
                    <DatePickerTrigger className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg transition-colors">
                        <CalendarIcon className="size-5" />
                    </DatePickerTrigger>
                </DatePickerGroup>

                {/* {date && (
                    <FieldDescription className="mt-1.5 text-xs font-medium text-primary">
                        {formatter.format(date.toDate(getLocalTimeZone()))}
                    </FieldDescription>
                )} */}

                <DatePickerPopover className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-xl shadow-gray-200/50 dark:shadow-none rounded-5xl border border-gray-100 dark:border-gray-800 z-50 mt-3 backdrop-blur-lg">
                    <Calendar className="border-gray-300 dark:border-black rounded-5xl">
                        {/* Header styling is usually handled inside calendar.tsx, but the popover wrapper handles the main card */}
                        <CalendarHeader className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-gray-800">
                            <NavButton
                                slot="previous"
                                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            />
                            <CalendarHeading className="text-sm font-semibold text-gray-800 dark:text-gray-200" />
                            <NavButton
                                slot="next"
                                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    setDate(today(getLocalTimeZone()));
                                    setCalenderKey((prev) => prev + 1);
                                    setDT(new Date());
                                }}
                                className="px-3 py-1.5 text-xs font-medium text-primary hover:bg-emerald-100 dark:hover:bg-emerald-950/50 rounded-full transition-colors"
                            >
                                Today
                            </button>
                        </CalendarHeader>
                        <CalendarGrid className="w-full border-collapse">
                            <CalendarGridHeader className="text-xs font-medium text-gray-400 dark:text-gray-500 pb-2" />
                            <CalendarGridBody className="[&_td]:text-center [&_td]:py-1">
                                {(date) => (
                                    <CalendarCell
                                        date={date}
                                        className="w-10 h-10 text-sm font-medium rounded-full mx-auto flex items-center justify-center transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 data-today:font-semibold data-selected:bg-primary data-selected:hover:bg-primary data-selected:text-white data-outside-month:text-gray-300 dark:data-outside-month:text-gray-700 focus:ring-pink-400"
                                    />
                                )}
                            </CalendarGridBody>
                        </CalendarGrid>
                    </Calendar>
                </DatePickerPopover>
            </DatePicker>
        </I18nProvider>
    );
};

export default DatePickerComponent;
