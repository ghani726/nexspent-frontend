import type { ICurrency } from "@/types/common";
import { ChangeEvent } from "react";

const CurrencyCard = ({e, selectedCurrency, handleCurrencyChange}: {e: ICurrency, selectedCurrency: ICurrency, handleCurrencyChange: (evt: ChangeEvent<HTMLInputElement>)=> void }) => {
	return (
		<label className="relative cursor-pointer p-1 w-full inline-block h-full">
			<input
				type="radio"
				name="currencies"
				value={JSON.stringify(e)}
				defaultChecked={selectedCurrency?.code === e.code}
				onChange={handleCurrencyChange}
				className="peer hidden"
			/>
			<div
				className={`rounded-3xl ease-in-out duration-300 w-full h-full flex flex-col justify-center items-center p-4 bg-app dark:bg-gray-800 peer-checked:ring-3 peer-checked:ring-primary`}
				title={e.code}
			>
				<p className="text-sm font-medium text-center">{e.code}</p>
				<h5 className="text-3xl font-bold text-center text-primary">
					{e.symbol}
				</h5>
				<p className="text-sm font-medium text-center">{e.country}</p>
			</div>
		</label>
	);
};

export default CurrencyCard;
