const BudgetTypeSelector = ({
    slider,
    setSlider,
    showAll = false,
}: {
    slider: number;
    setSlider: (data: number | (() => number)) => void;
    showAll?: boolean;
}) => {
    return (
        <div className="flex justify-center items-center w-full">
            <div
                className={`flex duration-300 ease-in-out bg-surface/70 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 justify-center items-center rounded-full relative ms:w-fit w-full`}
            >
                <div
                    className={`absolute dark:bg-gray-700 dark:border-transparent shadow-medium top-0 left-0 ${showAll ? "w-1/3" : "w-1/2"} h-full rounded-full bg-surface duration-300 ease-in-out`}
                    style={{
                        transform: `translateX(${slider * 100}%)`,
                    }}
                ></div>
                {showAll && (
                    <button
                        onClick={() => setSlider(0)}
                        className={`${showAll ? "w-1/3" : "w-1/2"} disabled:cursor-not-allowed p-3 px-8 z-3 flex justify-center items-center shrink-0 rounded-full cursor-pointer duration-300 ease-in-out ${slider === 0 && "font-bold"}`}
                    >
                        All
                    </button>
                )}
                <button
                    onClick={() => (showAll ? setSlider(1) : setSlider(0))}
                    className={`${showAll ? "w-1/3" : "w-1/2"} disabled:cursor-not-allowed p-3 px-8 z-3 flex justify-center items-center shrink-0 rounded-full text-blue-500 cursor-pointer duration-300 ease-in-out ${((!showAll && slider === 0) || (showAll && slider === 1)) && "font-semibold"}`}
                >
                    Once
                </button>
                <button
                    onClick={() => (showAll ? setSlider(2) : setSlider(1))}
                    className={`${showAll ? "w-1/3" : "w-1/2"} disabled:cursor-not-allowed p-3 px-8 z-3 flex justify-center items-center shrink-0 rounded-full text-primary cursor-pointer duration-300 ease-in-out ${((!showAll && slider === 1) || (showAll && slider === 2)) && "font-semibold"}`}
                >
                    Repeated
                </button>
            </div>
        </div>
    );
};

export default BudgetTypeSelector;
