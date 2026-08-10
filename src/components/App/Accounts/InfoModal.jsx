import { Wallet, X } from "lucide-react";

const InfoModal = ({ showInfoModal, setShowInfoModal }) => {
	return (
		<div
			className={`flex duration-300 ease-in-out ${showInfoModal ? "scale-100 opacity-100 z-100" : "scale-0 opacity-0 -z-10"} gap-2 flex-col justify-center shadow-large min-w-2xs items-center p-10 rounded-5xl bg-surface fixed top-1/2 left-1/2 -translate-1/2`}
		>
			<button
				onClick={() => setShowInfoModal(false)}
				className="text-secondary-600 rounded-full p-2 cursor-pointer disabled:cursor-not-allowed hover:text-red-600 duration-300 ease-in-out absolute right-8 top-8"
			>
				<X></X>
			</button>
			<span className="flex bg-primary p-4 rounded-full text-white justify-center items-center">
				<Wallet size={36}></Wallet>
			</span>
			<h2 className="text-primary text-3xl font-bold">Accounts</h2>
			<p className="text-center text-lg max-w-100">
				Every transaction belongs to an account, which represents where
				your money is stored or spent - like cash, or credit.
			</p>
			<button className="text-white bg-primary cursor-pointer font-semibold px-6 p-3 rounded-full mt-2 duration-300 ease-in-out active:scale-95">
				View Guide
			</button>
		</div>
	);
};

export default InfoModal;
