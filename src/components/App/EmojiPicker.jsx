import { SmileIcon, X } from "lucide-react";
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
	const [searchValue, setSearchValue] = useState("");

	const handleIconChange = (event) => {
		setSelectedIcon(event.target.value);
	};

	return (
		<div
			className={`flex ${showModal ? "translate-y-0" : "translate-y-200"} transition-all overflow-scroll max-h-9/10 ms:bottom-4 ms:max-w-9/10  ms:rounded-4xl ease-in-out duration-300 flex-col absolute bottom-0 w-full left-1/2 -translate-x-1/2 md:max-w-2xl p-4 gap-4 z-50 rounded-t-4xl bg-surface shadow-large`}
		>
			<div className="w-ful flex justify-between items-center">
				<h2 className="px-1 font-bold text-3xl text-primary dark:text-primary-300">
					Select Icon
				</h2>
				<button
					onClick={() => setShowModal(false)}
					className="text-secondary-600 disabled:cursor-not-allowed hover:text-red-600 duration-300 ease-in-out"
				>
					<X></X>
				</button>
			</div>
			<div className="flex gap-2 justify-center items-center w-full">
				<SearchBar
					full={true}
					ph="Search Icon"
					title="Search Icon"
					searchValue={searchValue}
					setSearchValue={setSearchValue}
				/>
				<button
					title="Enter Emoji"
					className="flex justify-center items-center h-11.5 aspect-square rounded-full bg-surface font-semibold hover:bg-primary-600 transition-all duration-300 ease-in-out text-gray-500 hover:text-gray-700 shadow-medium"
				>
					<SmileIcon></SmileIcon>
				</button>
			</div>
			<div className="ease-in-out rounded-t-3xl -mb-4 ms:rounded-3xl ms:m-0 w-full overflow-y-auto duration-300 content-start gap-2 h-auto grid grid-cols-[repeat(auto-fit,minmax(48px,1fr))] min-h-100 relative">
				{searchValue.trim().length > 0 ? (
					emojis.filter((e) =>
						e.title
							.toLowerCase()
							.includes(searchValue.toLowerCase()),
					).length === 0 ? (
						<p className="absolute top-1/2 left-1/2 -translate-1/2 text-center text-gray-400">
							No icons found
						</p>
					) : (
						emojis
							.filter((e) =>
								e.title
									.toLowerCase()
									.includes(searchValue.toLowerCase()),
							)
							.map((e) => (
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
		</div>
	);
};

export default EmojiPicker;
