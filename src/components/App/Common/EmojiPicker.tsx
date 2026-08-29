import { SmileIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import { isSingleEmoji } from "../../../utils/emoji.js";
import { FaRegKeyboard } from "react-icons/fa6";
import SearchBar from "./SearchBar.js";
import emojis from "../../../utils/emoji.js";
import React, { useState } from "react";

interface Emoji {
    icon: string;
    names: string[];
    title: string;
}

const EmojiIcon = ({
    e,
    selectedIcon,
    handleIconChange,
}: {
    e: Emoji;
    selectedIcon: string;
    handleIconChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <label className="relative cursor-pointer p-1 flex h-11 w-11">
            <input
                type="radio"
                name="icons"
                value={e.icon}
                checked={selectedIcon === e.icon}
                onChange={handleIconChange}
                className="peer hidden"
            />
            <div
                title={e.title}
                className="w-12 flex justify-center items-center aspect-square text-2xl rounded-full peer-checked:ring-2 peer-checked:ring-black dark:peer-checked:ring-white peer-checked:shadow-large"
            >
                {e.icon}
            </div>
        </label>
    );
};

const EmojiPicker = ({
    showModal = true,
    setShowModal,
    selectedIcon,
    setSelectedIcon,
}: {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    selectedIcon: string;
    setSelectedIcon: (value: string) => void;
}) => {
    const [isKeyboardMode, setIsKeyboardMode] = useState(false);

    //#region    =>   Icon selector
    const [searchValue, setSearchValue] = useState("");

    const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIcon(event.target.value);
    };

    // Search
    const query = searchValue.trim().toLowerCase();

    const filteredEmojis = emojis.filter(
        (e) =>
            e.title.toLowerCase().includes(query) ||
            e.names.some((name) => name.toLowerCase().includes(query)),
    );
    //#endregion

    //#region    =>   Keyboard Mode

    const [keyboardInput, setKeyboardInput] = useState("");

    const handleKeyboardInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const input = event.target.value;

        if (isSingleEmoji(input)) {
            setSelectedIcon(input);
            setKeyboardInput(input);
        } else {
            toast.dismissAll();
            toast.error("Please enter a single emoji.");
            setKeyboardInput(input);
            setSelectedIcon("🖼");
        }
    };

    //#endregion
    return (
        <div
            onClick={() => setShowModal(false)}
            className={`fixed inset-0 z-50 flex justify-center items-end ms:items-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
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
                        {isKeyboardMode ? "Enter Emoji" : "Select Icon"}
                    </h2>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-secondary-600 disabled:cursor-not-allowed hover:text-red-600 duration-300 ease-in-out"
                    >
                        <X></X>
                    </button>
                </div>
                <div className="flex gap-2 justify-center items-center w-full">
                    {isKeyboardMode ? (
                        <input
                            type="text"
                            value={keyboardInput}
                            onChange={(e) => handleKeyboardInputChange(e)}
                            placeholder="Enter a single emoji..."
                            className="w-full bg-surface dark:bg-gray-800 shadow-medium h-11.5 px-4 rounded-full focus:border-primary border-2 border-transparent outline-none duration-300 ease-in-out"
                        />
                    ) : (
                        <SearchBar
                            full={true}
                            ph="Search Icon"
                            title="Search Icon"
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        />
                    )}
                    <button
                        onClick={() => setIsKeyboardMode((prev) => !prev)}
                        title={isKeyboardMode ? "Select Icon" : "Enter Emoji"}
                        className="flex cursor-pointer active:scale-90 hover:ring-primary ring-2 ring-transparent justify-center items-center h-11.5 aspect-square rounded-full bg-surface dark:bg-gray-800 font-semibold hover:bg-primary-600 transition-all duration-300 ease-in-out text-gray-500 hover:text-gray-700 dark:hover:text-gray-500 shadow-medium"
                    >
                        {isKeyboardMode ? (
                            <SmileIcon size={24}></SmileIcon>
                        ) : (
                            <FaRegKeyboard size={24} />
                        )}
                    </button>
                </div>
                {!isKeyboardMode && (
                    <div className="ease-in-out ms:h-full rounded-t-3xl -mb-4 ms:rounded-3xl ms:m-0 w-full overflow-y-auto duration-300 content-start gap-2 h-auto grid grid-cols-[repeat(auto-fit,minmax(48px,1fr))] min-h-100 relative">
                        {searchValue.trim().length > 0 ? (
                            filteredEmojis.length === 0 ? (
                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-400">
                                    No icons found
                                </p>
                            ) : (
                                filteredEmojis.map((e: Emoji) => (
                                    <EmojiIcon
                                        key={e.title}
                                        e={e}
                                        selectedIcon={selectedIcon}
                                        handleIconChange={handleIconChange}
                                    />
                                ))
                            )
                        ) : (
                            emojis.map((e: Emoji) => (
                                <EmojiIcon
                                    key={e.title}
                                    e={e}
                                    selectedIcon={selectedIcon}
                                    handleIconChange={handleIconChange}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmojiPicker;
