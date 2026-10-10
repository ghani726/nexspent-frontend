import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "@/hooks/Auth";
import { DeleteAccount } from "@/api/AuthAPI";
import { useNavigate } from "react-router";
import { ApiError } from "@/types/common";
import HandleErrorMessage from "@/utils/networkError";
const DeleteModal = ({
    setShowDeleteModal,
}: {
    setShowDeleteModal: (value: boolean) => void;
}) => {
    const navigate = useNavigate();
    const { accessToken, setUser, setAccessToken } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const [password, setPassword] = useState("");

    const [passwordHidden, setPasswordHidden] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const res = await DeleteAccount(password, accessToken ?? "");
            
                navigate("/login", { replace: true });
                toast.success("Account deleted successfully");

                setAccessToken(null);
                setUser(null);
                setIsLoading(false);
                setShowDeleteModal(false);
                return;
            
        } catch (error) {
            console.error(error);
            
            setIsLoading(false);
            const err = error as ApiError;
            const res = err?.response?.data;

            if (res) toast.error(res.error.message);
            else HandleErrorMessage(err);
        }
    };

    const isNotValidPassword = () => {
        if (password.length < 8 || password.length > 32) return true;
        else if (!/(?=.*[a-z])/.test(password)) return true;
        else if (!/(?=.*[A-Z])/.test(password)) return true;
        else if (!/(?=.*\d)/.test(password)) return true;
        else if (!/(?=.*[!@#$%^*&])/.test(password)) return true;
        else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(
                password,
            )
        ) {
            return true;
        }

        return true;
    };

    return (
        <div className="fixed inset-0 z-15 backdrop-blur-sm flex justify-center items-center">
            <div
                className={`flex max-h-9/10 overflow-auto ease-in-out duration-300 animate-fade-in flex-col justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-8 rounded-5xl w-9/10 ms:w-md gap-3 bg-white dark:bg-gray-800 dark:text-white`}
            >
                <div className="flex justify-center items-center p-3 rounded-full aspect-square bg-red-100 dark:bg-red-950 text-red-600">
                    <TriangleAlert size={30}></TriangleAlert>
                </div>
                <h2 className="text-2xl font-bold -mb-1">Delete Account</h2>
                <p className="text-secondary-500 text-center">
                    Are your sure you want to delete your account? This would
                    delete all of your data.
                </p>
                <h3 className="text-lg text-red-600 text-center text-primary-700 font-semibold -mb-1">
                    Enter your password to delete your account
                </h3>

                <div className="flex flex-col ease-in-out duration-300 gap-2">
                    <div className="input-box-p text-lg bg-gray-100 rounded-5xl px-4">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={passwordHidden ? "password" : "text"}
                            className="outline-none peer"
                            placeholder=" "
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
                    {isNotValidPassword() && (
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
                <div className="flex justify-between items-center gap-4">
                    <button
                        onClick={() => {
                            setShowDeleteModal(false);
                        }}
                        disabled={isLoading}
                        className="px-6 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 disabled:active:scale-100 dark:hover:bg-gray-900 duration-300 ease-in-out"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={handleDelete}
                        className="px-6 disabled:bg-red-400 disabled:active:scale-100 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 "
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
