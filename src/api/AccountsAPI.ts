import axios from "axios";

import config from "@/config/config";
import type { IAccount } from "@/types/common";

interface IAdd extends Omit<IAccount, '_id'> {
    token: string;
    _id?: string
}
interface IUpdate extends Omit<IAdd, "balance"> {
    accountID: string;
}
interface IDeleteOrMerge {
    token: string;
    accountID: string;
    mergeAccountID?: string;
}
// Add Account API
export const AddAccount = async ({
    name,
    balance = 0,
    decimalPrecision,
    bgColor = "Default",
    currency,
    token,
}: IAdd) => {
    const res = await axios.post(
        `${config.BackendURL}/user/accounts/`,
        {
            name: name,
            balance: balance,
            decimalPrecision: decimalPrecision,
            bgColor: bgColor,
            currency: currency,
            token: token,
        },
        {
            withCredentials: true, // <--- THIS IS REQUIRED
        },
    );
    return res.data;
};

export const EditAccount = async ({
    name,
    decimalPrecision,
    bgColor = "Default",
    currency,
    accountID,
    token,
}: IUpdate) => {
    const res = await axios.patch(
        `${config.BackendURL}/user/accounts/`,
        {
            name: name,
            decimalPrecision: decimalPrecision,
            bgColor: bgColor,
            currency: currency,
            accountID: accountID,
            token: token,
        },
        {
            withCredentials: true, // <--- THIS IS REQUIRED
        },
    );
    return res.data;
};

export const DeleteAccount = async ({ accountID, token }: IDeleteOrMerge) => {
    const res = await axios.delete(`${config.BackendURL}/user/accounts/`, {
        data: {
            accountID: accountID,
            token: token,
        },
    });
    return res.data;
};

export const MergeAccount = async ({
    accountID,
    mergeAccountID,
    token,
}: IDeleteOrMerge) => {
    const res = await axios.post(
        `${config.BackendURL}/user/accounts/merge`,
        {
            accountID: accountID,
            mergeAccountID: mergeAccountID,
			
            token: token,
        },
        {
            withCredentials: true, // <--- THIS IS REQUIRED
        },
    );
    return res.data;
};
