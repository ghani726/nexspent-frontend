import { Filter, Shapes } from "lucide-react";
import AddButton from "../../components/App/Common/AddButton.jsx";
import { useState, useRef } from "react";
import CategoriesModal from "../../components/App/Categories/Modal";
import useData from "../../hooks/Data";
import InfoModal from "../../components/App/Common/InfoModal.jsx";
import CategoryCard from "../../components/App/Categories/CategoryCard";
import SearchBar from "../../components/App/Common/SearchBar.jsx";
import DeleteModal from "../../components/App/Common/DeleteModal.jsx";
import toast from "react-hot-toast";
import { DeleteCategory } from "../../api/CategoryAPI.js";
import MergeCategoryModal from "../../components/App/Common/MergeModal.jsx";
import InfoButton from "../../components/App/Common/InfoButton.jsx";
import TypeSelector from "../../components/App/Common/TypeSelector.jsx";
import TransactionsCard from "../../components/App/Transactions/TransactionsCard.jsx";
import { DatePicker } from "react-aria-components";

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

const Transactions = ({ GetData }) => {
    const [searchValue, setSearchValue] = useState("");

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [showMergeModal, setShowMergeModal] = useState(false);

    // Edit States
    const [typeOfModal, setTypeOfModal] = useState("Add");
    const [name, setName] = useState("");
    const [bgColor, setBgColor] = useState("Default");
    const [icon, setIcon] = useState("🖼");
    const [categoryType, setCategoryType] = useState("expense");

    // Edit, Delete, and Merge State
    const [categoryID, setCategoryID] = useState(null);

    // Merge State
    const [mergeCategoryID, setMergeCategoryID] = useState(null);
    const [mergeObj1, setMergeObj1] = useState(null);
    const [mergeObj2, setMergeObj2] = useState(null);

    // Form Details

    const { categories, transactions } = useData();

    console.log(transactions);
    
    
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
        const filteredTransactions = transactions.filter((txn) => {
            const matchesSearch = searchValue.trim()
                ? (txn.title.toLowerCase().includes(searchValue.toLowerCase()) || txn.description.toLowerCase().includes(searchValue.toLowerCase()))
                : true;

            const matchesTab =
                slider === 0 ||
                (slider === 1 && txn.type === "expense") ||
                (slider === 2 && txn.type === "income") ||
                (slider === 3 && txn.type === "transfer");

            return matchesSearch && matchesTab;
        });

        // 2. Map filtered array to JSX and RETURN it
        return filteredTransactions.map((e) => {


            return (
                <TransactionsCard
                    key={e?._id}
                    title={e?.title}
                    category={e?.category}
                    account={e?.account}
                    amount={e?.amount}
                    obj={e}
                ></TransactionsCard>
            );
        });
    };

    // Delete Modal

    const DeleteFunc = (categoryID) => {
        setCategoryID(categoryID);
        openModal();
    };

    const CancelDelete = () => {
        setCategoryID(null);
        closeModal();
    };

    const dialogRef = useRef(null);

    const openModal = () => dialogRef.current?.showModal();

    const closeModal = () => dialogRef.current?.close();

    // Info Modal

    const infoRef = useRef(null);

    const openInfoModal = () => infoRef.current?.showModal();

    const closeInfoModal = () => infoRef.current?.close();

    // Merge Modal

    const MergeFunc = (id, name) => {
        if (!categoryID) {
            setCategoryID(id);
            setMergeObj1(name);
            setShowMergeModal(true);
        } else if (id === categoryID) {
            CancelMerge();
        } else if (id && id !== categoryID) {
            setMergeCategoryID(id);
            setMergeObj2(name);
        }
    };
    const mergeRef = useRef(null);

    const CancelMerge = () => {
        setCategoryID(null);
        setMergeCategoryID(null);
        setMergeObj1(null);
        setMergeObj2(null);
        setShowMergeModal(false);
    };

    //   HTML
    return (
        <div className="relative w-full lg:max-w-7/10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold line-clamp-1 break-all pb-0.5 text-3xl text-primary">
                    Transactions
                </h2>
                <div className="flex">
                    <button
                        onClick={openInfoModal}
                        title="Filters"
                        className="p-1.5 h-full hover:bg-gray-200 dark:hover:bg-gray-800 aspect-square flex justify-center items-center rounded-full cursor-pointer"
                    >
                        <Filter size={20} strokeWidth={2.5}></Filter>
                    </button>
                    <InfoButton openInfoModal={openInfoModal}></InfoButton>
                </div>
                <InfoModal
                    ref={infoRef}
                    closeInfoModal={closeInfoModal}
                    title={"Transactions"}
                    desc={
                        "Categories help in statistical analysis and to know where you are spending."
                    }
                    icon={<Shapes size={36}></Shapes>}
                ></InfoModal>
            </div>
            <TypeSelector show4={true} slider={slider} setSlider={setSlider}></TypeSelector>
            <SearchBar
                title={"Search category..."}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            ></SearchBar>
            <DatePicker></DatePicker>
            <MergeCategoryModal
                Ref={mergeRef}
                showMergeModal={showMergeModal}
                GetData={GetData}
                Cancel={CancelMerge}
                type="Category"
                firstID={categoryID}
                mergeID={mergeCategoryID}
                mergeObj1={mergeObj1}
                mergeObj2={mergeObj2}
            ></MergeCategoryModal>
            <div
                className={`w-full ${showMergeModal ? "m-0" : "-mt-12"} gap-2 flex flex-col duration-300 ease-in-out`}
            >
                {cats()}
            </div>
            <AddButton
                title="Add account"
                showModal={showModal}
                setShowModal={setShowModal}
            ></AddButton>
            {showModal && (
                <CategoriesModal
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
                ></CategoriesModal>
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

export default Transactions;
