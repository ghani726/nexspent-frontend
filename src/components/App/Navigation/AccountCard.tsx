import { CircleUserRound, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Logout } from "../../../api/AuthAPI";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/Auth";
import { ApiError } from "@/types/common";
import LogoutUtility from "@/utils/logout";
const AccountCard = ({
    isMenuShown,
    setIsMenuShown,
}: {
    isMenuShown: boolean;
    setIsMenuShown: (value: boolean) => void;
}) => {
    const {
        accessToken,
        currentSession,
        setAccessToken,
        setIsLoggedIn,
        setUser,
        setCurrentSession,
        setDataToSessionStorage,
    } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await Logout(accessToken, currentSession);
            if (res.success)
                LogoutUtility({
                    setAccessToken,
                    setIsLoggedIn,
                    setUser,
                    setCurrentSession,
                    setDataToSessionStorage,
                    navigate,
                });
            else toast.error(res?.error?.message);
        } catch (err) {
            const error = err as ApiError;
            if (error?.response?.data?.error?.message) {
                return toast.error(error.response.data.error.message);
            } else {
                return toast.error(error.message);
            }
        }
    };
    return (
        <div
            className={`menu z-10 ${isMenuShown ? "translate-y-0 opacity-100" : "translate-y-[-170%] opacity-0"} ease-in-out duration-300 flex flex-col items-start justify-center p-2 bg-white dark:bg-gray-800 absolute right-2 top-15.5 gap-2 rounded-3xl shadow-[0_0_10px_rgba(0,0,0,0.3)] `}
        >
            <Link
                to="/app/account/"
                onClick={() => {
                    setIsMenuShown(false);
                }}
                className={` p-2 w-full text-left rounded-lg cursor-pointer duration-300 ease-in-out transition-all text-secondary-600 flex items-center gap-2 bg-transparent hover:bg-secondary-100 hover:text-primary`}
            >
                <CircleUserRound
                    className="h-5 w-5 shrink-0"
                    size={24}
                    strokeWidth={2.2}
                ></CircleUserRound>
                <p className={`text-xs`}>Account</p>
            </Link>
            <Link
                to={""}
                onClick={handleLogout}
                className={` p-2 w-full text-left rounded-lg cursor-pointer duration-300 ease-in-out transition-all text-secondary-600 flex items-center gap-2 bg-transparent hover:bg-secondary-100 hover:text-red-500`}
            >
                <LogOut
                    className="h-5 w-5 shrink-0"
                    size={24}
                    strokeWidth={2.2}
                ></LogOut>
                <p className={`text-xs`}>Logout</p>
            </Link>
        </div>
    );
};

export default AccountCard;
