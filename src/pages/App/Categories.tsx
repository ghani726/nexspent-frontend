import { Shapes } from "lucide-react";
import AddButton from "@/components/App/Common/AddButton";
import { useState, useRef } from "react";
import CategoriesModal from "@/components/App/Categories/Modal";
import useData from "@/hooks/Data";
import InfoModal from "@/components/App/Common/InfoModal";
import CategoryCard from "@/components/App/Categories/CategoryCard";
import SearchBar from "@/components/App/Common/SearchBar";
import MergeCategoryModal from "@/components/App/Common/MergeModal";
import InfoButton from "@/components/App/Common/InfoButton";
import TypeSelector from "@/components/App/Common/TypeSelector";
import type { ICategory } from "@/types/category";
import CategoryViewModal from "@/components/App/Categories/CategoryViewModal";

const Categories = ({ GetData }: { GetData: () => void }) => {
    const [searchValue, setSearchValue] = useState("");

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [showMergeModal, setShowMergeModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    // Edit States
    const [typeOfModal, setTypeOfModal] = useState<"Create" | "Update">(
        "Create",
    );
    const baseCategory: ICategory = {
        name: "",
        categoryType: "expense",
        bgColor: "",
        icon: "",
        _id: "",
    };

    const [category, setCategory] = useState<ICategory>(baseCategory);

    // Merge State
    const [mergeCategoryID, setMergeCategoryID] = useState("");
    const [mergeObj1, setMergeObj1] = useState("");
    const [mergeObj2, setMergeObj2] = useState("");

    // Form Details

    const { categories, transactions } = useData();

    //   Function to get back
    const Cancel = () => {
        setShowModal(false);
        setShowViewModal(false);
        setTypeOfModal("Create");
        setCategory(baseCategory);
    };

    //   Function to control edit.
    const ViewFunc = (cat: ICategory) => {
        setTypeOfModal("Update");
        setCategory(cat);
        setShowViewModal(true);
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
                    ViewFunc={ViewFunc}
                    totalCategories={{ incomeCategories, expenseCategories }}
                    MergeFunc={MergeFunc}
                />
            );
        });
    };


    // Info Modal

    const infoRef = useRef<HTMLDialogElement>(null);

    const openInfoModal = () => infoRef.current?.showModal();

    // Merge Modal

    const MergeFunc = (id: string, name: string) => {
        if (!category._id) {
            setCategory((prev) => ({ ...prev, _id: id }));
            setMergeObj1(name);
            setShowMergeModal(true);
        } else if (id === category._id) {
            CancelMerge();
        } else if (id && id !== category._id) {
            setMergeCategoryID(id);
            setMergeObj2(name);
        }
    };

    const CancelMerge = () => {
        setCategory((prev) => ({ ...prev, _id: "" }));
        setMergeCategoryID("");
        setMergeObj1("");
        setMergeObj2("");
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
                    title={"Categories"}
                    desc={
                        "Categories help in statistical analysis and to know where you are spending."
                    }
                    icon={<Shapes size={36}></Shapes>}
                ></InfoModal>
            </div>
            <TypeSelector
                slider={slider}
                setSlider={setSlider}
                showAll={true}
            ></TypeSelector>
            <SearchBar
                title={"Search category..."}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            ></SearchBar>
            <MergeCategoryModal
                showMergeModal={showMergeModal}
                GetData={GetData}
                Cancel={CancelMerge}
                type="Category"
                firstID={category._id ?? ""}
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
                    typeOfModal={typeOfModal}
                    editObj={category}
                    GetData={GetData}
                ></CategoriesModal>
            )}
            {showViewModal && (
                
                <CategoryViewModal
                    Category={category}
                    Cancel={Cancel}
                    GetData={GetData}
                ></CategoryViewModal>
            )}
        </div>
    );
};

export default Categories;
