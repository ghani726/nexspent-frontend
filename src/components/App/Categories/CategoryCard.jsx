import useData from "../../../hooks/Data";
import { Edit, Trash2 } from "lucide-react";

const CategoryCard = ({
	name,
	icon,
	bgColor,
	categoryType,
	transactions,
	obj,
	EditFunc,
	DeleteFunc,
	totalCategories,
}) => {
	const { colors } = useData();

	const currentColor = colors.find((e) => e.name === bgColor);

	const handleEdit = () => {
		EditFunc({
			name,
			bgColor,
			categoryType,
			icon,
			categoryID: obj._id,
		});
	};
	return (
		<div
			onClick={handleEdit}
			className={`w-full starting:translate-y-full animate-fade-in flex rounded-full justify-between items-center bg-surface shadow-medium p-3 duration-300 hover:scale-[1.02] cursor-pointer active:scale-95 hover:shadow-large`}
		>
			<div className={`flex justify-center items-center gap-2`}>
				<div
					className={`h-full p-2 pb-3 aspect-square ${currentColor.color} rounded-full flex justify-center items-center text-3xl`}
				>
					{icon}
				</div>
				<div className={`flex flex-col justify-center items-start`}>
					<h3 className={`text-[22px] -my-1.5 font-bold`}>{name}</h3>
					<p className={`text-xs text-gray-600`}>
						{categoryType?.[0].toUpperCase() +
							categoryType?.slice(1)}
					</p>
					<p className={`text-xs text-gray-600`}>
						{transactions?.length}{" "}
						{transactions?.length === 1
							? "transaction"
							: "transactions"}
					</p>
				</div>
			</div>
			<div className={`flex justify-center items-center pr-2`}>
				<button
					onClick={handleEdit}
					title="Edit"
					className="text-primary p-1.5 rounded-full hover:bg-secondary/50 cursor-pointer"
				>
					<Edit size={20}></Edit>
				</button>
				{totalCategories === 1 ||
					(!transactions.length && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								DeleteFunc(obj._id);
							}}
							title="Delete"
							className="text-red-500 p-1.5 rounded-full hover:bg-red-100 cursor-pointer"
						>
							<Trash2 size={20}></Trash2>
						</button>
					))}
			</div>
		</div>
	);
};

export default CategoryCard;
