import { ReactNode, useState } from "react";
import AuthContext from "./AuthContext";
import { IUser } from "@/types/auth";

const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const [currentSession, setCurrentSession] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    const setDataToSessionStorage = (is_logged_in: boolean, u: IUser) => {
        sessionStorage.setItem("user", JSON.stringify(u));
        sessionStorage.setItem("isLoggedIn", JSON.stringify(is_logged_in));
    };

    const getDatafromSessionStorage = (): [boolean, IUser] => {
        const userSession: IUser = JSON.parse(sessionStorage.getItem("user") as string);
        const isLoggedInSession: boolean = JSON.parse(
            sessionStorage.getItem("isLoggedIn") as string,
        );

        return [isLoggedInSession, userSession];
    };
    return (
        <>
            <AuthContext.Provider
                value={{
                    isLoggedIn,
                    setIsLoggedIn,
                    accessToken,
                    setAccessToken,
                    user,
                    setUser,
                    currentSession,
                    setCurrentSession,
                    setDataToSessionStorage,
                    getDatafromSessionStorage,
                }}
            >
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;
