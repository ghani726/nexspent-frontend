import { Eye, EyeOff, LogOut, Trash2 } from "lucide-react";
import useAuth from "../../../hooks/Auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { EditAccount, Logout } from "../../../api/AuthAPI";
import DeleteAccount from "./DeleteAccount";

const Actions = ({ setSlider }) => {
	const { user } = useAuth();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();

	const oldPass = watch("oldPassword"); //eslint-disable-line
	const newPass = watch("newPassword");
	const confirmPass = watch("newPasswordConfirm");

	const passwordRules = {
		minLength: {
			value: 6,
			message: "Password must be 6 to 30 characters.",
		},
		maxLength: {
			value: 30,
			message: "Password must be 6 to 30 characters.",
		},
		pattern: {
			value: /^[a-zA-Z0-9_\-.@!#$]{6,30}$/,
			message: "Enter a valid password.",
		},
	};

	const anyPassword = oldPass || newPass || confirmPass;

	const [passwordHidden, setPasswordHidden] = useState(true);
	const [passwordHiddenNew, setPasswordHiddenNew] = useState(true);
	const [passwordHiddenConfirm, setPasswordHiddenConfirm] = useState(true);

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { setUser, setAccessToken, accessToken, setCurrentSession } = useAuth();

	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			const res = await Logout(accessToken);

			if (res.success) {
				toast.dismissAll();
				toast.success("Logged out successfully");
				navigate("/login", { replace: true });
				setUser({});
				setAccessToken(null);
				setCurrentSession(null)
			} else {
				return toast.error(res.error.message)
			}
		} catch (error) {
			if (error.response) {
				return toast.error(error.response.data.error.message);
			} else {
				return toast.error(error.message);
			}
		}
	};
	const handleEdit = async (data) => {
		try {
			const res = await EditAccount(data, accessToken);

			if (res.success) {
				toast.dismissAll();
				toast.success("Account updated successfully");
				setUser(res.user);
				setSlider(0);
			} else {
				return toast.error(res.error.message)
			}
		} catch (error) {
			if (error.response) {
				return toast.error(error.response.data.error.message);
			} else {
				return toast.error(error.message);
			}
		}
	};

	if (errors.fullName) {
		toast.dismiss();
		toast.error(errors.fullName.message);
	} else if (errors.userName) {
		toast.dismiss();
		toast.error(errors.userName.message);
	} else if (errors.oldPassword) {
		toast.dismiss();
		toast.error(errors.oldPassword.message);
	} else if (errors.newPassword) {
		toast.dismiss();
		toast.error(errors.newPassword.message);
	} else if (errors.newPasswordConfirm) {
		toast.dismiss();
		toast.error(errors.newPasswordConfirm.message);
	}

	return (
		<>
			<div className="flex flex-col animate-fade-in justify-center items-center w-full bg-white dark:bg-gray-800 rounded-5xl">
				<form
					onSubmit={handleSubmit(handleEdit)}
					className="flex animate-fade-in flex-col justify-start items-start w-full p-6 rounded-xl  gap-4"
				>
					<h2 className="text-2xl font-bold text-primary w-full text-start mb-2">
						Edit your account:
					</h2>
					<div className="input-box text-lg bg-gray-100 rounded-full px-4">
						<input
							type="text"
							className="outline-none"
							placeholder=" "
							{...register("fullName", {
								value: user.fullName,
								required: {
									value: true,
									message: "Full name is required.",
								},
								minLength: {
									value: 4,
									message:
										"Full name must be 4 to 30 characters.",
								},
								maxLength: {
									value: 30,
									message:
										"Full name must be 4 to 30 characters.",
								},
								pattern: {
									value: /^(?!.*[-' ]{4})[a-zA-Z](?:[a-zA-Z' -]{0,26}[a-zA-Z])?$/,
									message: "Enter a valid full name.",
								},
							})}
						/>
						<label htmlFor="fullName">Full Name</label>
					</div>
					<div className="input-box text-lg bg-gray-100 rounded-full px-4">
						<input
							type="text"
							className="outline-none"
							placeholder=" "
							{...register("userName", {
								value: user.userName,
								required: {
									value: true,
									message: "Username is required.",
								},
								minLength: {
									value: 4,
									message:
										"Username must be 4 to 16 characters.",
								},
								maxLength: {
									value: 16,
									message:
										"Username must be 4 to 16 characters.",
								},
								pattern: {
									value: /^(?!.*[_\-\.]{2})[a-z0-9_\-\.]{4,16}$/, //eslint-disable-line
									message: "Enter a valid username.",
								},
							})}
						/>
						<label htmlFor="userName">Username</label>
					</div>
					<div className="input-box-p text-lg bg-gray-100 rounded-full px-4">
						<input
							type={passwordHidden ? "password" : "text"}
							className="outline-none"
							placeholder=" "
							{...register("oldPassword", {
								validate: (v) =>
									!anyPassword || v
										? true
										: "Old Password is required",
								...passwordRules,
							})}
						/>
						<label htmlFor="userName">Old Password</label>
						<div
							className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400"
							onClick={() => {
								setPasswordHidden((prev) => !prev);
							}}
						>
							{passwordHidden ? <Eye /> : <EyeOff />}
						</div>
					</div>
					<div className="input-box-p text-lg bg-gray-100 rounded-full px-4">
						<input
							type={passwordHiddenNew ? "password" : "text"}
							className="outline-none"
							placeholder=" "
							{...register("newPassword", {
								validate: (v) => {
									if (!anyPassword && !v) return true;
									if (!v)
										return "Confirm PAssword is required";
									if (v === oldPass)
										return "New password must be different from Old Password";
									return true;
								},
							})}
						/>
						<label htmlFor="userName">New Password</label>
						<div
							className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400"
							onClick={() => {
								setPasswordHiddenNew((prev) => !prev);
							}}
						>
							{passwordHiddenNew ? <Eye /> : <EyeOff />}
						</div>
					</div>
					<div className="input-box-p text-lg bg-gray-100 rounded-full px-4">
						<input
							type={passwordHiddenConfirm ? "password" : "text"}
							className="outline-none"
							placeholder=" "
							{...register("newPasswordConfirm", {
								validate: (v) => {
									if (!anyPassword && !v) return true;
									if (!v)
										return "Confirm Password is required";
									if (v !== newPass)
										return "Passwords don't match";
									return true;
								},
							})}
						/>
						<label htmlFor="userName">Confirm New Password</label>
						<div
							className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400"
							onClick={() => {
								setPasswordHiddenConfirm((prev) => !prev);
							}}
						>
							{passwordHiddenConfirm ? <Eye /> : <EyeOff />}
						</div>
					</div>

					<div className="w-full gap-2 flex justify-end items-center">
						<button
							disabled={isSubmitting}
							onClick={() => {
								setSlider(0);
							}}
							className="px-4 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-2 rounded-full bg-app dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-900 dark:hover:bg-secondary-900 duration-300 ease-in-out"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="px-4 disabled:bg-secondary disabled:active:scale-100 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-2 rounded-full bg-primary text-white hover:bg-primary-hover duration-300 ease-in-out"
						>
							Save
						</button>
					</div>
				</form>
			</div>
			<div className="flex flex-col animate-fade-in justify-center items-center w-full bg-white dark:bg-gray-800 rounded-5xl p-6 gap-2">
				<h2 className="text-2xl font-bold text-primary w-full text-start mb-2">
					Logout or Delete Account:
				</h2>
				<div className="flex justify-between items-center w-full">
					<button
						onClick={() => {
							setShowDeleteModal(true);
						}}
						className={`p-3 px-4 text-left rounded-full cursor-pointer duration-300 ease-in-out transition-all text-white flex items-center gap-2 bg-red-500 w-fit`}
					>
						<Trash2
							className="h-5 w-5 shrink-0"
							size={24}
							strokeWidth={2.2}
						></Trash2>
						<p className={`text-xs`}>Delete Account</p>
					</button>
					<button
						onClick={handleLogout}
						className={`p-3 px-4 text-left rounded-full cursor-pointer duration-300 ease-in-out transition-all text-white flex items-center gap-2 bg-primary w-fit`}
					>
						<LogOut
							className="h-5 w-5 shrink-0"
							size={24}
							strokeWidth={2.2}
						></LogOut>
						<p className={`text-xs`}>Logout</p>
					</button>
				</div>
			</div>
			{showDeleteModal && <DeleteAccount setShowDeleteModal={setShowDeleteModal}></DeleteAccount>}
		</>
	);
};

export default Actions;
