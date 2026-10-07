export interface ITransaction {
    // Basic
    _id?: string;
    userID?: string;
    title?: string;
    description?: string;
    type: "expense" | "income" | "transfer";
    amount: number;
    date?: Date | string;

    // Expense Only + First 2 for Income

    account?: string; //Expense + Income
    category?: string; //Expense + Income
    budget?: string; // Expense Only
    goal?: string; //Expense Only

    // Transfer Only

    fromAccount?: string;
    toAccount?: string;

    bgColor?: string;
    icon?: string;
}

export interface IFinalTxn {
    date: string;
    trasactions: (ITransaction | undefined)[];
}
