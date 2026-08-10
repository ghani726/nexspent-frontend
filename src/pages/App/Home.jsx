import AccountsCard from "../../components/App/Home/AccountsCard";
import AddButton from "../../components/App/AddButton";
import useAuth from "../../hooks/Auth";
import useData from "../../hooks/Data";
const Home = ({ showModal, setShowModal }) => {
	// Data
	const { accounts, transactions } = useData();

	// User
	const { user } = useAuth();

	// Greeting Calculator

	const Greeting = () => {
		const hours = new Date().getHours();

		if (hours >= 5 && hours < 12) {
			return "Morning";
		} else if (hours >= 12 && hours < 17) {
			return "Afternoon";
		} else if (hours >= 17 && hours < 21) {
			return "Evening";
		} else {
			return "Night";
		}
	};
	return (
		<div className="w-full h-full flex flex-col gap-2">
			{/* Name */}
			<div className="flex flex-col">
				<h3 className="font-bold text-xl">Good {Greeting()}</h3>
				<h1 className="font-bold line-clamp-1 text-3xl text-primary">
					{user.fullName}
				</h1>
			</div>
			<AddButton
				showModal={showModal}
				setShowModal={setShowModal}
			></AddButton>
			{/* Accounts */}

			<div className="flex w-fit max-w-full gap-1.5 overflow-auto">
				{accounts?.length > 0 &&
					accounts.map((e) => {
						const txns = transactions.filter((i) => {
							if (i.type === "expense" || i.type === "income") {
								return i.account === e._id;
							}
						});
						return (
							<AccountsCard
								key={e._id}
								name={e.name}
								balance={e.balance}
								currency={e.currency}
								bgColor={e.bgColor}
								transactions={txns.length}
							></AccountsCard>
						);
					})}

			</div>
		</div>
	);
};

export default Home;
