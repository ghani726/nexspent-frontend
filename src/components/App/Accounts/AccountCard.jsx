import { Edit, Merge, Trash2, Triangle } from "lucide-react";
import useData from "../../../hooks/Data";

const AccountCard = ({
	name,
	balance,
	bgColor,
	accountsLength,
	currency,
	transactions,
	obj,
	EditFunc,
	DeleteFunc,
	MergeFunc=null
}) => {
	const { colors } = useData();

	const bgColors = colors
		.find((e) => e.name === bgColor)
		.color.split("[")[1]
		.slice(0, -1); //Obtain the color code

	const handleEdit = () => {
		EditFunc(
			name,
			balance,
			obj.decimalPrecision,
			bgColor,
			currency,
			obj._id,
		);
	};

	const showActionButtons = () => {

		const MergeButton = () => {
			return <button
				onClick={(e) => {
					e.stopPropagation();
					MergeFunc(obj._id, name);
				}}
				title="Merge Account"
				className="text-blue-500 p-1.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900 cursor-pointer"
			>
				<Merge size={20}></Merge>
			</button>
		}
		const EditButton = () => {
			return <button
				title="Edit Account"
				onClick={(e)=>{
					e.stopPropagation()
					handleEdit()
				}}
				className="text-primary	 p-1.5 rounded-full hover:bg-secondary/50 cursor-pointer"
			>
				<Edit size={20}></Edit>
			</button>
		}

		const DeleteButton = () => {
			return <button
				onClick={(e) => {
					e.stopPropagation();
					DeleteFunc(obj._id);
				}}
				title="Delete"
				className="text-red-500 p-1.5 rounded-full hover:bg-red-100 cursor-pointer"
			>
				<Trash2 size={20}></Trash2>
			</button>
		}

		if(accountsLength <= 1) return <EditButton></EditButton>

		if(!transactions?.length){
			return <><MergeButton></MergeButton>
			<EditButton></EditButton>
			<DeleteButton></DeleteButton></>
		} else {
			return <><MergeButton></MergeButton>
			<EditButton></EditButton></>
		}
		
	}
	return (
		<div
			style={{ borderColor: bgColors }}
			className={`flex starting:translate-y-full animate-fade-in  cursor-pointer hover:shadow-large hover:scale-[1.02] shadow-medium duration-300 ease-in-out active:scale-99 shrink-0 items-center p-3 px-6 justify-between -space-y-1 w-full bg-surface dark:bg-gray-800 rounded-full border-l-6`}
		>
			<div className="flex flex-col -space-y-1">
				<h3 className="font-bold text-[22px] -my-1.3 mr-7">{name}</h3>
				<p
					className={`${balance === 0 ? "text-black dark:text-white" : balance < 0 ? "text-red-500" : "text-primary"} flex justify-start items-center gap-1`}
				>
					{currency?.symbol}
					{balance}{" "}
					{!balance ? null : balance > 0 ? (
						<Triangle
							className=""
							fill="currentColor"
							size={14}
						></Triangle>
					) : (
						<Triangle
							className="rotate-180"
							fill="currentColor"
							size={14}
						></Triangle>
					)}{" "}
				</p>

				<p
					style={{ color: bgColors }}
					className={`text-xs flex justify-start items-center gap-1 text-shadow-2xs`}
				>
					{transactions.length}{" "}
					{transactions.length === 1 ? "transaction" : "transactions"}
				</p>
			</div>
			<div className="flex justify-center items-center">
				{showActionButtons()}
			</div>
		</div>
	);
};

export default AccountCard;
