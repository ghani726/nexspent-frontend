import { Link } from "react-router";
import useAuth from "../../hooks/Auth";


const Website = () => {
	const {isLoggedIn, setIsLoggedIn} = useAuth();

	return (
		<>
			<h1>Hello World!</h1>
		</>
	);
};

export default Website;
