import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import DialPad from "../DialPad";
import useData from "../../../hooks/Data";
import SearchBar from "../Account/SearchBar";
import CurrencyCard from "../Account/CurrencyCard";

import useAuth from "../../../hooks/Auth";
import toast from "react-hot-toast";
import { AddAccount, EditAccount } from "../../../api/AccountsAPI";
import ColorPicker from "./ColorPicker";

const AccountsModal = ({ typeOfModal, Cancel, editObj = null }) => {
	// Loading State
	const [isLoading, setIsLoading] = useState(false);

	const { user, accessToken } = useAuth();
	const [showDialPad, setShowDialPad] = useState(false);
	const { currencies } = useData();

	// Form Details
	const [name, setName] = useState(
		typeOfModal === "Edit" ? editObj.name : "",
	);
	const [balance, setBalance] = useState(
		typeOfModal === "Edit" ? editObj.balance : 0,
	);
	const [dP, setDP] = useState(
		typeOfModal === "Edit" ? editObj.decimalPrecision : 0,
	);
	const [selectedColor, setSelectedColor] = useState(
		typeOfModal === "Edit" ? editObj.bgColor : "Default",
	);
	const [selectedCurrency, setSelectedCurrency] = useState(
		typeOfModal === "Edit" ? editObj.currency : user?.defaultCurrency,
	);

	//   By Default select user's default currency

	useEffect(() => {
		setSelectedCurrency(user?.defaultCurrency); //eslint-disable-line

		if (user?.defaultCurrency) {
			const indexOfCurrency = currencies.findIndex(
				(e) => e.code === user?.defaultCurrency.code,
			);

			// Remove it from there and store it.
			const removedCurrency = currencies.splice(indexOfCurrency, 1);

			// Add it to the start
			currencies.unshift(removedCurrency[0]);
		}
	}, [user, currencies]);

	const [searchValue, setSearchValue] = useState("");

	const handleCurrencyChange = (event) => {
		const currency = JSON.parse(event.target.value);
		setSelectedCurrency(currency);

		// Find Currency in the array.
		const indexOfCurrency = currencies.findIndex(
			(e) => e.code === currency.code,
		);

		// Remove it from there and store it.
		const removedCurrency = currencies.splice(indexOfCurrency, 1);

		// Add it to the start
		currencies.unshift(removedCurrency[0]);
	};

	const handleCreation = async () => {
		setName((prev) => prev.trim());
		if (!name) {
			return toast.error("Account name is required");
		}
		setIsLoading(true);
		try {
			const res = await AddAccount({
				name: name,
				balance: balance,
				decimalPrecision: dP,
				bgColor: selectedColor,
				currency: selectedCurrency,
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

	const handleEdit = async () => {
		setName((prev) => prev.trim());
		if (!name) {
			return toast.error("Account name is required");
		}
		setIsLoading(true);
		try {
			const res = await EditAccount({
				name: name,
				decimalPrecision: dP,
				bgColor: selectedColor,
				currency: selectedCurrency,
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

	return (
		<div className="fixed starting:scale-0 starting:opacity-0 transition-all opacity-100 scale-100 ease-in-out duration-300 inset-0 z-5 backdrop-blur-sm flex justify-center items-center">
			<div
				className={`flex max-h-9/10 flex-col bg-surface justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-6 rounded-5xl w-[90%] md:w-2/3 lg:w-1/2 gap-4`}
			>
				{/* Header */}

				<div className="flex justify-between items-center w-full">
					<h2 className="px-1 font-bold text-3xl text-primary">
						{typeOfModal === "Add" ? "Add" : "Edit"} Account
					</h2>
					<span
						onClick={Cancel}
						disabled={isLoading}
						className="text-secondary-600 disabled:cursor-not-allowed hover:text-red-600 duration-300 ease-in-out"
					>
						<X></X>
					</span>
				</div>

				{/* Main Content */}

				<div className="flex flex-col justify-center items-center w-full gap-2">
					{/* Account Name */}
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
						className="border-none px-1 w-full text-center outline-none text-2xl font-bold"
						placeholder="Account Name"
					/>

					{/* Balance */}
					<div className="w-full font-medium text-lg flex justify-center items-end gap-2">
						{typeOfModal === "Edit"
							? "Current Balance"
							: "Starting from"}
						<button
							onClick={() => {
								typeOfModal === "Add" &&
									setShowDialPad((prev) => !prev);
							}}
							className={`font-bold text-2xl bg-gray-200 p-1 rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
						>
							{selectedCurrency?.symbol}
							{balance.toFixed(dP)}
						</button>
					</div>

					{/* Decimal Precision */}
					<div className="w-full font-medium text-xl flex justify-center items-center gap-2">
						<h3 className="text-xl font-bold">
							Decimal Precision:
						</h3>
						<div className="flex justify-center items-center gap-1">
							<button
								onClick={() => {
									setDP((prev) => prev - 1);
									setShowDialPad(false);
								}}
								disabled={dP === 0 ? true : false}
								className="disabled:bg-red-300 bg-red-500  text-white mt-1 cursor-pointer active:scale-95 duration-300 ease-in-out rounded-full p-1"
							>
								<Minus strokeWidth={3.5} size={12}></Minus>
							</button>

							<span
								className={`font-bold text-3xl rounded-xl cursor-pointer active:scale-95 duration-300 ease-in-out`}
							>
								{dP}
							</span>
							<button
								onClick={() => {
									setDP((prev) => prev + 1);
									setShowDialPad(false);
								}}
								disabled={dP === 9 ? true : false}
								className="bg-primary text-white mt-1 cursor-pointer active:scale-95 duration-300 ease-in-out rounded-full p-1"
							>
								<Plus strokeWidth={3.5} size={12}></Plus>
							</button>
						</div>
					</div>

					{/* Color Picker */}
					<ColorPicker
						heading="Color"
						selectedColor={selectedColor}
						setSelectedColor={setSelectedColor}
					></ColorPicker>

					{/* Currency */}

					<div className="w-full flex flex-col gap-2 items-start max-h-70 md:max-h-90 overflow-scroll">
						<h4 className="font-bold text-xl">Currency:</h4>
						<div className="flex relative justify-between px-2 gap-2 items-center w-full">
							<SearchBar
								full={true}
								ph={
									"Search currency by name or currency code..."
								}
								title={
									"Search currency by name or currency code..."
								}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
							></SearchBar>
						</div>
						<div
							className={`ease-in-out w-full overflow-y-auto duration-300 h-auto grid grid-cols-[repeat(auto-fit,minmax(125px,1fr))] `}
						>
							{searchValue?.trim().length > 0
								? currencies.map((e) => {
										if (
											e?.code
												?.toLowerCase()
												.includes(
													searchValue.toLowerCase(),
												) ||
											e?.country
												?.toLowerCase()
												.includes(
													searchValue.toLowerCase(),
												)
										) {
											return (
												<CurrencyCard
													key={e.code}
													e={e}
													selectedCurrency={
														selectedCurrency
													}
													handleCurrencyChange={
														handleCurrencyChange
													}
												></CurrencyCard>
											);
										}
									})
								: currencies.map((e) => {
										return (
											<CurrencyCard
												key={e.code}
												e={e}
												selectedCurrency={
													selectedCurrency
												}
												handleCurrencyChange={
													handleCurrencyChange
												}
											></CurrencyCard>
										);
									})}
						</div>
					</div>
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
						onClick={
							typeOfModal === "Add"
								? handleCreation
								: typeOfModal === "Edit"
									? handleEdit
									: null
						}
						className="px-4 disabled:bg-primary-400 disabled:active:scale-100 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-2 rounded-full bg-primary hover:bg-primary-hover text-white hover:bg-primary-800 duration-300 ease-in-out"
					>
						{typeOfModal === "Add" ? "Create" : "Update"} Account
					</button>
				</div>
			</div>
			<DialPad
				dP={dP}
				text="Balance"
				input={balance}
				showModal={showDialPad}
				setShowModal={setShowDialPad}
				setInput={setBalance}
				currencySymbol={selectedCurrency?.symbol}
			></DialPad>
		</div>
	);
};

export default AccountsModal;
