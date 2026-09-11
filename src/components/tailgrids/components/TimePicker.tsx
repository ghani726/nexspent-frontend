import {
    Clock1,
    Clock2,
    Clock3,
    Clock4,
    Clock5,
    Clock6,
    Clock7,
    Clock8, 
    Clock9,
    Clock10,
    Clock11,
    Clock12,
} from "lucide-react";
import { TimePicker, TimePickerTrigger } from "../core/time-picker";

import { useState } from "react";

const TimePickerComponent = ({time = new Date, setTime}: {
    time: Date,
    setTime: (data: Date) => void
}) => {
    const [selectedTime, setSelectedTime] = useState<Date>(time)

    const ShowClock = () => {
        const h = selectedTime.getHours();
        const hour = h > 12 ? h - 12 : h;

        return hour === 1 ? (
            <Clock1></Clock1>
        ) : hour === 2 ? (
            <Clock2></Clock2>
        ) : hour === 3 ? (
            <Clock3></Clock3>
        ) : hour === 4 ? (
            <Clock4></Clock4>
        ) : hour === 5 ? (
            <Clock5></Clock5>
        ) : hour === 6 ? (
            <Clock6></Clock6>
        ) : hour === 7 ? (
            <Clock7></Clock7>
        ) : hour === 8 ? (
            <Clock8></Clock8>
        ) : hour === 9 ? (
            <Clock9></Clock9>
        ) : hour === 10 ? (
            <Clock10></Clock10>
        ) : hour === 11 ? (
            <Clock11></Clock11>
        ) : hour === 12 ? (
            <Clock12></Clock12>
        ) : null;
    };
    return (
        <TimePicker onSelect={(newDate)=>{
            setSelectedTime(newDate)
            setTime(newDate)
        }} selectedTime={selectedTime}>
            
            <TimePickerTrigger className="flex cursor-pointer justify-center items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-hover transition outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2">
                {ShowClock()}
                <span className="font-medium">
                    {selectedTime ? formatTime(selectedTime) : "Select Time"}
                </span>
            </TimePickerTrigger>
        </TimePicker>
    );
};

export default TimePickerComponent;
function formatTime(time: Date) {
    return time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}
