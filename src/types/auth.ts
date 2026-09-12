import { ICurrency } from "@/types/common";

export interface IUser {
    fullName: string;
    email: string;
    userName: string;
    sessions: ISession[];
    defaultCurrency: ICurrency
    defaultDecimalPrecision: number;
}
export interface ISession {
    refreshTokenHash: string;
    oldRefreshTokenHash: string | null;
    ip: string;
    device: {
        browser: string;
        device: string | null | undefined;
    };
    _id: string;
}

export interface IAuthContext {
    isLoggedIn: boolean;
    setIsLoggedIn: (val: boolean) => void;
    accessToken: string | null;
    setAccessToken: (val: string | null) => void;
    user: IUser | null;
    setUser: (val: IUser | null) => void;
    currentSession: string | null;
    setCurrentSession: (value: string | null) => void;
    setDataToSessionStorage: (is_logged_in: boolean, u: IUser) => void;
    getDatafromSessionStorage: () => [boolean, IUser];
}