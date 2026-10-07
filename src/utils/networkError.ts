import { ApiError } from "@/types/common";
import toast from "react-hot-toast";

const HandleErrorMessage = (err: ApiError) => {
    if (err.message === "Network Error")
        return toast.error("Server is down. Please try again later.");
    return toast.error(err.message);
};

export default HandleErrorMessage;
