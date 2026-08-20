import { Filter, Shapes } from "lucide-react";
import AddButton from "../../components/App/Common/AddButton.jsx";
import { useState, useRef } from "react";

import useData from "../../hooks/Data";
import InfoModal from "../../components/App/Common/InfoModal.jsx";
import SearchBar from "../../components/App/Common/SearchBar.jsx";

import InfoButton from "../../components/App/Common/InfoButton.jsx";
import TypeSelector from "../../components/App/Common/TypeSelector.jsx";
import TransactionsCard from "../../components/App/Transactions/TransactionsCard.jsx";
import TransactionsModal from "../../components/App/Transactions/Modal.jsx";



const Transactions = ({ GetData }) => {
    const [searchValue, setSearchValue] = useState("");

    // Modal states
    const [showModal, setShowModal] = useState(false);

    // Edit States
    const [typeOfModal, setTypeOfModal] = useState("Add");
    const [name, setName] = useState("");
    const [bgColor, setBgColor] = useState("Default");
    const [icon, setIcon] = useState("🖼");
    const [categoryType, setCategoryType] = useState("expense");

    // Edit, Delete State
    const [categoryID, setCategoryID] = useState(null);

    // Form Details

    const { transactions } = useData();

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
                ? txn.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                  txn.description
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
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
                    transactionType={e?.type}
                    category={e?.category}
                    account={e?.account}
                    amount={e?.amount}
                    obj={e}
                ></TransactionsCard>
            );
        });
    };

    // Info Modal

    const infoRef = useRef(null);

    const openInfoModal = () => infoRef.current?.showModal();

    const closeInfoModal = () => infoRef.current?.close();


    
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
            <TypeSelector
                show4={true}
                slider={slider}
                setSlider={setSlider}
            ></TypeSelector>
            <SearchBar
                title={"Search transactions..."}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            ></SearchBar>
            <div
                className={`w-full gap-2 flex flex-col duration-300 ease-in-out`}
            >
                {cats()}
            </div>
            <AddButton
                title="Add account"
                showModal={showModal}
                setShowModal={setShowModal}
            ></AddButton>
            {showModal && (

                <TransactionsModal
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
                ></TransactionsModal>
            )}
            
        </div>
    );
};

export default Transactions;
