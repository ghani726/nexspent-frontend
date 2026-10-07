export interface IGoal {
    _id?: string;
    title: string;
    userID?: string;
    goalAmount: number;
    savedAmount?: number;
    status: "pending" |"active" | "completed" | "failed";
    startDate: string;
    endDate?: string | null;
    bgColor?: string;
    icon?: string;
}
