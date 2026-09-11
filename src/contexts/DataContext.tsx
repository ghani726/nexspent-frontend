import { IDataContext } from "@/types/common";
import { createContext } from "react";

const DataContext = createContext<IDataContext | null>(null)

export default DataContext