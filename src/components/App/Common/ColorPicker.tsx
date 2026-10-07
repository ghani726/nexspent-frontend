import colors from "@/utils/color";
import React from "react";
import type { IColor } from "@/types/common";

const ColorBox = ({
    e,
    selectedColor,
    handleColorChange,
}: {
    e: IColor;
    selectedColor: string;
    handleColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <label
            key={e.name}
            className="relative cursor-pointer px-1 flex h-11 w-11"
        >
            <input
                type="radio"
                name="colors"
                value={e.name}
                checked={selectedColor === e.name}
                onChange={handleColorChange}
                className="peer hidden"
            />
            <div
                className={`rounded-full h-10 aspect-square w-10 ${e.color} peer-checked:ring-2 peer-checked:ring-black peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black dark:peer-checked:ring-white`}
                title={e.name}
            ></div>
        </label>
    );
};
const ColorPicker = ({
    selectedColor,
    setSelectedColor,
}: {
    selectedColor: string;
    setSelectedColor: (val: string) => void;
}) => {
    // Color Change Handler
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(event?.target?.value);
    };

    return (
        <div className="w-full flex flex-col gap-2 items-start">
            <div className="flex py-1 pr-2 flex-nowrap overflow-x-auto w-full gap-1 justify-start items-center">
                {colors.map((e) => {
                    return (
                        <ColorBox
                            key={e.name}
                            e={e}
                            selectedColor={selectedColor}
                            handleColorChange={handleColorChange}
                        ></ColorBox>
                    );
                })}
            </div>
        </div>
    );
};

export default ColorPicker;
