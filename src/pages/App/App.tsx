import { Routes, Route, useNavigate } from "react-router";
import Header from "@/components/App/Navigation/Header";
import Sidebar from "@/components/App/Navigation/Sidebar";
import Error from "@/pages/Error";
import { useEffect, useState } from "react";
import Navbar from "@/components/App/Navigation/Navbar";
import { RefreshToken } from "@/api/AuthAPI";
import useAuth from "@/hooks/Auth";
import Home from "./Home";
import toast from "react-hot-toast";
import Account from "./Account";
import Accounts from "./Accounts";
import useData from "@/hooks/Data";
import Budgets from "./Budgets";
import Categories from "./Categories";
import Goals from "./Goals";
import Transactions from "./Transactions";
import LogoutUtility from "@/utils/logout";
import { ApiError } from "@/types/common";
import More from "@/pages/App/More";
import HandleErrorMessage from "@/utils/networkError";

const App = () => {
    const [hide, setHide] = useState(false);

    const {
        accessToken,
        setAccessToken,
        setIsLoggedIn,
        setUser,
        setCurrentSession,
        setDataToSessionStorage,
        getDatafromSessionStorage,
        setSessions,
    } = useAuth();

    const navigate = useNavigate();
    // Refresh the access token
    useEffect(() => {
        const [isLoggedInSession] = getDatafromSessionStorage();
        const refresh = async () => {
            if (isLoggedInSession) {
                try {
                    const res = await RefreshToken();

                    setIsLoggedIn(true);
                    setUser(res.data.user);
                    setAccessToken(res.data.token);
                    setCurrentSession(res.data.currentSession);
                    setSessions(res.data.user.sessions);
                    setDataToSessionStorage(true, res.data.user);
                } catch (error) {
                    toast.dismissAll();
                    const err = error as ApiError;
                    const res = err?.response?.data;

                    LogoutUtility({
                        setAccessToken,
                        setIsLoggedIn,
                        setUser,
                        setCurrentSession,
                        setDataToSessionStorage,
                        navigate,
                    });

                    if (res) {
                        if (res?.isLoggedOut)
                            toast.success("You were logged out successfully");
                        toast.error(res.error.message);
                    } else HandleErrorMessage(err);
                }
            }
        };

        refresh();

        const intervalID = setInterval(refresh, 9 * 60 * 1000);
        return () => clearInterval(intervalID);
    }, []); //eslint-disable-line

    const { GetData, isDataFetched, setIsDataFetched } = useData();

    useEffect(() => {
        if (accessToken && !isDataFetched) {
            GetData();
            setIsDataFetched(true);
        }
    }, [accessToken, isDataFetched]); //eslint-disable-line

    return (
        <>
            <Header hide={hide} setHide={setHide} GetData={GetData}></Header>
            <main className={`flex w-full h-[calc(100dvh-4.6rem)]`}>
                <Sidebar hide={hide}></Sidebar>

                <section
                    className={`flex-1 relative flex flex-col items-center p-4 pb-22 md:pb-4 sm:px-6 h-full overflow-y-auto w-dvw`}
                >
                    <Routes>
                        <Route
                            path=""
                            element={
                                <Home
                                    GetData={GetData}
                                ></Home>
                            }
                        ></Route>
                        <Route
                            path="/account/"
                            element={<Account></Account>}
                        ></Route>
                        <Route
                            path="/transactions/"
                            element={
                                <Transactions GetData={GetData}></Transactions>
                            }
                        ></Route>
                        <Route
                            path="/budgets/"
                            element={<Budgets GetData={GetData}></Budgets>}
                        ></Route>
                        <Route
                            path="/accounts/"
                            element={<Accounts GetData={GetData}></Accounts>}
                        ></Route>
                        <Route
                            path="/categories/"
                            element={
                                <Categories GetData={GetData}></Categories>
                            }
                        ></Route>
                        <Route
                            path="/goals/"
                            element={<Goals GetData={GetData}></Goals>}
                        ></Route>
                        <Route path="/more/" element={<More></More>}></Route>
                        <Route path="*" element={<Error></Error>}></Route>
                    </Routes>
                </section>
                <Navbar></Navbar>
            </main>
        </>
    );
};

export default App;
