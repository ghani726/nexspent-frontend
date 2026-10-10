import axios from "axios";

import config from "@/config/config";
import type { IAccount } from "@/types/account";

interface ICreate extends IAccount {
    token: string;
}
interface IDeleteOrMerge {
    token: string;
    _id: string;
    mergeID?: string;
}
// Create Account API
export const API_Account_Create = async ({
    name,
    balance = 0,
    bgColor = "Default",
    token,
}: ICreate) => {
    const res = await axios.post(`${config.BackendURL}/user/accounts/`, {
        name: name,
        balance: balance,
        bgColor: bgColor,
        token: token,
    });
    return res.data;
};

export const API_Account_Update = async ({
    name,
    bgColor = "Default",
    _id,
    token,
}: ICreate) => {
    const res = await axios.patch(`${config.BackendURL}/user/accounts/`, {
        name: name,
        bgColor: bgColor,
        accountID: _id,
        token: token,
    });
    return res.data;
};

export const API_Account_Delete = async ({ _id, token }: IDeleteOrMerge) => {
    const res = await axios.delete(`${config.BackendURL}/user/accounts/`, {
        data: {
            accountID: _id,
            token: token,
        },
    });
    return res.data;
};

export const API_Account_Merge = async ({
    _id,
    mergeID,
    token,
}: IDeleteOrMerge) => {
    const res = await axios.post(`${config.BackendURL}/user/accounts/merge`, {
        accountID: _id,
        mergeAccountID: mergeID,
        token: token,
    });
    return res.data;
};
