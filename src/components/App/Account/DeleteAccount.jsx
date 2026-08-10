import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/Auth";
import { DeleteAccount } from "../../../api/AuthAPI";
import { useNavigate } from "react-router";
const DeleteModal = ({ setShowDeleteModal }) => {
	const navigate = useNavigate();
	const { accessToken, setUser, setAccessToken } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const [password, setPassword] = useState("");

	const [passwordHidden, setPasswordHidden] = useState(false);
	const passwordReg = /^[a-zA-Z0-9_\-.@!#$]{6,30}$/;

	const handleDelete = async () => {
		if (!passwordReg.test(password)) {
			return toast.error(
				"Enter a valid password. Minimum 6 and Maximum 30 characters.",
			);
		}
		setIsLoading(true);
		try {
			const res = await DeleteAccount(password, accessToken);
			if (!res.isLoggedIn) {
				navigate("/login", { replace: true });
				toast.success("Account deleted successfully", {
					style: {
						maxWidth: "fit-content",
					},
					iconTheme: {
						primary: "#4a12f3",
					},
				});

				setAccessToken(null);
				setUser({});
				setIsLoading(false);
				setShowDeleteModal(false);
				
                

				return;
			}
		} catch (error) {
			setIsLoading(false);
			if (error.response) {
				return toast.error(error.response.data.message);
			} else {
				return toast.error(error.message);
			}
		}
	};
	return (
		<div className="fixed inset-0 z-15 backdrop-blur-sm flex justify-center items-center">
			<div
				className={`flex max-h-9/10 overflow-auto ease-in-out duration-300 animate-fade-in flex-col justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-8 rounded-2xl w-9/10 ms:w-md gap-3 bg-white dark:text-white`}
			>
				<div className="flex justify-center items-center p-3 rounded-full aspect-square bg-red-100 text-red-600">
					<TriangleAlert></TriangleAlert>
				</div>
				<h2 className="text-2xl font-bold -mb-1">Delete Account</h2>
				<p className="text-secondary-500 text-center">
					Are your sure you want to delete your account? This would
					delete all of your data.
				</p>
				<h3 className="text-lg text-center text-primary-700 font-semibold -mb-1">
					Enter your password to delete your account
				</h3>

				<div className="input-box-p text-lg bg-gray-100 rounded-2xl px-4">
					<input
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type={passwordHidden ? "password" : "text"}
						className="outline-none"
						placeholder=" "
					/>
					<label htmlFor="userName">Password</label>
					<div
						className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400"
						onClick={() => {
							setPasswordHidden((prev) => !prev);
						}}
					>
						{passwordHidden ? <Eye /> : <EyeOff />}
					</div>
				</div>
				<div className="flex justify-between items-center gap-4">
					<button
						onClick={() => {
							setShowDeleteModal(false);
						}}
						disabled={isLoading}
						className="px-6 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-3 rounded-xl bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 disabled:active:scale-100 dark:hover:bg-secondary-900 duration-300 ease-in-out"
					>
						Cancel
					</button>
					<button
						disabled={isLoading}
						onClick={handleDelete}
						className="px-6 disabled:bg-red-400 disabled:active:scale-100 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 duration-300 ease-in-out"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
