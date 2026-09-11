import type { IUser } from "@/types/auth";
import toast from "react-hot-toast";

const LogoutUtility = ({
        setAccessToken,
        setIsLoggedIn,
        setUser,
        setCurrentSession,
        setDataToSessionStorage,
        navigate
    }: {
        setAccessToken: (value: null)=> void;
        setIsLoggedIn: (value: boolean)=> void;
        setUser: (value: null)=> void;
        setCurrentSession: (value: null)=> void;
        setDataToSessionStorage: (value: boolean, user: IUser) => void
        navigate: (val1: string, val2: {replace: boolean}) => void
    }) => {

    toast.dismissAll()
    navigate("/login", { replace: true });
    setUser(null);
    setAccessToken(null);
    setCurrentSession(null);
    setIsLoggedIn(false);
    setDataToSessionStorage(false, {
        fullName: "NexSpent",
        email: "info@nextspent.com",
        userName: "nexspent",
        sessions: [],
        defaultDecimalPrecision: 2,
        defaultCurrency: {
            symbol: "$",
            country: "United States",
            code: "USD",
        },
    });
    return toast.success("Logged out successfully");
};

export default LogoutUtility;
