import axios from "axios";
import config from "@/config/config";
import type { IBudget } from "@/types/budget";

// Interfaces
interface Create {
    data: Partial<IBudget>;
    token: string;
}
interface Update extends Create {
    budgetID?: string;
    _id?: string;
}
interface Delete {
    _id: string;
    token: string;
}

// Add Account API
export const API_Budget_Create = async ({ data, token }: Create) => {
    const res = await axios.post(`${config.BackendURL}/user/budgets/`, {
        ...data,
        token: token,
    });
    return res.data;
};

export const API_Budget_Update = async ({ data, token }: Update) => {
    const res = await axios.patch(`${config.BackendURL}/user/budgets/`, {
        ...data,
        token: token,
    });
    return res.data;
};

export const API_Budget_Delete = async ({ _id, token }: Delete) => {
    const res = await axios.delete(`${config.BackendURL}/user/budgets/`, {
        data: {
            _id: _id,
            token: token,
        },
    });
    return res.data;
};
