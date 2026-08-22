import { Routes, Route, useNavigate } from "react-router";
import Header from "../../components/App/Navigation/Header";
import Sidebar from "../../components/App/Navigation/Sidebar";
import Error from "../Error";
import { useEffect, useState } from "react";
import Navbar from "../../components/App/Navigation/Navbar";
import { RefreshToken } from "../../api/AuthAPI";
import useAuth from "../../hooks/Auth";
import Home from "./Home";
import toast from "react-hot-toast";
import Account from "./Account";
import Accounts from "./Accounts";
import useData from "../../hooks/Data";
import Budgets from "./Budgets";
import Categories from "./Categories";
import Goals from "./Goals";
import Transactions from "./Transactions";
const App = () => {
    const [hide, setHide] = useState(false);

    const navigate = useNavigate();
    const {
        accessToken,
        setAccessToken,
        setIsLoggedIn,
        setUser,
        setCurrentSession,
        setDataToSessionStorage,
        getDatafromSessionStorage,
    } = useAuth();

    // Refresh the access token
    useEffect(() => {
        const [isLoggedInSession] = getDatafromSessionStorage();
        const refresh = async () => {
            if (isLoggedInSession) {
                const logout = () => {
                    navigate("/login", { replace: true });
                    toast.dismissAll();
                    setUser({});
                    setAccessToken(null);
                    setCurrentSession(null);
                    setDataToSessionStorage(false, {
                        fullName: "Hello",
                    });
                    return;
                };
                try {
                    const res = await RefreshToken();

                    if (res.success) {
                        setIsLoggedIn(true);
                        setUser(res.data.user);
                        setAccessToken(res.data.token);
                        setCurrentSession(res.data.currentSession);
                        setDataToSessionStorage(true, res.data.user);
                    } else if (!res.success) {
                        if (res?.isLoggedOut) console.log();
						
                        return toast.error(res.error.message);
                    }
                } catch (error) {
                    toast.dismissAll();
					logout()
                    if (error.response) {
                        return toast.error(error.response.data.error.message);
                    } else {
						if(error.message === "Network Error") return toast.error("Server is down. Please try again later.")
                        return toast.error(error.message);
                    }
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

    // Transaction Model

    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <Header hide={hide} setHide={setHide} GetData={GetData}></Header>
            <main className={`flex w-full h-[calc(100dvh-4.6rem)]`}>
                <Sidebar hide={hide} setHide={setHide}></Sidebar>

                <section
                    className={`flex-1 relative flex flex-col items-center p-4 pb-22 md:pb-4 sm:px-6 h-full overflow-y-auto w-dvw`}
                >
                    <Routes>
                        <Route
                            path=""
                            element={
                                <Home
                                    GetData={GetData}
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                ></Home>
                            }
                        ></Route>
                        <Route
                            path="/account/"
                            element={<Account GetData={GetData}></Account>}
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
                        <Route path="*" element={<Error></Error>}></Route>
                    </Routes>
                </section>
                <Navbar></Navbar>
            </main>
        </>
    );
};

export default App;
