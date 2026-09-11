const Menu = ({
    slider,
    setSlider,
}: {
    slider: number;
    setSlider: (value: number) => void;
}) => {
    return (
        <div className="flex justify-center items-center w-full">
            <div
                className={`flex duration-300 ease-in-out bg-surface shadow-small dark:bg-gray-800 justify-center items-center rounded-full relative xs:w-fit w-full`}
            >
                <div
                    className={`absolute bg-primary shadow-medium top-0 left-0 w-1/3 h-full rounded-full duration-300 ease-in-out`}
                    style={{
                        transform: `translateX(${slider * 100}%)`,
                    }}
                ></div>
                <div
                    onClick={() => {
                        setSlider(0);
                    }}
                    className={`w-1/3 p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full cursor-pointer duration-300 ease-in-out ${slider === 0 ? "text-white font-semibold " : "font-normal text-black dark:text-white "}`}
                >
                    Details
                </div>
                <div
                    onClick={() => {
                        setSlider(1);
                    }}
                    className={`w-1/3 p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full cursor-pointer duration-300 ease-in-out ${slider === 1 ? "text-white font-semibold " : "font-normal text-black dark:text-white "}`}
                >
                    Devices
                </div>
                <div
                    onClick={() => {
                        setSlider(2);
                    }}
                    className={`w-1/3 p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full cursor-pointer duration-300 ease-in-out ${slider === 2 ? "text-white font-semibold" : "font-normal text-black dark:text-white "}`}
                >
                    Actions
                </div>
            </div>
        </div>
    );
};

export default Menu;
