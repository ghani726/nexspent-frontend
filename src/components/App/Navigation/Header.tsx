import { CloudBackup, PanelRightClose, PanelRightOpen } from "lucide-react";
import useAuth from "../../../hooks/Auth";
import AccountCard from "./AccountCard";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

const Header = ({
    hide,
    setHide,
    GetData,
}: {
    hide: boolean;
    setHide: Dispatch<SetStateAction<boolean>>;
    GetData: () => void;
}) => {
    const { user } = useAuth();
    const fullName = user?.fullName;
    const [isMenuShown, setIsMenuShown] = useState(false);
    return (
        <header className="p-3 pb-1.5">
            <div className="flex bg-surface dark:bg-gray-800 shadow-medium rounded-5xl justify-between items-center gap-4 p-4 max-h-14">
                <div className="flex justify-between items-center gap-4">
                    <div
                        className="hidden md:flex justify-center items-center rounded-lg h-6.5 w-6.5"
                        onClick={() => setHide((prev) => !prev)}
                    >
                        {hide ? (
                            <PanelRightClose
                                className="h-7.5 w-7.5 shrink-0"
                                strokeWidth={2}
                                size={24}
                            />
                        ) : (
                            <PanelRightOpen
                                className="h-7.5 w-7.5 shrink-0"
                                strokeWidth={2}
                                size={30}
                            />
                        )}
                    </div>

                    <h1 className="text-primary font-bold text-2xl">
                        Nex
                        <span className="text-black dark:text-white">
                            Spent
                        </span>
                    </h1>
                </div>
                <div className="flex justify-between items-center gap-4">
                    <div
                        className="flex justify-center items-center cursor-pointer rounded-lg h-7.5 w-7.5"
                        onClick={() => {
                            toast.loading("Fetching Data");
                            GetData();
                            toast.dismissAll();
                            toast.success("Data fetched successfully");
                        }}
                    >
                        <CloudBackup
                            className="h-7.5 w-7.5 shrink-0"
                            strokeWidth={1.8}
                            size={24}
                        ></CloudBackup>
                    </div>
                    <div
                        className="flex justify-center items-center cursor-pointer bg-primary font-bold text-white p-4 rounded-full h-4 w-4"
                        onClick={() => {
                            setIsMenuShown((prev) => !prev);
                        }}
                    >
                        {fullName ? fullName[0]?.toUpperCase() : ""}
                    </div>
                </div>

                <AccountCard
                    isMenuShown={isMenuShown}
                    setIsMenuShown={setIsMenuShown}
                ></AccountCard>
            </div>
        </header>
    );
};

export default Header;
