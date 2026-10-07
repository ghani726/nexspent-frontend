import { useRef, useState } from "react";
import { Goal } from "lucide-react";
import AddButton from "@/components/App/Common/AddButton";
import InfoModal from "@/components/App/Common/InfoModal";
import InfoButton from "@/components/App/Common/InfoButton";
import { IGoal } from "@/types/goal";
import useData from "@/hooks/Data";
import GoalCard from "@/components/App/Goals/GoalCard";
import GoalViewModal from "@/components/App/Goals/GoalViewModal";
import GoalModal from "@/components/App/Goals/Modal";

const Goals = ({ GetData }: { GetData: () => void }) => {
    // 1. States.
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [goal, setGoal] = useState<IGoal | null>(null);

    // 2. Fetch all goals from gloabl context.
    const { goals } = useData();

    // 3. Function to close View Modal and set the Goal to empty
    const Cancel = () => {
        setShowCreateModal(false);
        setShowViewModal(false);
        setGoal(null);
    };

    // 4. Function to open View Modal and set the Goal to provided data.
    const ViewFunc = (goal: IGoal) => {
        setGoal(goal);
        setShowViewModal(true);
    };

    // 5. Info Modal
    const infoRef = useRef<HTMLDialogElement>(null);

    // 6. Main Component
    return (
        <div className="relative w-full lg:max-w-7/10 flex flex-col gap-4">
            {/* 7. Header */}
            <div className="flex justify-between items-center">
                <h2 className="font-bold line-clamp-1 text-3xl text-primary">
                    Goals
                </h2>
                <InfoButton
                    openInfoModal={() => infoRef.current?.showModal()}
                ></InfoButton>
                <InfoModal
                    ref={infoRef}
                    title={"Goals"}
                    desc={
                        "A goal represents a target amount you want to save over time. The goal defines the total target and transactions added contribute towards a goal's progress."
                    }
                    icon={<Goal size={36}></Goal>}
                ></InfoModal>
            </div>
            {/* 8. Body | Goal Cards */}
            <div className="w-full gap-2 flex flex-col">
                {goals.map((go) => (
                    <GoalCard
                        key={go._id}
                        obj={go}
                        ViewFunc={ViewFunc}
                    ></GoalCard>
                ))}
            </div>
            {/* 9. Add Button */}
            <AddButton
                title="Create Goal"
                showModal={showCreateModal}
                setShowModal={setShowCreateModal}
            ></AddButton>
            {/* 10. View Modal */}
            {showViewModal && (
                <GoalViewModal
                    Goal={goal!}
                    Cancel={Cancel}
                    GetData={GetData}
                ></GoalViewModal>
            )}
            {/* 11. Create Modal */}
            {showCreateModal && (
                <GoalModal
                    typeOfModal="Create"
                    Cancel={Cancel}
                    GetData={GetData}
                ></GoalModal>
            )}
        </div>
    );
};

// 11. Export the Goal Page
export default Goals;
