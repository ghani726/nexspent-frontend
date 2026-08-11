import { Info } from "lucide-react";
import AddButton from "../../components/App/AddButton";
import { useState, useRef } from "react";
import AccountsModal from "../../components/App/Categories/Modal";
import useData from "../../hooks/Data";
import InfoModal from "../../components/App/Categories/InfoModal";
import CategoryCard from "../../components/App/Categories/CategoryCard";
import SearchBar from "../../components/App/Account/SearchBar";
import DeleteModal from "../../components/App/Accounts/DeleteModal";
import toast from "react-hot-toast";
import { DeleteCategory } from "../../api/CategoryAPI.js";

const DeleteHandler = async ({
	objID,
	token,
	CancelDelete,
	GetData,
	setIsLoading,
}) => {
	setIsLoading(true);
	try {
		const res = await DeleteCategory({ categoryID: objID, token });

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
const Categories = ({ GetData }) => {
	const [searchValue, setSearchValue] = useState("");

	// Modal states
	const [showModal, setShowModal] = useState(false);
	const [showInfoModal, setShowInfoModal] = useState(false);

	// Edit States
	const [typeOfModal, setTypeOfModal] = useState("Add");
	const [name, setName] = useState("");
	const [bgColor, setBgColor] = useState("Default");
	const [icon, setIcon] = useState("🖼");
	const [categoryType, setCategoryType] = useState("expense");
	const [categoryID, setCategoryID] = useState(null);
	// Form Details

	const { categories, transactions } = useData();

	//   Function to get back
	const Cancel = () => {
		setShowModal(false);
		setTypeOfModal("Add");
		setName("");
		setBgColor("Default");
		setIcon("🖼");
		setCategoryType("expense");
		setCategoryID(null);
	};

	//   Function to control edit.
	const EditFunc = ({ name, bgColor, categoryType, icon, categoryID }) => {
		setTypeOfModal("Edit");
		setName(name);
		setBgColor(bgColor);
		setIcon(icon);
		setCategoryType(categoryType);
		setCategoryID(categoryID);
		setShowModal(true);
	};

	const [slider, setSlider] = useState(0);

	const cats = () => {
		// 1. Filter categories based on search text and slider tab
		const filteredCategories = categories.filter((cat) => {
			const matchesSearch = searchValue.trim()
				? cat.name.toLowerCase().includes(searchValue.toLowerCase())
				: true;

			const matchesTab =
				slider === 0 ||
				(slider === 1 && cat.categoryType === "expense") ||
				(slider === 2 && cat.categoryType === "income");

			return matchesSearch && matchesTab;
		});

		// 2. Map filtered array to JSX and RETURN it
		return filteredCategories.map((e) => {
			const txns = transactions.filter(
				(i) => i.category === e._id && i.type === e.categoryType,
			);

			return (
				<CategoryCard
					key={e._id}
					name={e.name}
					transactions={txns}
					bgColor={e.bgColor}
					categoryType={e.categoryType}
					icon={e.icon}
					obj={e}
					EditFunc={EditFunc}
					DeleteFunc={DeleteFunc}
					totalCategories={categories.length}
				/>
			);
		});
	};

	const DeleteFunc = (categoryID) => {
		setCategoryID(categoryID);
		openModal();
	};

	const CancelDelete = () => {
		setCategoryID(null);
		closeModal();
	};

	// Modal

	const dialogRef = useRef(null);

	const openModal = () => dialogRef.current?.showModal();

	const closeModal = () => dialogRef.current?.close();

	console.log(categoryID);
	
	//   HTML
	return (
		<div className="relative w-full lg:max-w-7/10 flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<h2 className="font-bold line-clamp-1 break-all pb-0.5 text-3xl text-primary">
					Categories
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
			<div className="flex justify-center items-center w-full">
				<div
					className={`flex duration-300 ease-in-out bg-surface/70 justify-center items-center rounded-full relative`}
				>
					<div
						className={`absolute shadow-medium top-0 left-0 w-1/3 h-full rounded-full bg-surface duration-300 ease-in-out`}
						style={{
							transform: `translateX(${slider * 100}%)`,
						}}
					></div>
					<div
						onClick={() => {
							setSlider(0);
						}}
						className={`w-1/3 p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-ful3 cursor-pointer duration-300 ease-in-out ${slider === 0 && "font-semibold"}`}
					>
						All
					</div>
					<div
						onClick={() => {
							setSlider(1);
						}}
						className={`w-1/3 p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full text-red-500 cursor-pointer duration-300 ease-in-out ${slider === 1 && "font-semibold"}`}
					>
						Expense
					</div>
					<div
						onClick={() => {
							setSlider(2);
						}}
						className={`w-1/3 p-3 px-7 z-3 flex justify-center items-center shrink-0 rounded-full text-primary cursor-pointer duration-300 ease-in-out ${slider === 2 && "font-semibold"}`}
					>
						Income
					</div>
				</div>
			</div>
			<SearchBar
				className="w-full"
				ph={"Search category..."}
				title={"Search category..."}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			></SearchBar>
			<div
				onClick={() => setShowInfoModal(false)}
				className="w-full gap-2 flex flex-col"
			>
				{cats()}
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
						bgColor,
						categoryType,
						icon,
						categoryID,
					}}
					GetData={GetData}
				></AccountsModal>
			)}
			<DeleteModal
				text={"category"}
				GetData={GetData}
				DeleteHandler={DeleteHandler}
				dialogRef={dialogRef}
				handleCancel={CancelDelete}
				objID={categoryID}
			></DeleteModal>
		</div>
	);
};

export default Categories;
