import { useContext } from "react";
import DataContext from "../contexts/DataContext";
const useData = () => {
	const Data = useContext(DataContext)
	return Data
};

export default useData;
