import AccountCard from "../../components/App/Accounts/AccountCard";
import { Info } from "lucide-react";
import AddButton from "../../components/App/AddButton";
import { useState } from "react";
import { useRef } from "react";
import AccountsModal from "../../components/App/Accounts/Modal";
import useData from "../../hooks/Data";
import InfoModal from "../../components/App/Accounts/InfoModal";
import DeleteModal from "../../components/App/Accounts/DeleteModal";
import toast from "react-hot-toast";
import { DeleteAccount } from "../../api/AccountsAPI.js";
import SearchBar from "../../components/App/Account/SearchBar";

const DeleteHandler = async ({
	objID,
	token,
	CancelDelete,
	GetData,
	setIsLoading,
}) => {
	setIsLoading(true);
	try {
		const res = await DeleteAccount({ accountID: objID, token });

		if (res.success) {
			setIsLoading(false);
			toast.success("Account Deleted successfully.");
			GetData();
			CancelDelete();
		} else {
			setIsLoading(false);
			return toast.error(res.error.message);
		}
	} catch (err) {
		setIsLoading(false);
		if (err.response) {
			return toast.error(err.response.data.error.message);
		} else {
			return toast.error(err.message);
		}
	}
};
const Accounts = ({ GetData }) => {
	//#region

	// Search
	const [searchValue, setSearchValue] = useState("");

	const acts = () => {
		// 1. Filter accounts based on search text
		const filteredAccounts = accounts.filter((act) => {
			const matchesSearch = searchValue.trim()
				? act.name.toLowerCase().includes(searchValue.toLowerCase())
				: true;
			return matchesSearch;
		});

		// 2. Map filtered array to JSX and RETURN it
		return filteredAccounts.map((e) => {
			const txns = transactions.filter((i) => i.account === e._id);
			return (
				<AccountCard
					key={e._id}
					name={e.name}
					balance={e.balance}
					currency={e.currency}
					accountsLength={accounts.length}
					transactions={0}
					bgColor={e.bgColor}
					transactions={txns}
					obj={e}
					EditFunc={EditFunc}
					DeleteFunc={DeleteFunc}
				></AccountCard>
			);
		});
	};
	// Modal states
	const [showModal, setShowModal] = useState(false);
	const [showInfoModal, setShowInfoModal] = useState(false);

	// Edit States
	const [typeOfModal, setTypeOfModal] = useState("Add");
	const [name, setName] = useState("");
	const [balance, setBalance] = useState(0);
	const [decimalPrecision, setDecimalPrecision] = useState(0);
	const [bgColor, setBgColor] = useState("Default");
	const [currency, setCurrency] = useState({});

	// Edit, Delete and Merge States
	const [accountID, setAccountID] = useState(null);
	const [mergeAccountID, setMergeAccountID] = useState(null);

	const { accounts, transactions } = useData();

	//   Function to get back
	const Cancel = () => {
		setShowModal(false);
		setTypeOfModal("Add");
		setName("");
		setBalance(0);
		setBgColor("Default");
		setCurrency({});
		setDecimalPrecision(0);
		setAccountID(null);
	};

	//   Function to control edit.
	const EditFunc = (name, balance, dP, bgColor, currency, accountID) => {
		setTypeOfModal("Edit");
		setName(name);
		setBalance(balance);
		setDecimalPrecision(dP);
		setBgColor(bgColor);
		setCurrency(currency);
		setAccountID(accountID);
		setShowModal(true);
	};

	// Delete Function

	const DeleteFunc = (accountID) => {
		setAccountID(accountID);
		openModal();
	};

	const CancelDelete = () => {
		setAccountID(null);
		closeModal();
	};

	// Modal

	const dialogRef = useRef(null);

	const openModal = () => dialogRef.current?.showModal();

	const closeModal = () => dialogRef.current?.close();

	// #endregion
console.log(accountID);

	//   HTML
	return (
		<div className="relative w-full lg:max-w-7/10 flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<h2 className="font-bold line-clamp-1 text-3xl text-primary">
					Accounts
				</h2>
				<button
					onClick={() => setShowInfoModal((prev) => !prev)}
					title="More"
					className="p-1.5 rounded-full cursor-pointer"
				>
					<Info size={20} strokeWidth={2.8}></Info>
				</button>
				<InfoModal
					showInfoModal={showInfoModal}
					setShowInfoModal={setShowInfoModal}
				></InfoModal>
			</div>
			<SearchBar
				className="w-full"
				ph={"Search account..."}
				title={"Search account..."}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			></SearchBar>
			<div
				onClick={() => setShowInfoModal(false)}
				className="w-full gap-2 flex flex-col"
			>
				{acts()}
			</div>
			<AddButton
				onClick={() => setShowInfoModal(false)}
				title="Add account"
				showModal={showModal}
				setShowModal={setShowModal}
			></AddButton>
			{showModal && (
				<AccountsModal
					Cancel={Cancel}
					showModal={showModal}
					setShowModal={setShowModal}
					typeOfModal={typeOfModal}
					editObj={{
						name,
						balance,
						decimalPrecision,
						bgColor,
						currency,
						accountID,
					}}
					GetData={GetData}
				></AccountsModal>
			)}
			<DeleteModal
				text="account"
				GetData={GetData}
				DeleteHandler={DeleteHandler}
				dialogRef={dialogRef}
				handleCancel={CancelDelete}
				objID={accountID}
			></DeleteModal>
		</div>
	);
};

export default Accounts;
