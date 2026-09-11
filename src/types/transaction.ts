export interface ITransaction {
    account: string;
    amount: number;
    bgColor?: string;
    category?: string;
    goal?: string;
    budget?: string;
    fromAccount?: string;
    toAccount?: string;
    createdAt?: string;
    date?: string;
    description?: string;
    icon?: string;
    title: string;
    type: "income" | "expense" | "transfer";
    _id?: string;
}
