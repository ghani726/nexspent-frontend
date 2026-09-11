import { useContext } from "react";
import DataContext from "@/contexts/DataContext";
import { IDataContext } from "@/types/common";

const useData = (): IDataContext => {
	const Data = useContext(DataContext)
	if(!Data){
		throw new Error("useData must be used within an DataProvider");
	}
	return Data
};

export default useData;
