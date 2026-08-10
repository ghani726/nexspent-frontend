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
}) => {
	const { colors } = useData();

	const bgColors = colors
		.find((e) => e.name === bgColor)
		.color.split("[")[1]
		.slice(0, -1); //Obtain the color code

	return (
		<div
			style={{ borderColor: bgColors }}
			className={`flex cursor-pointer duration-300 ease-in-out active:scale-98 shrink-0 items-center p-4 justify-between -space-y-1 w-full bg-surface rounded-3xl border-l-6`}
		>
			<div className="flex flex-col -space-y-1">
				<h3 className="font-bold text-[21px] mr-7">{name}</h3>
				<h4
					className={`${balance === 0 ? "text-black" : balance < 0 ? "text-red-500" : "text-primary"} -mb-1.5 font-semibold text-xl flex justify-start items-center gap-1`}
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
				</h4>

				<p style={{ color: bgColors }}>
					{transactions.length}{" "}
					{transactions.length === 1 ? "transaction" : "transactions"}
				</p>
			</div>
			<div className="flex justify-center items-center gap-2">
				<span
					onClick={() => {
						EditFunc(
							name,
							balance,
							obj.decimalPrecision,
							bgColor,
							currency,
							obj._id,
						);
					}}
					title="Edit"
					className="text-primary"
				>
					<Edit size={20}></Edit>
				</span>
				{accountsLength === 1 ||
					(!transactions.length && (
						<span title="Delete" className="text-red-500">
							<Trash2 size={20}></Trash2>
						</span>
					))}
			</div>
		</div>
	);
};

export default AccountCard;
