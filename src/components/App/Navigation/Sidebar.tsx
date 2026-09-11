import {
    Home,
    PieChart,
    Wallet,
    Receipt,
    CircleUserRound,
    Shapes,
    Goal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const Sidebar = ({ hide }: { hide: boolean }) => {
    const [slider, setSlider] = useState(0);

    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        if (path === "/app/" || path === "/app")
            setSlider(0); //eslint-disable-line
        else if (path.startsWith("/app/transactions")) setSlider(1);
        else if (path.startsWith("/app/budgets")) setSlider(2);
        else if (path.startsWith("/app/accounts")) setSlider(3);
        else if (path.startsWith("/app/categories")) setSlider(4);
        else if (path.startsWith("/app/goals")) setSlider(5);
        else if (path.startsWith("/app/account")) setSlider(6);
    }, [location.pathname]);

    return (
        <aside className="-translate-x-full opacity-0 md:translate-x-0 md:opacity-100 transition-all ease-in-out duration-300 flex flex-col p-0 md:p-3 md:pt-1.5 w-0 md:w-auto">
            <nav
                className={`rounded-3xl flex-col p-2 gap-2 ${hide ? "min-w-14" : "min-w-64"} h-[calc(100dvh-3.5rem)] bg-surface dark:bg-gray-800 shadow-medium relative`}
            >
                <div
                    style={{
                        transform: `translateY(${slider * 100}%)`,
                    }}
                    className="absolute duration-300 ease-in-out rounded-full left-2 top-2 h-10 w-auto right-2 bg-primary z-2"
                ></div>
                <Link
                    to={"/app/"}
                    onClick={() => {
                        setSlider(0);
                    }}
                    className={`p-2.5 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-900 ${hide ? "justify-center" : "justify-start"} rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 0 ? "text-white" : ""}`}
                >
                    <Home className="h-5 w-5 z-5 shrink-0" size={20}></Home>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 ${hide ? "hidden" : "flex"}`}
                    >
                        Home
                    </p>
                </Link>
                <Link
                    to={"/app/transactions/"}
                    onClick={() => {
                        setSlider(1);
                    }}
                    className={`p-2.5 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-900 ${hide ? "justify-center" : "justify-start"}  rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 1 ? "text-white" : ""}`}
                >
                    <Receipt
                        className="h-5 w-5 z-5 shrink-0"
                        size={20}
                    ></Receipt>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 ${hide ? "hidden" : "flex"}`}
                    >
                        Transactions & Activity
                    </p>
                </Link>
                <Link
                    to={"/app/budgets/"}
                    onClick={() => {
                        setSlider(2);
                    }}
                    className={`p-2.5 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-900 ${hide ? "justify-center" : "justify-start"}  rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 2 ? "text-white" : ""}`}
                >
                    <PieChart
                        className="h-5 w-5 z-5 shrink-0"
                        size={20}
                    ></PieChart>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 ${hide ? "hidden" : "flex"}`}
                    >
                        Budgets
                    </p>
                </Link>
                <Link
                    to={"/app/accounts/"}
                    onClick={() => {
                        setSlider(3);
                    }}
                    className={`p-2.5 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-900 ${hide ? "justify-center" : "justify-start"}  rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 3 ? "text-white" : ""}`}
                >
                    <Wallet className="h-5 w-5 z-5 shrink-0" size={20}></Wallet>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 ${hide ? "hidden" : "flex"}`}
                    >
                        Accounts
                    </p>
                </Link>
                <Link
                    to={"/app/categories/"}
                    onClick={() => {
                        setSlider(4);
                    }}
                    className={`p-2.5 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-900 ${hide ? "justify-center" : "justify-start"}  rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 4 ? "text-white" : ""}`}
                >
                    <Shapes
                        className="h-5 w-5 z-5 shrink-0"
                        strokeWidth={2.1}
                        size={20}
                    ></Shapes>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 ${hide ? "hidden" : "flex"}`}
                    >
                        Categories
                    </p>
                </Link>
                <Link
                    to={"/app/goals/"}
                    onClick={() => {
                        setSlider(5);
                    }}
                    className={`p-2.5 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-900 ${hide ? "justify-center" : "justify-start"}  rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 5 ? "text-white" : ""}`}
                >
                    <Goal
                        className="h-5 w-5 z-5 shrink-0"
                        strokeWidth={2.1}
                        size={20}
                    ></Goal>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 ${hide ? "hidden" : "flex"}`}
                    >
                        Goals
                    </p>
                </Link>
                <Link
                    to={"/app/account/"}
                    onClick={() => {
                        setSlider(6);
                    }}
                    className={`p-2.5 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-900 ${hide ? "justify-center" : "justify-start"}  rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 6 ? "text-white" : ""}`}
                >
                    <CircleUserRound
                        className="h-5 w-5 z-5 shrink-0"
                        size={20}
                    ></CircleUserRound>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 ${hide ? "hidden" : "flex"}`}
                    >
                        Your Account
                    </p>
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
