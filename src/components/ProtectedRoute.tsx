import { useNavigate } from "react-router";
import useAuth from "@/hooks/Auth";
import toast from "react-hot-toast";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isLoggedIn, getDatafromSessionStorage } = useAuth();

    const navigate = useNavigate();

    const [isLoggedInSession] = getDatafromSessionStorage();

    useEffect(() => {
        if (!isLoggedIn) {
            if (!isLoggedInSession) {
                toast.error("Please login first.");
                navigate("/login", { replace: true });
                return;
            }
        }
    }, [isLoggedIn, isLoggedInSession, navigate]);

    return children;
};

export default ProtectedRoute;
