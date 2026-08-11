import { SmileIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import { isSingleEmoji } from "../../utils/emoji.js";
import { FaRegKeyboard } from "react-icons/fa6";
import SearchBar from "../App/Account/SearchBar";
import emojis from "../../utils/emoji";
import { useState } from "react";

const EmojiIcon = ({ e, selectedIcon, handleIconChange }) => {
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
				className="w-12 flex justify-center items-center aspect-square text-2xl rounded-full peer-checked:ring-2 peer-checked:ring-black peer-checked:shadow-large"
			>
				{e.icon}
			</div>
		</label>
	);
};
const EmojiPicker = ({
	showModal = true,
	setShowModal,
	setSelectedIcon,
	selectedIcon,
}) => {
	const [isKeyboardMode, setIsKeyboardMode] = useState(false);

	//#region    =>   Icon selector
	const [searchValue, setSearchValue] = useState("");

	const handleIconChange = (event) => {
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

	const handleKeyboardInputChange = (event) => {
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
			className={`flex resize-none [&::-webkit-resizer]:hidden ${showModal ? "translate-y-0 ms:top-1/2 ms:left-1/2 ms:-translate-1/2 h-fit ms:max-w-9/10" : "translate-y-200"} transition-all overflow-scroll max-h-9/10   ms:rounded-4xl ease-in-out duration-300 flex-col absolute bottom-0 w-full left-1/2 -translate-x-1/2 md:max-w-2xl p-4 gap-4 z-50 rounded-t-4xl bg-surface shadow-large`}
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
						className="w-full bg-surface shadow-medium h-11.5 px-4 rounded-full focus:border-primary border-2 border-transparent outline-none duration-300 ease-in-out"
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
					className="flex cursor-pointer active:scale-90 hover:ring-primary ring-2 ring-transparent justify-center items-center h-11.5 aspect-square rounded-full bg-surface font-semibold hover:bg-primary-600 transition-all duration-300 ease-in-out text-gray-500 hover:text-gray-700 shadow-medium"
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
							filteredEmojis.map((e) => (
								<EmojiIcon
									key={e.title}
									e={e}
									selectedIcon={selectedIcon}
									handleIconChange={handleIconChange}
								/>
							))
						)
					) : (
						emojis.map((e) => {
							return (
								<EmojiIcon
									key={e.title}
									e={e}
									selectedIcon={selectedIcon}
									handleIconChange={handleIconChange}
								/>
							);
						})
					)}
				</div>
			)}
		</div>
	);
};

export default EmojiPicker;
