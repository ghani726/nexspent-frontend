import { CircleUserRound, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Logout } from "../../../api/AuthAPI";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/Auth";
const AccountCard = ({ isMenuShown, setIsMenuShown }) => {
	const {
		setUser,
		setAccessToken,
		accessToken,
		setCurrentSession,
		currentSession,
		setDataToSessionStorage
	} = useAuth();

	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			console.log(accessToken);

			console.log(currentSession);
			
			const res = await Logout(accessToken, currentSession);

			console.log(res);

			if (res.success) {
				toast.dismissAll();
				toast.success("Logged out successfully");
				navigate("/login", { replace: true });	
				setUser({});
				setAccessToken(null);
				setCurrentSession(null);
				setDataToSessionStorage(false, {fullName: "NexSpent"})
			}
		} catch (error) {
			if (error.response) {
				return toast.error(error.response.data.message);
			} else {
				return toast.error(error.message);
			}
		}
	};
	return (
		<div
			className={`menu z-10 ${isMenuShown ? "translate-y-0 opacity-100":"translate-y-[-170%] opacity-0"} ease-in-out duration-300 flex flex-col items-start justify-center p-2 bg-white absolute right-2 top-15.5 gap-2 rounded-3xl shadow-[0_0_10px_rgba(0,0,0,0.3)] `}
		>
			<Link
				to="/app/account/"
				onClick={() => {
					setIsMenuShown(false);
				}}
				className={` p-2 w-full text-left rounded-lg cursor-pointer duration-300 ease-in-out transition-all text-secondary-600 flex items-center gap-2 bg-transparent hover:bg-secondary-100 hover:text-primary`}
			>
				<CircleUserRound
					className="h-5 w-5 shrink-0"
					size={24}
					strokeWidth={2.2}
				></CircleUserRound>
				<p className={`text-xs`}>Account</p>
			</Link>
			<Link
				onClick={handleLogout}
				className={` p-2 w-full text-left rounded-lg cursor-pointer duration-300 ease-in-out transition-all text-secondary-600 flex items-center gap-2 bg-transparent hover:bg-secondary-100 hover:text-red-500`}
			>
				<LogOut
					className="h-5 w-5 shrink-0"
					size={24}
					strokeWidth={2.2}
				></LogOut>
				<p className={`text-xs`}>Logout</p>
			</Link>
		</div>
	);
};

export default AccountCard;
