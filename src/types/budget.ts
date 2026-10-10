export interface IBudget {
    _id?: string;
    userID?: string;
    type: "One-Time" | "Auto-Repeat";
    title: string;
    amount: number;
    bgColor?: string;

    // One-Time
    startDate?: string;
    endDate?: string;

    // Auto-Repeat
    cycleType?: "weekly" | "monthly" | "yearly";
    cycleWeekly?: number; //1-7
    cycleMonthly?: number; //1-28
    cycleYearly?: {
        month: number; //1-12
        day: number; //1-28
    };

    createdAt?: string;
}
