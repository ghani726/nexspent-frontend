const TypeSelector = ({ slider, setSlider, show4 = false}) => {
    return (
        <div className="flex justify-center items-center w-full">
            <div
                className={`flex duration-300 ease-in-out bg-surface/70 dark:bg-gray-800 justify-center items-center rounded-full relative ${show4 && "max-w-full"}`}
            >
                <div
                    className={`absolute dark:bg-gray-700 shadow-medium top-0 left-0 ${show4 ? "w-1/4": "w-1/3"} h-full rounded-full bg-surface duration-300 ease-in-out`}
                    style={{
                        transform: `translateX(${slider * 100}%)`,
                    }}
                ></div>
                <div
                    onClick={() => {
                        setSlider(0);
                    }}
                    className={`${show4 ? "w-1/4": "w-1/3"} p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-ful3 cursor-pointer duration-300 ease-in-out ${slider === 0 && "font-semibold"}`}
                >
                    All
                </div>
                <div
                    onClick={() => {
                        setSlider(1);
                    }}
                    className={`${show4 ? "w-1/4": "w-1/3"} p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full text-red-500 cursor-pointer duration-300 ease-in-out ${slider === 1 && "font-semibold"}`}
                >
                    Expense
                </div>
                <div
                    onClick={() => {
                        setSlider(2);
                    }}
                    className={`${show4 ? "w-1/4": "w-1/3"} p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full text-primary cursor-pointer duration-300 ease-in-out ${slider === 2 && "font-semibold"}`}
                >
                    Income
                </div>
                {show4 && <div
                    onClick={() => {
                        setSlider(3);
                    }}
                    className={`${show4 ? "w-1/4": "w-1/3"} p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full text-blue-500 cursor-pointer duration-300 ease-in-out ${slider === 3 && "font-semibold"}`}
                >
                    Transfer
                </div>}
            </div>
        </div>
    );
};

export default TypeSelector;
