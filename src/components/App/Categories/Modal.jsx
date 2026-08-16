import { X, LoaderCircle } from "lucide-react";
import { useState } from "react";

import useAuth from "../../../hooks/Auth";
import toast from "react-hot-toast";
import { CreateCategory, UpdateCategory } from "../../../api/CategoryAPI.js";
import ColorPicker from "../Common/ColorPicker.jsx";
import useData from "../../../hooks/Data";
import EmojiPicker from "../Common/EmojiPicker.jsx";

const handleCreation = async ({
	name,
	selectedColor,
	selectedIcon,
	slider,
	setIsLoading,
	Cancel,
	accessToken,
	GetData
}) => {
	if (!name.trim()) {
		return toast.error("Please enter a category name.");
	}
	setIsLoading(true);
	try {
		const res = await CreateCategory({
			name: name,
			bgColor: selectedColor,
			categoryType: slider === 0 ? "expense" : "income",
			icon: selectedIcon,
			token: accessToken,
		});
		if (res.success) {
			toast.success("Category created successfully!");
			setIsLoading(false);
			GetData()
			Cancel();
			return;
		} else {
			setIsLoading(false);
			return toast.error(res.error.message);
		}
	} catch (error) {
		setIsLoading(false);
		if (error.response) {
			return toast.error(error.response.data.error.message);
		} else {
			return toast.error(error.message);
		}
	}
};

const handleEdit = async ({
	name,
	selectedColor,
	selectedIcon,
	slider,
	editObj,
	setIsLoading,
	Cancel,
	accessToken,
	isTypeEditable,
	GetData,
}) => {
	if (!name.trim()) {
		return toast.error("Please enter a category name.");
	}
	setIsLoading(true);

	
	try {
		const res = await UpdateCategory({
			name: name,
			bgColor: selectedColor,
			categoryType: isTypeEditable
				? slider === 0
					? "expense"
					: "income"
				: null,
			icon: selectedIcon,
			categoryID: editObj.categoryID,
			token: accessToken,
		});
		if (res.success) {
			toast.success("Category updated successfully!");
			setIsLoading(false);
			GetData()
			Cancel();
			return;
		} else {
			setIsLoading(false);
			return toast.error(res.error.message);
		}
	} catch (error) {
		setIsLoading(false);
		if (error.response) {
			return toast.error(error.response.data.error.message);
		} else {
			return toast.error(error.message);
		}
	}
};

const CategoriesModal = ({ typeOfModal, Cancel, editObj = null, GetData}) => {
	// Global Data
	const { colors, transactions } = useData();
	const { accessToken } = useAuth();

	// States
	const [isLoading, setIsLoading] = useState(false);
	const [showIconModal, setShowIconModal] = useState(false);
	
	// Checks if any transactions are linked to the category being edited. If there are, the category type cannot be changed.If not then check type of Modal if it is an edit modal dont allow to edit.
	const isTypeEditable =
	transactions.filter((e) => e.category === editObj?._id).length === 0
	? true
	: typeOfModal === "Add"
	? true
	: false;
	
	// Form Details
	const [name, setName] = useState(
		typeOfModal === "Edit" ? editObj.name : "",
	);
	const [selectedColor, setSelectedColor] = useState(
		typeOfModal === "Edit" ? editObj.bgColor : "Secondary",
	);
	const [selectedIcon, setSelectedIcon] = useState(
		typeOfModal === "Edit" ? editObj.icon : "🖼",
	);
	
	const [slider, setSlider] = useState(typeOfModal === "Edit" ? (editObj.categoryType === "expense" ? 0 : 1) : 0);
	// Button Click Handler
	const handleButtonClick = () => {
		if (typeOfModal === "Add") {
			handleCreation({
				name,
				selectedColor,
				selectedIcon,
				slider,
				setIsLoading,
				Cancel,
				accessToken,
				GetData
			});
		} else if (typeOfModal === "Edit") {
			handleEdit({
				name,
				selectedColor,
				selectedIcon,
				slider,
				editObj,
				setIsLoading,
				Cancel,
				accessToken,
				isTypeEditable,
				GetData
			});
		}
	};

	return (
		<div className="fixed start:scale-0 start:opacity-0 transition-all opacity-100 scale-100 ease-in-out duration-300 inset-0 z-5 backdrop-blur-sm flex justify-center items-center">
			<div
				className={`flex max-h-9/10 flex-col bg-surface dark:bg-gray-900 justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-6 rounded-5xl w-[90%] md:w-2/3 lg:w-1/2 gap-4`}
			>
				{/* Header */}

				<div className="flex justify-between items-center w-full">
					<h2 className="px-1 font-bold text-3xl text-primary">
						{typeOfModal === "Add" ? "Create" : "Edit"} Category
					</h2>
					<button
						onClick={Cancel}
						disabled={isLoading}
						className="text-secondary-600 disabled:cursor-not-allowed hover:text-red-600 duration-300 ease-in-out"
					>
						<X></X>
					</button>
				</div>

				{/* Main Content */}

				<div className="flex flex-col justify-center items-center w-full gap-2">
					{/* Category Type Selector */}
					{isTypeEditable && (
						<div className="flex justify-center items-center w-full">
							<div
								className={`flex duration-300 ease-in-out bg-gray-100 dark:bg-gray-800 justify-center items-center rounded-full relative`}
							>
								<div
									className={`absolute shadow-medium top-0 left-0 w-1/2 h-full rounded-full bg-surface dark:bg-gray-700 duration-300 ease-in-out`}
									style={{
										transform: `translateX(${slider * 100}%)`,
									}}
								></div>
								<div
									onClick={() => {
										setSlider(0);
									}}
									className={`w-1/2 p-3 px-5 z-3 flex justify-center items-center shrink-0 rounded-full text-red-500 cursor-pointer duration-300 ease-in-out ${slider === 0 && "font-semibold"}`}
								>
									Expense
								</div>
								<div
									onClick={() => {
										setSlider(1);
									}}
									className={`w-1/2 p-3 px-5 z-3 flex justify-center items-center shrink-0 rounded-full text-primary cursor-pointer duration-300 ease-in-out ${slider === 1 && "font-semibold"}`}
								>
									Income
								</div>
							</div>
						</div>
					)}

					{/* Icon and Account Name */}
					<div className="flex justify-start items-center gap-2 w-full">
						<button
							onClick={() => setShowIconModal((prev) => !prev)}
							className={`w-16 h-16 shrink-0 text-4xl ${colors.filter((e) => e.name === selectedColor)[0].color} rounded-full`}
						>
							{selectedIcon}
						</button>
						<input
							type="text"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							className="border-transparent p-1 focus:bg-app dark:focus:bg-gray-800 w-full rounded-t-xl border-b-2 focus:border-primary outline-none text-2xl font-bold"
							placeholder="Category Name"
						/>
					</div>

					{/* Color Picker */}

					<ColorPicker
						heading="Color"
						selectedColor={selectedColor}
						setSelectedColor={setSelectedColor}
					></ColorPicker>
				</div>

				{/* Buttons */}

				<div className="flex justify-end items-center w-full gap-2">
					<button
						onClick={Cancel}
						disabled={isLoading}
						className="px-4 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-2 rounded-full bg-app dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 duration-300 ease-in-out"
					>
						Cancel
					</button>
					<button
						disabled={isLoading}
						onClick={handleButtonClick}
						className="px-4 gap-2 flex disabled:active:scale-100 disabled:cursor-not-allowed disabled:bg-primary/70 cursor-pointer active:scale-95 py-2 rounded-full bg-primary hover:bg-primary-hover text-white hover:bg-primary-800 duration-300 ease-in-out"
					>
						{isLoading && <LoaderCircle className="animate-spin"></LoaderCircle>}{typeOfModal === "Add" ? "Create" : "Update"} Category
					</button>
				</div>
			</div>
			<EmojiPicker
				showModal={showIconModal}
				setShowModal={setShowIconModal}
				setSelectedIcon={setSelectedIcon}
				selectedIcon={selectedIcon}
			/>
		</div>
	);
};

export default CategoriesModal;
