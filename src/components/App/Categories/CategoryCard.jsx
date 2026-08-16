import useData from "../../../hooks/Data";
import { Edit, Merge, Trash2 } from "lucide-react";

const CategoryCard = ({
	name,
	icon,
	bgColor,
	categoryType,
	transactions = null,
	obj,
	EditFunc = null,
	DeleteFunc = null,
	MergeFunc=null,
	totalCategories = null,
}) => {
	const { colors } = useData();

	const currentColor = colors.find((e) => e.name === bgColor);

	const handleEdit = () => {
		EditFunc?.({
			name,
			bgColor,
			categoryType,
			icon,
			categoryID: obj._id,
		});
	};
	
	const showActionButtons = () => {

		const MergeButton = () => {
			return <button
				onClick={(e) => {
					e.stopPropagation();
					MergeFunc(obj._id, name);
				}}
				title="Merge Category"
				className="text-blue-500 p-1.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900 cursor-pointer"
			>
				<Merge size={20}></Merge>
			</button>
		}
		const EditButton = () => {
			return <button
				onClick={(e) => {
					e.stopPropagation();
					handleEdit()
				}}
				title="Edit Category"
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
				className="text-red-500 p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-950 cursor-pointer"
			>
				<Trash2 size={20}></Trash2>
			</button>
		}
		if(categoryType === "expense" && totalCategories?.expenseCategories?.length > 1){
			if(!transactions?.length){
				return <><MergeButton></MergeButton>
				<EditButton></EditButton>
				<DeleteButton></DeleteButton></>
			} else {
				return <>
				<MergeButton></MergeButton>
				<EditButton></EditButton></>
			}
		} else if(categoryType === "income" && totalCategories?.incomeCategories?.length > 1){
			if(!transactions?.length){
				return <><MergeButton></MergeButton>
				<EditButton></EditButton>
				<DeleteButton></DeleteButton></>
			} else {
				return <><MergeButton></MergeButton>
				<EditButton></EditButton></>
			}
		} else {
			return <EditButton></EditButton>
		}
	}
	return (
		<div
			className={`w-full starting:translate-y-full animate-fade-in flex rounded-full justify-between items-center bg-surface dark:bg-gray-800 shadow-medium p-3 duration-300 hover:scale-[1.02] cursor-pointer active:scale-99 hover:shadow-large animate-scroll-card`}
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
				{showActionButtons()}
			</div>
		</div>
	);
};

export default CategoryCard;
