import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import useAuth from "@/hooks/Auth";
import useData from "@/hooks/Data";
import { Register } from "@/api/AuthAPI";
import type { ApiError } from "@/types/common";

const RegisterPage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const { GetData } = useData();

    const onSubmit = async (data: object) => {
        try {
            const res = await Register(data);

            if (res.success) {
                toast.dismissAll();
                setIsLoggedIn(true);
                setUser(res.data.user);
                setAccessToken(res.data.token);
                setCurrentSession(res.data.currentSession);
                toast.success(<span>Registered successfully</span>);
                setDataToSessionStorage(true, res.data.user);
                GetData();
                navigate("/app", { replace: true });
            } else if (!res.success) {
                toast.dismissAll();
                return toast.error(res.data.error.message);
            }
        } catch (err) {
            const error = err as ApiError
            toast.dismissAll();
            if (error?.response?.data?.error?.message) {
                return toast.error(error.response.data.error.message);
            } else {
                return toast.error(error.message);
            }
        }
    };
    const {
        setIsLoggedIn,
        setUser,
        setAccessToken,
        setCurrentSession,
        setDataToSessionStorage,
    } = useAuth();

    const [passwordHidden, setPasswordHidden] = useState(true);
    const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

    const password = watch("password"); //eslint-disable-line

    return (
        <div className="flex overflow-auto justify-center items-center w-full min-h-dvh h-auto py-8">
            <div className="bg-white dark:bg-gray-800 max-h-9/10 animate-fade-in shadow-[0_0_24px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out h-auto min-w-80 max-w-9/10 w-auto ms:min-w-md lg:w p-6 md:p-8 rounded-5xl flex flex-col justify-center items-center gap-6">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-3xl font-bold text-primary text-center">
                        Welcome to NexSpent
                    </h1>
                    <h4 className="font-normal text-sm text-gray-600">
                        Lets setup your account
                    </h4>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="inputFeilds w-full flex flex-col gap-6"
                >
                    <div className="flex flex-col ease-in-out duration-300">
                        <div className="input-box text-lg bg-gray-100 rounded-5xl px-4">
                            <input
                                type="text"
                                className="outline-none"
                                placeholder=" "
                                {...register("fullName", {
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
                        {errors.fullName && (
                            <p className="text-red-500 font-normal px-4">
                                {errors?.fullName?.message as string}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col ease-in-out duration-300">
                        <div className="input-box text-lg bg-gray-100 rounded-5xl px-4">
                            <input
                                type="text"
                                className="outline-none"
                                placeholder=" "
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required.",
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Enter a valid email address.",
                                    },
                                })}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        {errors.email && (
                            <p className="text-red-500 font-normal px-4">
                                {errors.email.message as string}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col ease-in-out duration-300">
                        <div className="input-box text-lg bg-gray-100 rounded-5xl px-4">
                            <input
                                type="text"
                                className="outline-none"
                                placeholder=" "
                                {...register("userName", {
                                    required: {
                                        value: true,
                                        message: "Username is required.",
                                    },
                                    minLength: {
                                        value: 4,
                                        message:
                                            "Username must be 4 to 20 characters.",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message:
                                            "Username must be 4 to 20 characters.",
                                    },
                                    pattern: {
                                        value: /^(?!.*[_\-\.]{2})[a-z0-9_\-\.]{4,20}$/, //eslint-disable-line
                                        message:
                                            'Username can only contain "a-z, 0-9, _ , . , -, "',
                                    },
                                })}
                            />
                            <label htmlFor="userName">Username</label>
                        </div>
                        {errors.userName && (
                            <p className="text-red-500 font-normal px-4">
                                {errors.userName.message as string}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col ease-in-out duration-300 gap-2">
                        <div className="input-box-p text-lg bg-gray-100 rounded-5xl px-4">
                            <input
                                type={passwordHidden ? "password" : "text"}
                                className="outline-none peer"
                                placeholder=" "
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required.",
                                    },
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be 8 to 32 characters.",
                                    },
                                    maxLength: {
                                        value: 32,
                                        message:
                                            "Password must be 8 to 32 characters.",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*&])[A-Za-z\d!@#$%^*&]{8,32}$/,
                                        message:
                                            'Password must include "a-z, A-Z, 0-9 and a special character."',
                                    },
                                })}
                            />
                            <label htmlFor="userName">Password</label>
                            <div
                                className="absolute peer-focus-within:text-primary right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                onClick={() => {
                                    setPasswordHidden((prev) => !prev);
                                }}
                            >
                                {passwordHidden ? <Eye /> : <EyeOff />}
                            </div>
                        </div>
                        {errors.password && (
                            <ul className="list-disc px-6">
                                <li
                                    className={`${password.length < 8 || password.length > 32 ? "text-red-500" : "text-primary"} font-normal`}
                                >
                                    Must be between 8-32 characters.
                                </li>
                                <li
                                    className={`${/(?=.*[a-z])/.test(password) ? "text-primary" : "text-red-500"} font-normal`}
                                >
                                    Include a lowercase letter (a-z).
                                </li>
                                <li
                                    className={`${/(?=.*[A-Z])/.test(password) ? "text-primary" : "text-red-500"} font-normal`}
                                >
                                    Include an uppercase letter (A-Z).
                                </li>
                                <li
                                    className={`${/(?=.*\d)/.test(password) ? "text-primary" : "text-red-500"} font-normal`}
                                >
                                    Include a number (0-9).
                                </li>
                                <li
                                    className={`${/(?=.*[!@#$%^*&])/.test(password) ? "text-primary" : "text-red-500"} font-normal`}
                                >
                                    Include a special character (!, @, #, $, %,
                                    ^, &, *)
                                </li>
                                <li
                                    className={`${/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(password) ? "text-primary" : "text-red-500"} font-normal`}
                                >
                                    Does not includes space any other character.
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="flex flex-col ease-in-out duration-300">
                        <div className="input-box-p text-lg bg-gray-100 rounded-5xl px-4">
                            <input
                                type={
                                    confirmPasswordHidden ? "password" : "text"
                                }
                                className="outline-none peer"
                                placeholder=" "
                                {...register("confirmPassword", {
                                    validate: (v) => {
                                        if (!v)
                                            return "Confirm password is required.";
                                        if (password !== v) {
                                            return "Passwords do not match.";
                                        }
                                        return true;
                                    },
                                })}
                            />
                            <label htmlFor="userName">Confirm Password</label>
                            <div
                                className="absolute peer-focus-within:text-primary right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                onClick={() => {
                                    setConfirmPasswordHidden((prev) => !prev);
                                }}
                            >
                                {confirmPasswordHidden ? <Eye /> : <EyeOff />}
                            </div>
                        </div>
                        {/* {password !== confirmPassword && (
                            <p className="text-red-500 font-normal px-4">
                                Passwords do not match.
                            </p>
                        )} */}
                        {errors.confirmPassword && (
                            <p className="text-red-500 font-normal px-4">
                                {errors.confirmPassword.message as string}
                            </p>
                        )}
                    </div>

                    {/* <div className="w-full text-right text-sm text-primary-700 font-semibold">
					Forgot Password?
				</div> */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="p-3 text-center bg-primary disabled:bg-primary/50 cursor-pointer disabled:active:scale-100 disabled:cursor-not-allowed rounded-5xl active:scale-95  transition-all ease-in-out duration-300 text-white font-semibold relative"
                    >
                        {isSubmitting && (
                            <LoaderCircle className="animate-spin absolute left-67/100"></LoaderCircle>
                        )}
                        Create Account
                    </button>
                </form>
                <div className="flex justify-center items-center text-sm text-secondary-600 gap-1">
                    <p>Already have an account?</p>
                    <Link to="/login" className="text-primary font-semibold">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
