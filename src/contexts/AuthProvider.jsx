import { useState } from "react";
import AuthContext from "./AuthContext";
const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [accessToken, setAccessToken] = useState(null);

	const [currentSession, setCurrentSession] = useState(null);
	const [user, setUser] = useState({});

	const setDataToSessionStorage = (iln, u) => {
		sessionStorage.setItem("user", JSON.stringify(u));
		sessionStorage.setItem("isLoggedIn", JSON.stringify(iln));
	};

	const getDatafromSessionStorage = () => {
		const userSession = JSON.parse(sessionStorage.getItem("user"));
		const isLoggedInSession = JSON.parse(
			sessionStorage.getItem("isLoggedIn"),
		);

		return [isLoggedInSession, userSession];
	};
	return (
		<>
			<AuthContext.Provider
				value={{
					isLoggedIn,
					setIsLoggedIn,
					accessToken,
					setAccessToken,
					user,
					setUser,
					currentSession,
					setCurrentSession,
					setDataToSessionStorage,
					getDatafromSessionStorage,
				}}
			>
				{children}
			</AuthContext.Provider>
		</>
	);
};

export default AuthProvider;
