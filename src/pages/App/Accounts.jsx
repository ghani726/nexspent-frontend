import AccountCard from "../../components/App/Accounts/AccountCard";
import { Wallet } from "lucide-react";
import AddButton from "../../components/App/Common/AddButton";
import { useState } from "react";
import { useRef } from "react";
import AccountsModal from "../../components/App/Accounts/Modal";
import useData from "../../hooks/Data";
import InfoModal from "../../components/App/Common/InfoModal";
import InfoButton from "../../components/App/Common/InfoButton.jsx";
import DeleteModal from "../../components/App/Common/DeleteModal.jsx";
import toast from "react-hot-toast";
import { DeleteAccount } from "../../api/AccountsAPI.js";
import SearchBar from "../../components/App/Common/SearchBar.js";
import MergeModal from "../../components/App/Common/MergeModal.jsx";

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
					MergeFunc={MergeFunc}
				></AccountCard>
			);
		});
	};
	// Modal states
	const [showModal, setShowModal] = useState(false);
	const [showMergeModal, setShowMergeModal] = useState(false)

	// Edit States
	const [typeOfModal, setTypeOfModal] = useState("Add");
	const [name, setName] = useState("");
	const [balance, setBalance] = useState(0);
	const [decimalPrecision, setDecimalPrecision] = useState(0);
	const [bgColor, setBgColor] = useState("Default");
	const [currency, setCurrency] = useState({});

	// Edit, Delete and Merge States
	const [accountID, setAccountID] = useState(null);
	
	// Merge State
	const [mergeAccountID, setMergeAccountID] = useState(null);
	const [mergeObj1, setMergeObj1] = useState(null)
	const [mergeObj2, setMergeObj2] = useState(null)

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

	// Modalbackground: var(--color-gray-900);

	const dialogRef = useRef(null);

	const openModal = () => dialogRef.current?.showModal();

	const closeModal = () => dialogRef.current?.close();


	// Info Modal

	const infoRef = useRef(null)

	const openInfoModal = () => infoRef.current?.showModal();

	const closeInfoModal = () => infoRef.current?.close();



	// Merge Modal


	const MergeFunc = (id, name) => {
		if (!accountID) {
			setAccountID(id)
			setMergeObj1(name)
			setShowMergeModal(true)
		} else if (id === accountID) {
			CancelMerge()
		} else if (id && (id !== accountID)) {
			setMergeAccountID(id)
			setMergeObj2(name)
		}
	}
	const mergeRef = useRef(null);

	const CancelMerge = () => {
		setAccountID(null)
		setMergeAccountID(null)
		setMergeObj1(null)
		setMergeObj2(null)
		setShowMergeModal(false)
	}

	// 
	// #endregion

	//   HTML
	return (
		<div className="relative w-full lg:max-w-7/10 flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<h2 className="font-bold line-clamp-1 text-3xl text-primary">
					Accounts
				</h2>
				<InfoButton openInfoModal={openInfoModal}></InfoButton>
				<InfoModal
					ref={infoRef}
					closeInfoModal={closeInfoModal}
					title={"Accounts"}
					desc={"Every transaction belongs to an account, which represents where your money is stored or spent - like cash, or credit."}
					icon={<Wallet size={36}></Wallet>}
				></InfoModal>
			</div>
			<SearchBar
				className="w-full"
				ph={"Search account..."}
				title={"Search account..."}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			></SearchBar>
			<MergeModal
				Ref={mergeRef}
				showMergeModal={showMergeModal}
				GetData={GetData}
				Cancel={CancelMerge}
				type="Account"
				firstID={accountID}
				mergeID={mergeAccountID}
				mergeObj1={mergeObj1}
				mergeObj2={mergeObj2}
			></MergeModal>
			<div
				className={`w-full ${showMergeModal ? 'm-0' : '-mt-12'} gap-2 flex flex-col`}
			>
				{acts()}
			</div>
			<AddButton
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
