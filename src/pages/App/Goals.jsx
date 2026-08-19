import { Goal } from "lucide-react";
import AddButton from "../../components/App/Common/AddButton";
import { useRef, useState } from "react";
import AccountsModal from "../../components/App/Goals/Modal";
import useData from "../../hooks/Data";
import InfoModal from "../../components/App/Common/InfoModal";
import InfoButton from "../../components/App/Common/InfoButton";

const Goals = () => {
   // Modal states
   const [showModal, setShowModal] = useState(false);

   // Edit States
   const [typeOfModal, setTypeOfModal] = useState("Add");
   const [name, setName] = useState("");
   const [amount, setAmount] = useState(0);
   const [periodLength, setPeriodLength] = useState(0);
   const [period, setPeriod] = useState("Month");
   const [bgColor, setBgColor] = useState("Default");
   const [accountID, setAccountID] = useState(null);

   const { budgets, transactions } = useData();

   //   Function to get back
   const Cancel = () => {
      setShowModal(false);
      setTypeOfModal("Add");
      setName("");
      setAmount(0);
      setBgColor("Default");
      setPeriod("Month");
      setPeriodLength(0);
      setAccountID(null);
   };

   //   Function to control edit.
   const EditFunc = (
      name,
      amount,
      periodLength,
      period,
      bgColor,
      accountID,
   ) => {
      setTypeOfModal("Edit");
      setName(name);
      setAmount(amount);
      setPeriodLength(periodLength);
      setPeriod(period);
      setBgColor(bgColor);
      setAccountID(accountID);
      setShowModal(true);
   };

   // Info Modal

	const infoRef = useRef(null)

	const openInfoModal = () => infoRef.current?.showModal();

	const closeInfoModal = () => infoRef.current?.close();

   //   HTML
   return (
      <div className="relative w-full lg:max-w-7/10 flex flex-col gap-4">
         <div className="flex justify-between items-center">
            <h2 className="font-bold line-clamp-1 text-3xl text-primary">
               Goals
            </h2>
            <InfoButton openInfoModal={openInfoModal}></InfoButton>
            <InfoModal
               ref={infoRef}
					closeInfoModal={closeInfoModal}
               title={"Goals"}
               desc={"A goal is a specific target you want to achieve within a certain timeframe. Goals help you focus your efforts and measure your progress."}
               icon={<Goal size={36}></Goal>}
            ></InfoModal>
         </div>
         <div
            className="w-full gap-2 flex flex-col"
         >
            {/* {accounts?.length > 0 &&
               accounts?.map((e) => {
                  const txns = transactions.filter((i) => {
                     if (i.type === "expense" || i.type === "income") {
                        return i.account === e._id;
                     }
                  });
                  return (
                     <AccountCard
                        key={e._id}
                        name={e.name}
                        balance={e.balance}
                        currency={e.currency}
                        accountsLength={accounts.length}
                        transactions={0}
                        bgColor={e.bgColor}
                        transactions={txns}
                        obj={e}
                        EditFunc={EditFunc}
                     ></AccountCard>
                  );
               })} */}

         </div>
         <AddButton
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
                  amount,
                  periodLength,
                  period,
                  bgColor,
                  accountID,
               }}
            ></AccountsModal>
         )}
      </div>
   );
};

export default Goals;
