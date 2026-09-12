import { ReactNode, useState } from "react";
import DataContext from "./DataContext";
import useAuth from "../hooks/Auth";
import toast from "react-hot-toast";
import { GetDataNow } from "../api/AuthAPI";
import { ApiError } from "@/types/common";
import type { IabgObj, IAccount } from "@/types/common";
import { ICategory } from "@/types/category";
import { ITransaction } from "@/types/transaction";
const DataProvider = ({ children }: { children: ReactNode }) => {
    // GetData

    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [budgets, setBudgets] = useState<IabgObj[]>([]);
    const [goals, setGoals] = useState<IabgObj[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    const [isDataFetched, setIsDataFetched] = useState(false);
    const { accessToken } = useAuth();

    const GetData = async () => {
        toast.loading("Fetching data...");
        try {
            const res = await GetDataNow(accessToken ?? "");

            if (res.success) {
                toast.dismissAll();
                toast.success("Data fetched successfully.");
                setAccounts(res.data.accounts);
                setBudgets(res.data.budgets);
                setGoals(res.data.goals);
                setCategories(res.data.categories);
                setTransactions(res.data.transactions);
            } else {
                toast.dismissAll();
                return toast.error(res.error.message);
            }
        } catch (err) {
            toast.dismissAll();
            const error = err as ApiError;
            if (error?.response?.data?.error?.message) {
                return toast.error(error?.response?.data?.error?.message);
            } else {
                return toast.error(error.message);
            }
        }
    };

    return (
        <>
            <DataContext.Provider
                value={{
                    accounts,
                    setAccounts,
                    budgets,
                    setBudgets,
                    goals,
                    setGoals,
                    categories,
                    setCategories,
                    transactions,
                    setTransactions,
                    GetData,
                    isDataFetched,
                    setIsDataFetched,
                }}
            >
                {children}
            </DataContext.Provider>
        </>
    );
};

export default DataProvider;
