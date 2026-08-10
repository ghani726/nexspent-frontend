import { Triangle } from "lucide-react";
import useData from "../../../hooks/Data";

const AccountsCard = ({ name, balance, transactions, bgColor, currency }) => {
  const { colors } = useData();

  const bgColors = colors
    .find((e) => e.name === bgColor)
    .color.split("[")[1]
    .slice(0, -1); //Obtain the color code

	const bgClr = colors
    .find((e) => e.name === bgColor)
    .color
	
  return (
    <div
      style={{ borderColor: bgColors }}
      className={`flex shrink-0 relative flex-col justify-start items-start p-2 px-3 -space-y-1 w-fit bg-surface rounded-3xl border-3`}
    >
      <span
        className={`right-3 top-3 absolute rounded-full h-5 w-5 ${bgClr}`}
      ></span>
      <h3 className="font-bold text-[21px] mr-7">{name}</h3>
      <h4
        className={`${balance === 0 ? "text-black" : balance < 0 ? "text-red-500" : "text-primary"} -mb-1.5 font-semibold text-xl flex justify-start items-center gap-1`}
      >
        {currency?.symbol} {balance}{" "}
        {!balance ? null : balance > 0 ? (
          <Triangle className="" fill="currentColor" size={14}></Triangle>
        ) : (
          <Triangle
            className="rotate-180"
            fill="currentColor"
            size={14}
          ></Triangle>
        )}{" "}
      </h4>
      <p style={{color: bgColors}}>
        {transactions} {transactions === 1 ? "transaction" : "transactions"}
      </p>
    </div>
  );
};

export default AccountsCard;
