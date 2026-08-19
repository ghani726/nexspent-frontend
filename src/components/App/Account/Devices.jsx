import { useNavigate } from "react-router";
import useAuth from "../../../hooks/Auth";
import {
    Logout,
    LogoutAll,
    LogoutFromSpecificDevice,
} from "../../../api/AuthAPI";
import toast from "react-hot-toast";

const handleLogout = async ({
    accessToken,
    currentSession,
    setUser,
    setAccessToken,
    setCurrentSession,
    navigate,
}) => {
    try {
        const res = await Logout(accessToken, currentSession);

        if (res.success) {
            toast.dismissAll();
            toast.success("Logged out successfully");
            navigate("/login", { replace: true });
            setUser({});
            setAccessToken(null);
            setCurrentSession(null);
        } else {
            return toast.error(res.error.message);
        }
    } catch (error) {
        if (error.response) {
            return toast.error(error.response.data.error.message);
        } else {
            return toast.error(error.message);
        }
    }
};

const handleLogoutFromSpecificDevice = async ({ id, accessToken, browser }) => {
    try {
        const res = await LogoutFromSpecificDevice(id, accessToken);

        if (res.success) {
            toast.dismissAll();
            toast.success(
                <span>
                    Logged out successfully from <strong>{browser}</strong>
                </span>,
            );
        } else {
            return toast.error(res.error.message);
        }
    } catch (error) {
        if (error.response) {
            return toast.error(error.response.data.error.message);
        } else {
            return toast.error(error.message);
        }
    }
};

const handleLogoutAll = async ({
    accessToken,
    setUser,
    setAccessToken,
    setCurrentSession,
    navigate,
}) => {
    try {
        const res = await LogoutAll(accessToken);

        if (res.success) {
            toast.dismissAll();
            toast.success("Logged out successfully");
            navigate("/login", { replace: true });
            setUser({});
            setAccessToken(null);
            setCurrentSession(null);
        } else {
            return toast.error(res.error.message);
        }
    } catch (error) {
        if (error.response) {
            return toast.error(error.response.data.error.message);
        } else {
            return toast.error(error.message);
        }
    }
};

const DeviceCard = ({ browser, device, id, currentSession }) => {
    const { setUser, setAccessToken, accessToken, setCurrentSession } =
        useAuth();

    const navigate = useNavigate();

    const isCurrent = currentSession === id;

    const handleLogoutClick = () => {
        if (isCurrent) {
            handleLogout({
                accessToken,
                currentSession,
                setUser,
                setAccessToken,
                setCurrentSession,
                navigate,
            });
        } else {
            handleLogoutFromSpecificDevice({
                id,
                accessToken,
                browser,
            });
        }
    };

    return (
        <div className="flex p-4 ms:p-3 px-4 bg-app dark:bg-gray-700 dark:hover:bg-gray-900 hover:bg-gray-100 ms:rounded-full rounded-4xl justify-between w-full items-center duration-300 ease-in-out">
            <div className="flex m-0 ms:mx-2 flex-col justify-center items-start">
                <h4 className="font-semibold text-lg -mb-1">{device}</h4>
                <p className="text-secondary-700 text-sm">
                    {browser.replace("undefined", "").trim()}
                </p>
            </div>

            <div className="flex m-0 ms:mx-1 flex-col ms:flex-row justify-between items-center gap-2">
                {isCurrent && (
                    <button className="p-2 px-4 text-sm rounded-full bg-primary text-white">
                        Current
                    </button>
                )}
                <button
                    onClick={handleLogoutClick}
                    className="p-2 px-4 text-sm cursor-pointer duration-300 ease-in-out active:scale-95 rounded-full bg-red-500 text-white"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
const Devices = () => {
    const { user, currentSession } = useAuth();

    const { setUser, setAccessToken, accessToken, setCurrentSession } =
        useAuth();

    const navigate = useNavigate();
    return (
        <div className="flex animate-fade-in flex-col justify-center items-center w-full bg-white dark:bg-gray-800 p-5 rounded-5xl gap-4">
            <h2 className="text-2xl font-bold text-primary w-full text-start">
                Manage your devices:
            </h2>
            <div className="flex flex-col justify-center items-center w-full gap-4">
                {user.sessions.map((s) => {
                    return (
                        <DeviceCard
                            key={s._id}
                            id={s._id}
                            browser={s.device.browser}
                            device={s.device.device}
                            currentSession={currentSession}
                        ></DeviceCard>
                    );
                })}
            </div>
            <button
                onClick={() => {
                    handleLogoutAll({
                        accessToken,
                        currentSession,
                        setUser,
                        setAccessToken,
                        setCurrentSession,
                        navigate,
                    });
                }}
                className="p-3 px-5 font-semibold cursor-pointer rounded-full bg-primary text-white active:scale-95 ease-in-out duration-300"
            >
                Logout from all devices
            </button>
        </div>
    );
};

export default Devices;
