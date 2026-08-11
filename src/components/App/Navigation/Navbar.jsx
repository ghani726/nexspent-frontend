import { Home, PieChart, Wallet, Ellipsis, Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
const Navbar = () => {
	const [slider, setSlider] = useState(0);
	const [showLabels, setShowLabels] = useState(false);

	const location = useLocation();

	useEffect(() => {
		const path = location.pathname;

		if (path === "/app/" || path === "/app")
			setSlider(0); //eslint-disable-line
		else if (path.startsWith("/app/transactions")) setSlider(1);
		else if (path.startsWith("/app/budgets")) setSlider(2);
		else if (path.startsWith("/app/accounts")) setSlider(3);
		else if (path.startsWith("/app/categories")) setSlider(4);
		else if (path.startsWith("/app/goals")) setSlider(4);
		else if (path.startsWith("/app/account")) setSlider(4);
	}, [location.pathname]);
	return (
		<nav
			className={`flex absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full opacity-100  -translate-y md:-translate-y-full md:opacity-0 transition-all ease-in-out duration-300 justify-around items-center bg-surface shadow-large max-h-16 min-h-16`}
		>
			<div
				style={{
					transform: `translateX(${slider * 100}%)`,
				}}
				className="absolute duration-300 ease-in-out aspect-square rounded-full left-0 h-full bg-primary"
			></div>
			<Link
				title={"Home"}
				onClick={() => {
					setSlider(0);
				}}
				to={"/app/"}
				className={`p-2.5 w-16 z-5 h-full aspect-square flex flex-col items-center justify-center rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 0 ? "text-surface" : "text-black"}`}
			>
				<Home className="h-6 w-6 shrink-0" size={20}></Home>
				{showLabels && <p className={`font-semibold text-xs `}>Home</p>}
			</Link>
			<Link
				title={"Transactions & Activity"}
				onClick={() => {
					setSlider(1);
				}}
				to={"/app/transactions/"}
				className={`p-2.5 w-16 z-5 h-full aspect-square flex flex-col items-center justify-center rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 1 ? "text-surface" : "text-black"}`}
			>
				<Receipt className="h-6 w-6 shrink-0" size={20}></Receipt>
				{showLabels && (
					<p className={`font-semibold text-xs `}>Activity</p>
				)}
			</Link>
			<Link
				title={"Budgets"}
				onClick={() => {
					setSlider(2);
				}}
				to={"/app/budgets/"}
				className={`p-2.5 w-16 z-5 h-full aspect-square flex flex-col items-center justify-center rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 2 ? "text-surface" : "text-black"}`}
			>
				<PieChart className="h-6 w-6 shrink-0" size={20}></PieChart>
				{showLabels && (
					<p className={`font-semibold text-xs `}>Budgets</p>
				)}
			</Link>
			<Link
				title={"Accounts"}
				onClick={() => {
					setSlider(3);
				}}
				to={"/app/accounts/"}
				className={`p-2.5 w-16 z-5 h-full aspect-square flex flex-col items-center justify-center rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 3 ? "text-surface" : "text-black"}`}
			>
				<Wallet className="h-6 w-6 shrink-0" size={20}></Wallet>
				{showLabels && (
					<p className={`font-semibold text-xs `}>Accounts</p>
				)}
			</Link>
			<Link
				title={"More"}
				onClick={() => {
					setSlider(4);
				}}
				className={`p-2.5 w-16 z-5 h-full aspect-square flex flex-col items-center justify-center rounded-full cursor-pointer  active:scale-95 ease-in-out duration-200 ${slider === 4 ? "text-surface" : "text-black"}`}
			>
				<Ellipsis className="h-6 w-6 shrink-0" size={20}></Ellipsis>
				{showLabels && <p className={`font-semibold text-xs `}>More</p>}
			</Link>
		</nav>
	);
};

export default Navbar;
