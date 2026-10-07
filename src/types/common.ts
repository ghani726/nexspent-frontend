import { IBudget } from "@/types/budget";
import { ICategory } from "@/types/category";
import { IGoal } from "@/types/goal";
import { ITransaction } from "@/types/transaction";

export interface ApiError {
    response?: {
        data?: {
            success: boolean;
            isLoggedOut?: boolean;
            error: {
                message: string;
                errorMessage?: string;
            };
        };
    };
    message: string;
}

export interface IDeleteHandlerProps {
    _id: string;
    token: string;
    Cancel: () => void;
    GetData: () => void;
    setIsLoading: (data: boolean) => void;
}
export interface IColor {
    name: string;
    color: string;
}

export interface ICurrency {
    code: string;
    country: string;
    symbol: string;
}

export interface IAccount {
    _id?: string;
    name: string;
    userID: string;
    decimalPrecision: number;
    currency: ICurrency;
    balance?: number;
    bgColor?: string;
}

export interface IDataContext {
    accounts: IAccount[];
    setAccounts: (value: IAccount[]) => void;
    budgets: IBudget[];
    setBudgets: (value: IBudget[]) => void;
    goals: IGoal[];
    setGoals: (value: IGoal[]) => void;
    categories: ICategory[];
    setCategories: (value: ICategory[]) => void;
    transactions: ITransaction[];
    setTransactions: (value: ITransaction[]) => void;
    isDataFetched: boolean;
    setIsDataFetched: (value: boolean) => void;
    GetData: () => void;
}
