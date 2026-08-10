import AccountCard from "../../components/App/Accounts/AccountCard";
import { Info } from "lucide-react";
import AddButton from "../../components/App/AddButton";
import { useState } from "react";
import AccountsModal from "../../components/App/Accounts/Modal";
import useData from "../../hooks/Data";
import InfoModal from "../../components/App/Accounts/InfoModal";

const Accounts = () => {
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Edit States
  const [typeOfModal, setTypeOfModal] = useState("Add");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [decimalPrecision, setDecimalPrecision] = useState(0);
  const [bgColor, setBgColor] = useState("Default");
  const [currency, setCurrency] = useState({});
  const [accountID, setAccountID] = useState(null);

  const { accounts, transactions } = useData();

  //   Function to get back
  const Cancel = () => {
    setShowModal(false);
    setTypeOfModal("Add");
    setName("");
    setBalance(0);
    setBgColor("Default");
    setCurrency({});
    setDecimalPrecision(0);
    setAccountID(null);
  };

  //   Function to control edit.
  const EditFunc = (name, balance, dP, bgColor, currency, accountID) => {
    setTypeOfModal("Edit");
    setName(name);
    setBalance(balance);
    setDecimalPrecision(dP);
    setBgColor(bgColor);
    setCurrency(currency);
    setAccountID(accountID);
    setShowModal(true);
  };

  //   HTML
  return (
    <div className="relative w-full h-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold line-clamp-1 text-3xl text-primary">
          Accounts
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
      <div
        onClick={() => setShowInfoModal(false)}
        className="w-full gap-2 flex flex-col"
      >
        {accounts?.length > 0 &&
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
          })}
        {/* <AccountCard
					name={"Bank"}
					balance={100}
					currency={{ symbol: "$" }}
					accountsLength={2}
					transactions={0}
				></AccountCard> */}
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
            balance,
            decimalPrecision,
            bgColor,
            currency,
            accountID,
          }}
        ></AccountsModal>
      )}
    </div>
  );
};

export default Accounts;
