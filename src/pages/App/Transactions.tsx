import { Filter, Shapes } from "lucide-react";
import AddButton from "@/components/App/Common/AddButton";
import { useState, useRef } from "react";

import useData from "@/hooks/Data";
import InfoModal from "@/components/App/Common/InfoModal";
import SearchBar from "@/components/App/Common/SearchBar";

import InfoButton from "@/components/App/Common/InfoButton";
import TypeSelector from "@/components/App/Common/TypeSelector";
import TransactionsCard from "@/components/App/Transactions/TransactionsCard";
import TransactionsModal from "@/components/App/Transactions/Modal";
import { ITransaction } from "@/types/transaction";

const Transactions = ({ GetData }: { GetData: () => void | string }) => {
    const [searchValue, setSearchValue] = useState("");

    // Modal states
    const [showModal, setShowModal] = useState(false);

    // Edit States
    
    const [typeOfModal, setTypeOfModal] = useState<"Add" | "Edit">("Add");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"expense"| "income" | "transfer">("expense");
    

    const [input, setInput] = useState<number>(0);
    const [date, setDate] = useState("");

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedAccount, setSelectedAccount] = useState<string>("");
    const [selectedAccountTo, setSelectedAccountTo] = useState<string>("");
    const [selectedBudget, setSelectedBudget] = useState<string>("");
    const [selectedGoal, setSelectedGoal] = useState<string>("");

    // Edit, Delete State
    const [transactionID, setTransactionID] = useState("");

    // Form Details

    const { transactions }: {transactions: ITransaction[]} = useData();

    //   Function to get back
    const Cancel = () => {
        setShowModal(false);
        setTypeOfModal("Add");
        setTitle("");
        setDescription("");
        setSlider(0);
        setInput(0);
        setDate("");
        setType("expense")
        setSelectedCategory("");
        setSelectedAccount("");
        setSelectedAccountTo("");
        setSelectedBudget("");
        setSelectedGoal("");
        setTransactionID("");
    };

    //   Function to control edit.
    const EditFunc = ({
        title,
        description,
        type,
        amount,
        date,
        account,
        category,
        budget,
        goal,
        toAccount,
        fromAccount,
        _id,
    }: ITransaction) => {
        setTypeOfModal("Edit");
        setTitle(title);
        setDescription(description ?? "");
        setType(type)
        setInput(amount);
        setDate(date ?? "");
        setSelectedCategory(category ?? "");
        setSelectedAccount(account || (fromAccount ?? ""));
        setSelectedAccountTo(toAccount ?? "");
        setSelectedBudget(budget ?? "");
        setSelectedGoal(goal ?? "");
        setTransactionID(_id ?? "");
        setShowModal(true);
    };

    const [slider, setSlider] = useState(0);

    const showTransactions = () => {
        // 1. Filter categories based on search text and slider tab
        const filteredTransactions = transactions.filter(
            (txn: ITransaction) => {
                const matchesSearch = searchValue.trim()
                    ? txn.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                      (txn?.description &&
                          txn.description
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()))
                    : true;

                const matchesTab =
                    slider === 0 ||
                    (slider === 1 && txn.type === "expense") ||
                    (slider === 2 && txn.type === "income") ||
                    (slider === 3 && txn.type === "transfer");

                return matchesSearch && matchesTab;
            },
        );

        // 2. Map filtered array to JSX and RETURN it
        return filteredTransactions.map((e: ITransaction) => {
            
            return (
                <TransactionsCard
                    key={e?._id}
                    title={e?.title}
                    type={e?.type}
                    category={e?.category}
                    account={e?.account}
                    amount={e?.amount}
                    obj={e}
                    bgColor={e?.bgColor}
                    icon={e?.icon}
                    EditFunc={EditFunc}
                ></TransactionsCard>
            );
        });
    };

    // Info Modal

    const infoRef = useRef<HTMLDialogElement>(null);

    const openInfoModal = () => infoRef.current?.showModal();

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
                    title={"Transactions"}
                    desc={
                        "Categories help in statistical analysis and to know where you are spending."
                    }
                    icon={<Shapes size={36}></Shapes>}
                ></InfoModal>
            </div>
            <TypeSelector
                show4={true}
                showAll={true}
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
                {showTransactions()}
            </div>
            <AddButton
                title="Add account"
                showModal={showModal}
                setShowModal={setShowModal}
            ></AddButton>
            {showModal && (
                <TransactionsModal
                    showModal={showModal}
                    Cancel={Cancel}
                    typeOfModal={typeOfModal}
                    GetData={GetData}
                    editObj={{
                        title,
                        description,
                        type,
                        amount: input,
                        date,
                        category: selectedCategory,
                        account: selectedAccount,
                        toAccount: selectedAccountTo,
                        budget: selectedBudget,
                        goal: selectedGoal,
                        _id: transactionID,
                    }}
                ></TransactionsModal>
            )}
        </div>
    );
};

export default Transactions;
