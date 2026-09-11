import axios from "axios";
import config from "@/config/config";
import type { ITransaction } from "@/types/transaction.js";

interface CreateOrEdit extends ITransaction {
    token: string
}


// Add Account API
export const CreateTransaction = async ({
    title,
    description,
    type,
    amount,
    date = new Date().toISOString(),
    account,
    category,
    budget,
    goal,
    fromAccount,
    toAccount,
    token,
}: CreateOrEdit) => {    
    const res = await axios.post(
        `${config.BackendURL}/user/transaction/`,
        {
            title: title,
            description: description,
            type: type,
            amount: amount,
            date: date,
            account: account,
            category: category,
            budget: budget,
            goal: goal,
            fromAccount: fromAccount,
            toAccount: toAccount,
            token: token,
        },
        {
            withCredentials: true, // <--- THIS IS REQUIRED
        },
    );
    return res.data;
};
export const UpdateTransaction = async ({
    _id,
    title,
    description,
    type,
    amount,
    date = new Date().toISOString(),
    account,
    category,
    budget,
    goal,
    fromAccount,
    toAccount,
    token,
}: CreateOrEdit) => {
    const res = await axios.patch(
        `${config.BackendURL}/user/transaction/`,
        {
            title: title,
            description: description,
            type: type,
            amount: amount,
            date: date,
            account: account,
            category: category,
            budget: budget,
            goal: goal,
            fromAccount: fromAccount,
            toAccount: toAccount,
            transactionID: _id,
            token: token,
        },
        {
            withCredentials: true, // <--- THIS IS REQUIRED
        },
    );
    return res.data;
};
export const DeleteTransaction = async ({
    _id,
    token,
}: {
    _id: string;
    token: string;
}) => {
    const res = await axios.delete(`${config.BackendURL}/user/transaction/`, {
        data: {
            transactionID: _id,
            token: token,
        },
    });
    return res.data;
};
