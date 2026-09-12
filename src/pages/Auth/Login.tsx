import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import useData from "@/hooks/Data";
import useAuth from "@/hooks/Auth";
import { Login, RefreshToken } from "@/api/AuthAPI";
import { BaseUserJSON } from "@/utils/logout";
import type { ApiError } from "@/types/common";
const LoginPage = () => {
    const navigate = useNavigate();

    const {
        setIsLoggedIn,
        setUser,
        setAccessToken,
        setCurrentSession,
        setDataToSessionStorage,
    } = useAuth();

    const { GetData } = useData();
    useEffect(() => {
        setIsLoggedIn(false);
        const LoginAuto = async () => {
            try {
                toast.loading("Logging in. Please wait...");
                const res = await RefreshToken();

                if (res.success) {
                    setIsLoggedIn(true);
                    setUser(res.data.user);
                    setAccessToken(res.data.token);
                    setCurrentSession(res.data.currentSession);
                    setDataToSessionStorage(true, res.data.user);
                    toast.dismissAll();
                    GetData();
                    toast.success(
                        <span>
                            Welcome back{" "}
                            <strong>{res.data.user.fullName}</strong>
                        </span>,
                    );
                    navigate("/app/", { replace: true });
                } else if (!res.success) {
                    toast.dismissAll();
                    setDataToSessionStorage(false, BaseUserJSON);
                    if (res?.isLoggedOut) {
                        return toast.success(res.error.message);
                    }
                    return toast.error(res.error.message);
                }
            } catch (err) {
                const error = err as ApiError;
                toast.dismissAll();
                if (error?.response?.data?.error?.message) {
                    return toast.error(error.response.data.error.message);
                } else {
                    if (error.message === "Network Error")
                        return toast.error(
                            "Server is down. Please try again later.",
                        );

                    return toast.error(error.message);
                }
            }
        };

        LoginAuto();
    }, [navigate, setAccessToken, setIsLoggedIn, setUser]);
    const {
        register,
        handleSubmit,
        watch,

        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch("password"); //eslint-disable-line
    const first: string = watch("first");

    const validateFirstFeild = () => {
        try {
            if (!first?.trim()) {
                throw new Error("");
            }
            if (first.includes("@")) {
                const emailReg =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailReg.test(first)) {
                    throw new Error("Enter a valid email address");
                }
            } else {
                const userNameReg = /^(?!.*[_\-\.]{2})[a-z0-9_\-\.]{4,20}$/; //eslint-disable-line
                if (first.length < 4 || first.length > 20) {
                    throw new Error(
                        "Username must be between 4 to 20 characters.",
                    );
                } else if (!userNameReg.test(first)) {
                    throw new Error(
                        'Username can only contain "a-z, 0-9, _ , . , -, "',
                    );
                }
            }
        } catch (err) {
            const error = err as { message: string };
            return error.message;
        }
    };
    const onSubmit = async (data: { first?: string; password?: string }) => {
        try {
            validateFirstFeild();
            let finalObj: {
                userName?: string;
                email?: string;
                password: string;
            } | null = null;

            if (data?.first?.includes("@")) {
                finalObj = {
                    email: data?.first,
                    password: data?.password ?? "",
                };
            } else {
                finalObj = {
                    userName: data?.first,
                    password: data?.password ?? "",
                };
            }

            const res = await Login(finalObj);

            if (res.success) {
                toast.dismissAll();
                setIsLoggedIn(true);
                setUser(res.data.user);
                setAccessToken(res.data.token);
                setCurrentSession(res.data.currentSession);
                setDataToSessionStorage(true, res.data.user);
                GetData();
                toast.success(
                    <span>
                        Welcome back <strong>{res.data.user.fullName}</strong>
                    </span>,
                );
                navigate("/app/", { replace: true });
            } else if (!res.success) {
                toast.dismissAll();
                return toast.error(res.error.message);
            }
        } catch (err) {
            const error = err as ApiError;
            toast.dismissAll();
            if (error?.response?.data?.error?.message) {
                return toast.error(error.response.data.error.message);
            } else {
                if (error.message === "Network Error")
                    return toast.error(
                        "Server is down. Please try again later.",
                    );

                return toast.error(error.message);
            }
        }
    };

    const [passwordHidden, setPasswordHidden] = useState(true);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-medium transition-all duration-500 ease-in-out h-auto min-w-80 w-auto ms:min-w-md lg:w p-6 md:p-8 rounded-5xl absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-3xl font-bold text-primary">NexSpent</h1>
                <h4 className="font-normal text-sm text-gray-600">
                    Login into your account
                </h4>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="inputFeilds w-full flex flex-col gap-6"
            >
                <div className="flex flex-col ease-in-out duration-300">
                    <div className="input-box text-lg bg-gray-100 dark:bg-gray-700 rounded-5xl px-4">
                        <input
                            type="text"
                            className="outline-none"
                            placeholder=" "
                            {...register("first", 
                                {required: {
                                    value: true,
                                    message: "Username or Email is required.",
                                },}
                            )}
                        />
                        <label htmlFor="userName">Username or Email</label>
                    </div>

                    <p className="text-red-500 font-normal px-4">
                        {validateFirstFeild()}
                        {errors?.first?.message as string}
                    </p>
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
                                Include a special character (!, @, #, $, %, ^,
                                &, *)
                            </li>
                            <li
                                className={`${/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(password) ? "text-primary" : "text-red-500"} font-normal`}
                            >
                                Does not includes space any other character.
                            </li>
                        </ul>
                    )}
                </div>

                {/* <div className="w-full text-right text-sm text-primary-700 font-semibold">
					Forgot Password?
				</div> */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="p-3 rounded-5xl text-center bg-primary cursor-pointer disabled:bg-primary/50 disabled:active:scale-100 disabled:cursor-not-allowed active:scale-95  transition-all ease-in-out duration-300 text-white font-semibold flex justify-center items-center gap-2 relative"
                >
                    {isSubmitting && (
                        <LoaderCircle className="animate-spin absolute left-6/10"></LoaderCircle>
                    )}
                    Sign In
                </button>
            </form>
            <div className="flex justify-center items-center text-sm text-secondary-600">
                <p>First time setup?</p>
                <pre> </pre>
                <Link to="/register" className="text-primary font-semi 	old">
                    Register New Account
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
