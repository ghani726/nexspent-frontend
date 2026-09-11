import InfoButton from "@/components/App/Common/InfoButton";
import InfoModal from "@/components/App/Common/InfoModal";
import useAuth from "@/hooks/Auth";
import {
    Home,
    PieChart,
    Wallet,
    Receipt,
    Shapes,
    Goal,
    Ellipsis,
} from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";

const More = () => {
    const {user} = useAuth()
    const infoRef = useRef<HTMLDialogElement>(null);

    const openInfoModal = () => infoRef.current?.showModal();

    return (
        <div className={`relative w-full lg:max-w-7/10 flex flex-col gap-3`}>
            <div className="flex justify-between items-center">
                <h2 className="font-bold line-clamp-1 break-all pb-0.5 text-3xl text-primary">
                    More
                </h2>
                <div className="flex">
                    <InfoButton openInfoModal={openInfoModal}></InfoButton>
                </div>
                <InfoModal
                    ref={infoRef}
                    title={"More"}
                    desc={
                        "This page allows you to access pages which are not available in the navbar."
                    }
                    icon={<Ellipsis size={36}></Ellipsis>}
                ></InfoModal>
            </div>
            <Link
                to={"/app/account/"}
                className={`p-3 bg-white dark:bg-gray-800 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 justify-start  rounded-full cursor-pointer active:scale-95 ease-in-out duration-300 shadow-small`}
            >
                <div className="h-12 aspect-square bg-primary rounded-full flex justify-center items-center text-2xl font-semibold text-white">{user?.fullName[0]}</div>
                <div className={`z-5 flex flex-col`}>
                    <h4 className="font-semibold text-lg animate-slide-in-left">My Account</h4>
                    <p className="text-xs animate-slide-in-left">
                        View and Edit your account details
                    </p>
                </div>
            </Link>
            <div className="w-full grid grid-cols-2 gap-3">
                <Link
                    to={"/app/"}
                    className={`p-4 px-5 bg-white dark:dark:bg-gray-800 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 justify-start rounded-full cursor-pointer active:scale-95 ease-in-out duration-300 shadow-small`}
                >
                    <Home className="z-5 shrink-0" size={24}></Home>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 flex`}
                    >
                        Home
                    </p>
                </Link>
                <Link
                    to={"/app/transactions/"}
                    className={`p-4 px-5 bg-white dark:bg-gray-800 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 justify-start  rounded-full cursor-pointer active:scale-95 ease-in-out duration-300 shadow-small`}
                >
                    <Receipt
                        className="z-5 shrink-0"
                        size={24}
                    ></Receipt>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 flex`}
                    >
                        Transactions
                    </p>
                </Link>
                <Link
                    to={"/app/budgets/"}
                    className={`p-4 px-5 bg-white dark:bg-gray-800 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 justify-start  rounded-full cursor-pointer active:scale-95 ease-in-out duration-300 shadow-small`}
                >
                    <PieChart
                        className="z-5 shrink-0"
                    ></PieChart>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 flex`}
                    >
                        Budgets
                    </p>
                </Link>
                <Link
                    to={"/app/accounts/"}
                    className={`p-4 px-5 bg-white dark:bg-gray-800 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 justify-start  rounded-full cursor-pointer active:scale-95 ease-in-out duration-300 shadow-small`}
                >
                    <Wallet className="z-5 shrink-0"></Wallet>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 flex`}
                    >
                        Accounts
                    </p>
                </Link>
                <Link
                    to={"/app/categories/"}
                    className={`p-4 px-5 bg-white dark:bg-gray-800 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 justify-start  rounded-full cursor-pointer active:scale-95 ease-in-out duration-300 shadow-small`}
                >
                    <Shapes
                        className="z-5 shrink-0"
                        strokeWidth={2.1}
                    ></Shapes>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 flex`}
                    >
                        Categories
                    </p>
                </Link>
                <Link
                    to={"/app/goals/"}
                    className={`p-4 px-5 bg-white dark:bg-gray-800 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 justify-start  rounded-full cursor-pointer active:scale-95 ease-in-out duration-300 shadow-small`}
                >
                    <Goal
                        className="z-5 shrink-0"
                        strokeWidth={2.1}
                    ></Goal>
                    <p
                        className={`font-semibold text-sm animate-slide-in-left z-5 flex`}
                    >
                        Goals
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default More;
