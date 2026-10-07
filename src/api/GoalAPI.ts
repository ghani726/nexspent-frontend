import axios from "axios";
import config from "@/config/config";
import type { IGoal } from "@/types/goal";

// Interfaces
interface Create extends Partial<IGoal> {
    token: string;
}
interface Edit extends Create {
    goalID?: string
    _id?: string;
}
interface Delete {
    _id: string;
    token: string;
}

// Add Account API
export const API_Goal_Create = async ({
    title,
    goalAmount,
    startDate,
    endDate,
    icon,
    bgColor,
    token,
}: Create) => {
    const res = await axios.post(`${config.BackendURL}/user/goals/`, {
        title: title,
        goalAmount: goalAmount,
        startDate: startDate,
        endDate: endDate,
        icon: icon,
        bgColor: bgColor,
        token: token,
    });
    return res.data;
};

export const API_Goal_Update = async ({
    title,
    goalAmount,
    startDate,
    endDate,
    icon,
    bgColor,
    _id,
    token,
}: Edit) => {
    const query: Edit = { goalID: _id!, token: token };
    if (title) query.title = title;
    if (goalAmount) query.goalAmount = goalAmount;
    if (startDate) query.startDate = startDate;
    if (endDate) query.endDate = endDate;
    if (icon) query.icon = icon;
    if (bgColor) query.bgColor = bgColor;
    const res = await axios.patch(`${config.BackendURL}/user/goals/`, query);
    return res.data;
};

export const API_Goal_Delete = async ({ _id, token }: Delete) => {
    const res = await axios.delete(`${config.BackendURL}/user/goals/`, {
        data: {
            goalID: _id,
            token: token,
        },
    });
    return res.data;
};
