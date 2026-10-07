import { ICurrency } from "@/types/common";
import { Dispatch, SetStateAction } from "react";

export interface IUser {
    _id?: string;
    fullName: string;
    email: string;
    userName: string;
    password?: string;

    defaultCurrency: ICurrency;
    defaultDecimalPrecision: number;
    isEmailVerified?: boolean;
}

export interface ISession {
    _id?: string;
    userID?: string;
    refreshTokenHash: string;
    olRefreshTokenHash?: string;
    ipAddress?: string;
    deviceInfo: {
        device: string;
        browser: string | null | undefined;
    };
    expiresAt: Date | string;
}

export interface IAuthContext {
    isLoggedIn: boolean;
    setIsLoggedIn: (val: boolean) => void;
    accessToken: string | null;
    setAccessToken: (val: string | null) => void;
    user: IUser | null;
    setUser: (val: IUser | null) => void;
    currentSession: string | null;
    sessions: ISession[] | null;
    setSessions:Dispatch<SetStateAction<ISession[] | null>>;
    setCurrentSession: (value: string | null) => void;
    setDataToSessionStorage: (is_logged_in: boolean, u: IUser) => void;
    getDatafromSessionStorage: () => [boolean, IUser];
}
