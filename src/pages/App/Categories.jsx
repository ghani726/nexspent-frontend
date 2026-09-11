import { Shapes } from "lucide-react";
import AddButton from "@/components/App/Common/AddButton";
import { useState, useRef } from "react";
import CategoriesModal from "@/components/App/Categories/Modal";
import useData from "@/hooks/Data";
import InfoModal from "@/components/App/Common/InfoModal";
import CategoryCard from "@/components/App/Categories/CategoryCard";
import SearchBar from "@/components/App/Common/SearchBar";
import DeleteModal from "@/components/App/Common/DeleteModal";
import toast from "react-hot-toast";
import { DeleteCategory } from "@/api/CategoryAPI";
import MergeCategoryModal from "@/components/App/Common/MergeModal";
import InfoButton from "@/components/App/Common/InfoButton";
import TypeSelector from "@/components/App/Common/TypeSelector";

const DeleteHandler = async ({
    _id,
    token,
    Cancel,
    GetData,
    setIsLoading,
}) => {
    setIsLoading(true); 

    try {        
        const res = await DeleteCategory({ categoryID: _id, token });

        if (res.success) {
            setIsLoading(false);
            toast.success("Category Deleted successfully.");
            GetData();
            Cancel();
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
    const EditFunc = ({ name, bgColor, categoryType, icon, _id }) => {
        setTypeOfModal("Edit");
        setName(name);
        setBgColor(bgColor);
        setIcon(icon);
        setCategoryType(categoryType);
        setCategoryID(_id);
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

        const incomeCategories = categories.filter(
            (e) => e.categoryType === "income",
        );
        const expenseCategories = categories.filter(
            (e) => e.categoryType === "expense",
        );

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
                    totalCategories={{ incomeCategories, expenseCategories }}
                    MergeFunc={MergeFunc}
                />
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
                    Categories
                </h2>
                <InfoButton openInfoModal={openInfoModal}></InfoButton>
                <InfoModal
                    ref={infoRef}
                    closeInfoModal={closeInfoModal}
                    title={"Categories"}
                    desc={
                        "Categories help in statistical analysis and to know where you are spending."
                    }
                    icon={<Shapes size={36}></Shapes>}
                ></InfoModal>
            </div>
            <TypeSelector slider={slider} setSlider={setSlider} showAll={true}></TypeSelector>
            <SearchBar
                title={"Search category..."}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            ></SearchBar>
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
                className={`w-full ${showMergeModal ? "m-0" : "-mt-12"} gap-2 flex flex-col duration-300 ease-in-out pb-13 ms:pb-0`}
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
                _id={categoryID}
            ></DeleteModal>
        </div>
    );
};

export default Categories;
