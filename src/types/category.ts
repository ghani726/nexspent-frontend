export interface ICategory {
    _id?: string;
    bgColor: string;
    categoryType: "expense" | "income";
    icon: string;
    name: string;
}
