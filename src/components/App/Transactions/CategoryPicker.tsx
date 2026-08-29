import { X } from "lucide-react";
import useData from "../../../hooks/Data";
import TypeSelector from "../Common/TypeSelector";
import { useState } from "react";
const CategoryPicker = ({
    showModal,
    setShowModal,
    selectedCategory,
    setSelectedCategory,
    slider,
    setSlider,
    setDisabledOnes,
}: {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    selectedCategory: string | null;
    setSelectedCategory: (value: string) => void;
    slider: number;
    setSlider: (value: number) => void;
    setDisabledOnes: ({ b, c }: { b: boolean; c: boolean }) => void;
}) => {
    interface Category {
        _id: string;
        bgColor: string;
        categoryType: "expense" | "income";
        icon: string;
        name: string;
    }

    interface Color {
        name: string;
        color: string;
    }
    const {
        categories,
        colors,
    }: {
        categories: Category[];
        colors: Color[];
    } = useData();

    const [value, setValue] = useState<number>(slider);

    const ShowCategories = () => {
        let filtered: Category[] = [];
        if (!value) {
            filtered = categories.filter(
                (e: Category) => e.categoryType === "expense",
            );
        } else if (value) {
            filtered = categories.filter(
                (e: Category) => e.categoryType === "income",
            );
        }

        return filtered.map((e: Category) => {
            const bgColor = colors.filter((c: Color) => c.name === e.bgColor)[0]
                .color;
            return (
                <label
                    title={e.name}
                    key={e._id}
                    id={e.name + "_" + e.categoryType}
                    className={`relative cursor-pointer p-1 flex flex-col w-16 aspect-square gap-1`}
                >
                    <input
                        type="radio"
                        name="categorySelector"
                        value={e._id}
                        checked={selectedCategory === e._id}
                        onChange={(evt) => {
                            setSelectedCategory(evt.target.value);
                            if (e.categoryType === "expense") {
                                setSlider(0);
                                setDisabledOnes({ b: false, c: true });
                            } else if (e.categoryType === "income") {
                                setSlider(1);
                                setDisabledOnes({ b: true, c: false });
                            } else setDisabledOnes({ b: false, c: false });

                            setShowModal(false);
                        }}
                        className="peer hidden"
                    />
                    <div
                        className={`w-full flex justify-center items-center aspect-square text-3xl rounded-full peer-checked:ring-2 peer-checked:ring-black dark:peer-checked:ring-white peer-checked:shadow-large peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black ${bgColor}`}
                    >
                        {e.icon}
                    </div>
                    <p className="text-xs w-full text-center line-clamp-1">
                        {e.name}
                    </p>
                </label>
            );
        });
    };
    return (
        <div
            onClick={() => setShowModal(false)}
            className={`fixed inset-0 z-10 flex justify-center items-end ms:items-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
                showModal
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex ${showModal ? "translate-y-0" : "translate-y-220"} transition-transform overflow-auto max-h-9/10 ms:rounded-4xl ease-in-out duration-300 flex-col absolute w-full ms:max-w-9/10 md:max-w-2xl p-4 gap-4 z-50 rounded-t-4xl bg-surface dark:bg-gray-900 shadow-large`}
            >
                <div className="w-ful flex justify-between items-center">
                    <h2 className="px-1 font-bold text-3xl text-primary dark:text-primary-300">
                        Select Category
                    </h2>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-600 aspect-square rounded-full disabled:cursor-not-allowed hover:text-red-600 duration-300 ease-in-out px-1"
                    >
                        <X></X>
                    </button>
                </div>

                <TypeSelector
                    slider={value}
                    setSlider={setValue}
                ></TypeSelector>
                <div
                    className={`gap-1 p-2 flex justify-start items-start flex-wrap w-full rounded-4xl`}
                >
                    {ShowCategories()}
                </div>
            </div>
        </div>
    );
};

export default CategoryPicker;
