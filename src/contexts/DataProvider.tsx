import { ReactNode, useState } from "react";
import DataContext from "./DataContext";
import useAuth from "../hooks/Auth";
import toast from "react-hot-toast";
import { GetDataNow } from "../api/AuthAPI";
import { ApiError } from "@/types/common";
import type { IAccount } from "@/types/account"
import { ICategory } from "@/types/category";
import { ITransaction } from "@/types/transaction";
import HandleErrorMessage from "@/utils/networkError";
import { IGoal } from "@/types/goal";
import { IBudget } from "@/types/budget";
const DataProvider = ({ children }: { children: ReactNode }) => {
    // GetData

    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [budgets, setBudgets] = useState<IBudget[]>([]);
    const [goals, setGoals] = useState<IGoal[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    const [isDataFetched, setIsDataFetched] = useState(false);
    const { accessToken } = useAuth();

    const { setSessions } = useAuth();
    const GetData = async () => {
        const loadingToast = toast.loading("Fetching data...");
        try {
            const res = await GetDataNow(accessToken ?? "");
            
            toast.dismiss(loadingToast)
            toast.success("Data fetched successfully.");
            setAccounts(res.data.accounts);
            setBudgets(res.data.budgets);
            setGoals(res.data.goals);
            setCategories(res.data.categories);
            setTransactions(res.data.transactions);
            setSessions(res.data.sessions);
        } catch (error) {
            toast.dismiss(loadingToast);
            const err = error as ApiError;
            const res = err?.response?.data;

            if (res) toast.error(res.error.message);
            else HandleErrorMessage(err);
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
