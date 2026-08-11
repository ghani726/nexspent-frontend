import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import DialPad from "../DialPad";

import useAuth from "../../../hooks/Auth";
import toast from "react-hot-toast";
import { AddAccount, EditAccount } from "../../../api/AccountsAPI";
import ColorPicker from "../Accounts/ColorPicker";
import useData from "../../../hooks/Data";
import EmojiPicker from "../EmojiPicker";

const handleCreation = async ({
	setName,
	setIsLoading,
	Cancel,
	amount,
	selectedColor,
	accessToken,
}) => {
	setName((prev) => prev.trim());
	if (!name) {
		return toast.error("Account name is required");
	}
	setIsLoading(true);
	try {
		const res = await AddAccount({
			name: name,
			amount: amount,
			bgColor: selectedColor,
			token: accessToken,
		});
		if (res.success) {
			toast.success("Account added successfully!");
			setIsLoading(false);
			// setShowModal(false);
			Cancel();
			return;
		} else {
			return toast.error(res.error.message);
		}
	} catch (error) {
		setIsLoading(false);
		if (error.response) {
			return toast.error(error.response.data.message);
		} else {
			return toast.error(error.message);
		}
	}
};

const handleEdit = async ({
	setName,
	setIsLoading,
	Cancel,
	accessToken,
	editObj,
	selectedColor,
}) => {
	setName((prev) => prev.trim());
	if (!name) {
		return toast.error("Account name is required");
	}
	setIsLoading(true);
	try {
		const res = await EditAccount({
			name: name,

			bgColor: selectedColor,

			accountID: editObj.accountID,
			token: accessToken,
		});
		if (res.success) {
			toast.success("Account updated successfully!");
			setIsLoading(false);
			// setShowModal(false);
			Cancel();
			return;
		} else {
			return toast.error(res.error.message);
		}
	} catch (error) {
		setIsLoading(false);
		if (error.response) {
			return toast.error(error.response.data.message);
		} else {
			return toast.error(error.message);
		}
	}
};

const AccountsModal = ({ typeOfModal, Cancel, editObj = null }) => {
	// End Date Ref
	const endDateRef = useRef(null);

	// Format current date to YYYY-MM-DD
	const today = new Date().toISOString().split("T")[0];
	// States
	const [isLoading, setIsLoading] = useState(false);
	const [showDialPad, setShowDialPad] = useState(false);
	const [showIconModal, setShowIconModal] = useState(false);

	// Global Data
	const { colors } = useData();
	const { user, accessToken } = useAuth();

	// Form Details
	const [name, setName] = useState(
		typeOfModal === "Edit" ? editObj.name : "",
	);
	const [amount, setAmount] = useState(
		typeOfModal === "Edit" ? editObj.amount : 0,
	);
	const [selectedColor, setSelectedColor] = useState(
		typeOfModal === "Edit" ? editObj.bgColor : "Secondary",
	);
	const [selectedIcon, setSelectedIcon] = useState(
		typeOfModal === "Edit" ? editObj.icon : "🖼",
	);
	const [startDate, setStartDate] = useState(today);
	const [endDate, setEndDate] = useState("");

	// Button Click Handler
	const handleButtonClick = () => {
		if (typeOfModal === "Add") {
			handleCreation({
				setName,
				setIsLoading,
				Cancel,
				amount,
				selectedColor,
				accessToken,
			});
		} else if (typeOfModal === "Edit") {
			handleEdit({
				setName,
				setIsLoading,
				Cancel,
				accessToken,
				editObj,
				selectedColor,
			});
		}
	};

	useEffect(() => {
		if(startDate > endDate && endDate !== "") {
			toast.error("End date cannot be before start date");
			setEndDate("");  //eslint-disable-line
		}
	}, [startDate, endDate]);

	return (
		<div className="fixed start:scale-0 start:opacity-0 transition-all opacity-100 scale-100 ease-in-out duration-300 inset-0 z-5 backdrop-blur-sm flex justify-center items-center">
			<div
				className={`flex max-h-9/10 flex-col bg-surface justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-6 rounded-5xl w-[90%] md:w-2/3 lg:w-1/2 gap-4`}
			>
				{/* Header */}

				<div className="flex justify-between items-center w-full">
					<h2 className="px-1 font-bold text-3xl text-primary">
						{typeOfModal === "Add" ? "Create" : "Edit"} Goal
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
							onClick={() => setShowDialPad(false)}
							onKeyDown={(e) =>
								e.key === "Enter" && e.preventDefault()
							}
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							className="border-transparent p-1 focus:bg-app w-full rounded-t-xl border-b-2 focus:border-primary outline-none text-2xl font-bold"
							placeholder="Account Name"
						/>
					</div>

					{/* Amount */}
					<div className="w-full font-medium text-lg flex justify-center items-end gap-2">
						Target to save
						<button
							onClick={() => {
								typeOfModal === "Add" &&
									setShowDialPad((prev) => !prev);
							}}
							className={`font-bold text-2xl bg-gray-200 p-1 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
						>
							{user?.defaultCurrency?.symbol}
							{amount.toLocaleString()}
						</button>
					</div>

					<div
						className={`w-full font-medium text-lg flex flex-col justify-center items-center gap-2`}
					>
						<input
							type="date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className={`font-bold text-2xl bg-gray-200 p-1 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
						/>
						<div
							className={`font-bold text-2xl bg-gray-200 p-1 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out relative`}
						>
							<input
								ref={endDateRef}
								type="date"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								className={`font-bold ${!endDate && "invisible w-0 h-0"} peer text-2xl bg-gray-200 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
							/>
							{!endDate && (
								<span
									onClick={() => {
										if (endDateRef.current) {
											endDateRef.current.showPicker
												? endDateRef.current.showPicker()
												: endDateRef.current.click();
										}
									}}
									className="text-gray-500"
								>
									Until Forever
								</span>
							)}
						</div>
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
						className="px-4 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-2 rounded-full bg-app hover:bg-gray-200  duration-300 ease-in-out"
					>
						Cancel
					</button>
					<button
						disabled={isLoading}
						onClick={handleButtonClick}
						className="px-4 disabled:bg-primary-400 disabled:active:scale-100 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-2 rounded-full bg-primary hover:bg-primary-hover text-white hover:bg-primary-800 duration-300 ease-in-out"
					>
						{typeOfModal === "Add" ? "Create" : "Update"} Goal
					</button>
				</div>
			</div>
			<DialPad
				dP={user?.defaultDecimalPrecision}
				text="Balance"
				input={amount}
				showModal={showDialPad}
				setShowModal={setShowDialPad}
				setInput={setAmount}
				currencySymbol={user?.defaultCurrency?.symbol}
			></DialPad>
			<EmojiPicker
				showModal={showIconModal}
				setShowModal={setShowIconModal}
				setSelectedIcon={setSelectedIcon}
				selectedIcon={selectedIcon}
			/>
		</div>
	);
};

export default AccountsModal;
