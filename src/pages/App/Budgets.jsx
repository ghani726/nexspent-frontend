import { Info } from "lucide-react";
import AddButton from "../../components/App/AddButton";
import { useState } from "react";
import AccountsModal from "../../components/App/Accounts/Modal";
import useData from "../../hooks/Data";
import InfoModal from "../../components/App/Budgets/InfoModal";

const Budgets = () => {
	// Modal states
	const [showModal, setShowModal] = useState(false);
	const [showInfoModal, setShowInfoModal] = useState(false);

	// Edit States
	const [typeOfModal, setTypeOfModal] = useState("Add");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);
	const [periodLength, setPeriodLength] = useState(0);
	const [period, setPeriod] = useState("Month");
	const [bgColor, setBgColor] = useState("Default");
	const [accountID, setAccountID] = useState(null);

	const { budgets, transactions } = useData();

	//   Function to get back
	const Cancel = () => {
		setShowModal(false);
		setTypeOfModal("Add");
		setName("");
		setAmount(0);
		setBgColor("Default");
		setPeriod("Month");
		setPeriodLength(0);
		setAccountID(null);
	};

	//   Function to control edit.
	const EditFunc = (
		name,
		amount,
		periodLength,
		period,
		bgColor,
		accountID,
	) => {
		setTypeOfModal("Edit");
		setName(name);
		setAmount(amount);
		setPeriodLength(periodLength);
		setPeriod(period);
		setBgColor(bgColor);
		setAccountID(accountID);
		setShowModal(true);
	};

	//   HTML
	return (
		<div className="relative w-full h-full flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<h2 className="font-bold line-clamp-1 text-3xl text-primary">
					Budgets
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
			<div
				onClick={() => setShowInfoModal(false)}
				className="w-full gap-2 flex flex-col"
			>
				{/* {accounts?.length > 0 &&
					accounts?.map((e) => {
						const txns = transactions.filter((i) => {
							if (i.type === "expense" || i.type === "income") {
								return i.account === e._id;
							}
						});
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
							></AccountCard>
						);
					})} */}
				This page would be made at the end
			</div>
			{/* <AddButton
				onClick={() => setShowInfoModal(false)}
				title="Add account"
				showModal={showModal}
				setShowModal={setShowModal}
			></AddButton> */}
			{showModal && (
				<AccountsModal
					Cancel={Cancel}
					showModal={showModal}
					setShowModal={setShowModal}
					typeOfModal={typeOfModal}
					editObj={{
						name,
						amount,
						periodLength,
						period,
						bgColor,
						accountID,
					}}
				></AccountsModal>
			)}
		</div>
	);
};

export default Budgets;
