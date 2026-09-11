import { ICategory } from "@/types/category";
import { ITransaction } from "@/types/transaction";

export interface ApiError {
    response?: {
        data?: {
            error?: {
                message?: string;
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

export interface IabgObj {
    _id: string;
    name: string;
    bgColor: string;
}

export interface IAccount extends IabgObj {
    currency: ICurrency;
    balance: number;
    decimalPrecision?: number;
}

export interface IDataContext {
    accounts: IAccount[];
    setAccounts: (value: IAccount[]) => void;
    budgets: IabgObj[];
    setBudgets: (value: IabgObj[]) => void;
    goals: IabgObj[];
    setGoals: (value: IabgObj[]) => void;
    categories: ICategory[];
    setCategories: (value: ICategory[]) => void;
    transactions: ITransaction[];
    setTransactions: (value: ITransaction[]) => void;
    isDataFetched: boolean;
    setIsDataFetched: (value: boolean) => void;
    GetData: () => void;
}
