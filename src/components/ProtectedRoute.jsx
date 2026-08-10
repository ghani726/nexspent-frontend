import { useNavigate } from "react-router";
import useAuth from "../hooks/Auth";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
	const { isLoggedIn, getDatafromSessionStorage } = useAuth();

	const navigate = useNavigate();

	const [isLoggedInSession] = getDatafromSessionStorage();

	useEffect(() => {
		if (!isLoggedIn) {
			if (!isLoggedInSession) {
				toast.error("Please login first.");
				return navigate("/login", { replace: true });
			}
		}
	}, [isLoggedIn, isLoggedInSession, navigate]);

	return children;
};

export default ProtectedRoute;
