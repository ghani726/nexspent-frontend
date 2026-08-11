import { Edit, Trash2, Triangle } from "lucide-react";
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

	return (
		<div
			onClick={handleEdit}
			style={{ borderColor: bgColors }}
			className={`flex starting:translate-y-full animate-fade-in  cursor-pointer hover:shadow-large hover:scale-[1.02] shadow-medium duration-300 ease-in-out active:scale-98 shrink-0 items-center p-3 px-6 justify-between -space-y-1 w-full bg-surface rounded-full border-l-6`}
		>
			<div className="flex flex-col -space-y-1">
				<h3 className="font-bold text-[22px] -my-1.3 mr-7">{name}</h3>
				<p
					className={`${balance === 0 ? "text-black" : balance < 0 ? "text-red-500" : "text-primary"} flex justify-start items-center gap-1`}
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
					className={`text-xs flex justify-start items-center gap-1`}
				>
					{transactions.length}{" "}
					{transactions.length === 1 ? "transaction" : "transactions"}
				</p>
			</div>
			<div className="flex justify-center items-center">
				<button
					onClick={handleEdit}
					title="Edit"
					className="text-primary p-1.5 rounded-full cursor-pointer hover:bg-secondary/50"
				>
					<Edit size={20}></Edit>
				</button>
				{accountsLength === 1 ||
					(!transactions.length && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								DeleteFunc(obj._id);
							}}
							title="Delete"
							className="text-red-500 p-1.5 rounded-full cursor-pointer hover:bg-red-100"
						>
							<Trash2 size={20}></Trash2>
						</button>
					))}
			</div>
		</div>
	);
};

export default AccountCard;
