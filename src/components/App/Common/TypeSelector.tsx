const TypeSelector = ({
    slider,
    setSlider,
    show4 = false,
    showAll = false,
    extraFunc,
    disabledOnes,
}: {
    slider: number;
    setSlider: (data: number | (() => number)) => void;
    show4?: boolean;
    showAll?: boolean;
    extraFunc?: (num?: number) => void;
    disabledOnes?: {
        a?: boolean;
        b?: boolean;
        c?: boolean;
        d?: boolean;
    };
}) => {
    return (
        <div className="flex justify-center items-center w-full">
            <div
                className={`flex duration-300 ease-in-out bg-surface/70 shadow-small dark:bg-gray-800 justify-center items-center rounded-full relative ms:w-fit w-full`}
            >
                <div
                    className={`absolute dark:bg-gray-700 shadow-medium top-0 left-0 ${show4 && showAll ? "w-1/4" : !showAll && !show4 ? "w-1/2" : "w-1/3"} h-full rounded-full bg-surface duration-300 ease-in-out`}
                    style={{
                        transform: `translateX(${slider * 100}%)`,
                    }}
                ></div>
                {showAll && (
                    <button
                        disabled={disabledOnes?.a}
                        onClick={() =>
                            setSlider(() => {
                                extraFunc?.(0);
                                return 0;
                            })
                        }
                        className={`${show4 && showAll ? "w-1/4" : !showAll && !show4 ? "w-1/2" : "w-1/3"} disabled:cursor-not-allowed p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-ful3 cursor-pointer duration-300 ease-in-out ${slider === 0 && "font-bold"}`}
                    >
                        All
                    </button>
                )}
                <button
                    disabled={disabledOnes?.b}
                    onClick={() => {
                        if (showAll)
                            setSlider(() => {
                                extraFunc?.(1);
                                return 1;
                            });
                        else
                            setSlider(() => {
                                extraFunc?.(0);
                                return 0;
                            });
                    }}
                    className={`${show4 && showAll ? "w-1/4" : !showAll && !show4 ? "w-1/2" : "w-1/3"} disabled:cursor-not-allowed p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full text-red-500 cursor-pointer duration-300 ease-in-out ${((!showAll && slider === 0) || (showAll && slider === 1)) && "font-semibold"}`}
                >
                    Expense
                </button>
                <button
                    disabled={disabledOnes?.c}
                    onClick={() => {
                        if (showAll)
                            setSlider(() => {
                                extraFunc?.(2);
                                return 2;
                            });
                        else
                            setSlider(() => {
                                extraFunc?.(1);
                                return 1;
                            });
                    }}
                    className={`${show4 && showAll ? "w-1/4" : !showAll && !show4 ? "w-1/2" : "w-1/3"} disabled:cursor-not-allowed p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full text-primary cursor-pointer duration-300 ease-in-out ${((!showAll && slider === 1) || (showAll && slider === 2)) && "font-semibold"}`}
                >
                    Income
                </button>
                {show4 && (
                    <button
                        disabled={disabledOnes?.d}
                        onClick={() => {
                            if (showAll)
                                setSlider(() => {
                                    extraFunc?.(3);
                                    return 3;
                                });
                            else
                                setSlider(() => {
                                    extraFunc?.(2);
                                    return 2;
                                });
                        }}
                        className={`${show4 && showAll ? "w-1/4" : !showAll && !show4 ? "w-1/2" : "w-1/3"} disabled:cursor-not-allowed p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full text-blue-500 cursor-pointer duration-300 ease-in-out ${((!showAll && slider === 2) || slider === 3) && "font-semibold"}`}
                    >
                        Transfer
                    </button>
                )}
            </div>
        </div>
    );
};

export default TypeSelector;
