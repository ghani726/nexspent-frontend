import axios from "axios";
import config from "@/config/config";
import type { ICategory } from "@/types/category";

// Interfaces
interface CreateUpdate extends ICategory {
    token: string;
}

interface Delete {
    _id: string;
    token: string;
}
interface Merge extends Delete {
    mergeID: string;
}

// Add Account API
export const API_Category_Create = async ({
    name,
    bgColor,
    categoryType,
    icon,
    token,
}: CreateUpdate) => {
    const res = await axios.post(`${config.BackendURL}/user/category/`, {
        name: name,
        bgColor: bgColor,
        categoryType: categoryType,
        icon: icon,
        token: token,
    });
    return res.data;
};

export const API_Category_Update = async ({
    name,
    bgColor,
    categoryType,
    icon,
    _id,
    token,
}: CreateUpdate) => {
    const res = await axios.patch(`${config.BackendURL}/user/category/`, {
        name: name,
        bgColor: bgColor,
        categoryType: categoryType,
        icon: icon,
        categoryID: _id,
        token: token,
    });
    return res.data;
};

export const API_Category_Delete = async ({ _id, token }: Delete) => {
    const res = await axios.delete(`${config.BackendURL}/user/category/`, {
        data: {
            categoryID: _id,
            token: token,
        },
    });
    return res.data;
};

export const API_Category_Merge = async ({
    _id,
    mergeID,
    token,
}: Merge) => {
    const res = await axios.post(`${config.BackendURL}/user/category/merge`, {
        categoryID: _id,
        mergeCategoryID: mergeID,
        token: token,
    });
    return res.data;
};
