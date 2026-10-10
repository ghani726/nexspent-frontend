import { useRef, useState } from "react";
import { PieChart } from "lucide-react";
import AddButton from "@/components/App/Common/AddButton";
import InfoModal from "@/components/App/Common/InfoModal";
import InfoButton from "@/components/App/Common/InfoButton";
import { IBudget } from "@/types/budget";
import useData from "@/hooks/Data";
import BudgetCard from "@/components/App/Budgets/BudgetCard";
import BudgetViewModal from "@/components/App/Budgets/BudgetViewModal";
import BudgetModal from "@/components/App/Budgets/Modal";
import BudgetTypeSelector from "@/components/App/Budgets/BudgetTypeSelector";
import SearchBar from "@/components/App/Common/SearchBar";

const Budgets = ({ GetData }: { GetData: () => void }) => {
    // 1. States.
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [budget, setBudget] = useState<IBudget | null>(null);
    const [slider, setSlider] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    // 2. Fetch all budgets from gloabl context.
    const { budgets } = useData();

    // 3. Function to close View Modal and set the Budget to empty
    const Cancel = () => {
        setShowCreateModal(false);
        setShowViewModal(false);
        setBudget(null);
    };

    // 4. Function to open View Modal and set the Budget to provided data.
    const ViewFunc = (budget: IBudget) => {
        setBudget(budget);
        setShowViewModal(true);
    };

    // 5. Info Modal
    const infoRef = useRef<HTMLDialogElement>(null);

    // 6. Function to render budgets
    const showBudgets = () => {
        // 1. Filter categories based on search text and slider tab
        const filteredBudgets = budgets.filter((bud) => {
            const matchesSearch = searchValue.trim()
                ? bud.title.toLowerCase().includes(searchValue.toLowerCase())
                : true;

            const matchesTab =
                slider === 0 ||
                (slider === 1 && bud.type === "One-Time") ||
                (slider === 2 && bud.type === "Auto-Repeat");

            return matchesSearch && matchesTab;
        });

        // 2. Map filtered array to JSX and RETURN it
        return filteredBudgets.map((bud) => {
            return (
                <BudgetCard
                    key={bud._id}
                    obj={bud}
                    ViewFunc={ViewFunc}
                ></BudgetCard>
            );
        });
    };

    // 7. Main Component
    return (
        <div className="relative w-full lg:max-w-7/10 flex flex-col gap-4">
            {/* 8. Header */}
            <div className="flex justify-between items-center">
                <h2 className="font-bold line-clamp-1 text-3xl text-primary">
                    Budgets
                </h2>
                <InfoButton
                    openInfoModal={() => infoRef.current?.showModal()}
                ></InfoButton>
                <InfoModal
                    ref={infoRef}
                    title={"Budgets"}
                    desc={
                        "A budget sets a planned limit for spending or saving within a period. Budgets break down finances by timeframe, provide insights, and help you track and control your money."
                    }
                    icon={<PieChart size={36}></PieChart>}
                ></InfoModal>
            </div>
            {/* 9. Type Selector */}
            <BudgetTypeSelector
                slider={slider}
                setSlider={setSlider}
                showAll={true}
            ></BudgetTypeSelector>
            {/* 10. Search Bar */}
            <SearchBar
                title={"Search budget..."}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            ></SearchBar>
            {/* 11. Body | Budget Cards */}
            <div className="w-full gap-2 flex flex-col pb-16">
                {showBudgets()}
            </div>
            {/* 12. Add Button */}
            <AddButton
                title="Create Budget"
                showModal={showCreateModal}
                setShowModal={setShowCreateModal}
            ></AddButton>
            {/* 13. View Modal */}
            {showViewModal && (
                <BudgetViewModal
                    Budget={budget!}
                    Cancel={Cancel}
                    GetData={GetData}
                ></BudgetViewModal>
            )}
            {/* 14. Create Modal */}
            {showCreateModal && (
                <BudgetModal
                    typeOfModal="Create"
                    Cancel={Cancel}
                    GetData={GetData}
                ></BudgetModal>
            )}
        </div>
    );
};

// 11. Export the Budget Page
export default Budgets;
