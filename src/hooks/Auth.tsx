import { useContext } from "react";
import AuthContext from "@/contexts/AuthContext";
import { IAuthContext } from "@/types/auth";
const useAuth = (): IAuthContext => {
    const Auth = useContext(AuthContext);
    if (!Auth) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return Auth;
};

export default useAuth;
