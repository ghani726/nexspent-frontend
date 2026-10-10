import { X } from "lucide-react";

const Selector = ({
    showModal,
    setShowModal,
    value,
    setValue,
    title,
    values,
}: {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    value: string | number;
    setValue: (value: string | number) => void;
    title: string;
    values: { title: string; value: number | string }[];
}) => {
    return (
        <div
            onClick={() => setShowModal(false)}
            className={`fixed inset-0 z-10 flex justify-center items-end ms:items-center bg-gray-900/50  backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
                showModal
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex ${showModal ? "translate-y-0" : "translate-y-220"} transition-transform overflow-auto max-h-9/10 ms:rounded-4xl ease-in-out duration-300 flex-col absolute w-full ms:max-w-9/10 md:max-w-2xl p-4 gap-4 z-50 dark:shadow-primary dark:shadow-small rounded-t-4xl bg-emerald-50 dark:bg-gray-900 shadow-large`}
            >
                <div className="w-ful flex justify-between items-center">
                    <h2 className="px-1 font-bold text-3xl text-primary dark:text-primary-300">
                        Select {title}
                    </h2>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-600 p-2 hover:bg-red-100 aspect-square rounded-full disabled:cursor-not-allowed hover:text-red-600 duration-300 ease-in-out"
                    >
                        <X></X>
                    </button>
                </div>

                <div
                    className={`gap-1 flex flex-col justify-start items-start flex-wrap w-full rounded-4xl`}
                >
                    {values.map((val) => {
                        return (
                            <label key={val.value} className="relative w-full">
                                <input
                                    type="radio"
                                    name={title}
                                    value={val.value}
                                    checked={value === val.value}
                                    onChange={() => {
                                        setValue(val.value);
                                        setShowModal(false);
                                    }}
                                    className="peer sr-only"
                                />
                                <div
                                    className={`peer-checked:bg-primary peer-checked:text-white peer-checked:border-transparent peer-checked:font-medium cursor-pointer flex justify-between items-center w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 px-6  gap-4 rounded-full `}
                                    title={val.title}
                                >
                                    <p>{val.title}</p>
                                    <div
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${value === val.value ? "border-white bg-white" : "border-gray-300 dark:border-gray-500"}
    `}
                                    >
                                        {value === val.value && (
                                            <div className="w-3 h-3 rounded-full bg-emerald-600" />
                                        )}
                                    </div>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Selector;
