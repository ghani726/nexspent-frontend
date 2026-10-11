import Footer from "@/components/Web/Footer";
import Header from "@/components/Web/Header";
import { DollarSign, Goal, PieChart, Shapes, Wallet } from "lucide-react";
import { Link } from "react-router";

const Website = () => {
    return (
        <div className="w-full min-h-dvh flex flex-col gap-4">
            <Header></Header>
            <main className="w-full pt-16 flex flex-col">
                <section className="flex flex-col w-full justify-center items-center py-4">
                    <h2 className="duration-300 ease-in-out animate-fade-in md:text-5xl sm:text-4xl ms:text-3xl text-2xl font-bold">
                        Minimal Expense Tracking
                    </h2>
                    <h2 className="duration-300 ease-in-out animate-fade-in md:text-6xl sm:text-5xl ms:text-4xl text-3xl font-bold text-primary">
                        Built for speed
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base p-2 px-6 pb-4 text-center">
                        Take full control of your money, accounts, and daily
                        spending with ease.
                    </p>

                    <Link
                        to={"/register"}
                        className="px-6 cursor-pointer active:scale-95 duration-300 ease-in-out p-2 rounded-full bg-primary text-white font-medium shadow-medium"
                    >
                        Get Started For Free
                    </Link>
                </section>
                <section className="flex flex-col border-t border-gray-300 w-full justify-center items-center py-4">
                    <h2 className="text-xl font-bold text-primary">
                        Features Overview
                    </h2>
                    <h2 className="lg:text-4xl md:text-4xl sm:text-4xl duration-300 ease-in-out animate-fade-in text-2xl text-center p-2 px-4 font-bold">
                        A better way to manage money on the go
                    </h2>
                    <p className="text-gray-600 text-sm p-2 px-6 pb-4 text-center">
                        Everything you need to manage your mony including
                        accounts, categories, budgets and goals all in one
                        place.
                    </p>
                    <div className="grid duration-300 ease-in-out animate-fade-in grid-cols-[repeat(auto-fit,minmax(max(300px,calc(50%-1rem)),1fr))] gap-4 px-4">
                        <div className="duration-300 ease-in-out animate-fade-in flex justify-start items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-small p-4 rounded-4xl gap-4">
                            <div className="duration-300 ease-in-out animate-fade-in flex justify-center items-center bg-primary p-2 text-white rounded-2xl">
                                <Wallet></Wallet>
                            </div>
                            <div className="flex duration-300 ease-in-out animate-fade-in flex-col">
                                <h4 className="font-bold">Accounts</h4>
                                <p className="text-gray-700 dark:text-gray-400">
                                    Manage Cash, Cards, and Wallets easily.
                                </p>
                            </div>
                        </div>
                        <div className="duration-300 ease-in-out animate-fade-in flex justify-start items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-small p-4 rounded-4xl gap-4">
                            <div className="duration-300 ease-in-out animate-fade-in flex justify-center items-center bg-primary p-2 text-white rounded-2xl">
                                <Shapes></Shapes>
                            </div>
                            <div className="flex duration-300 ease-in-out animate-fade-in flex-col">
                                <h4 className="font-bold">Categories</h4>
                                <p className="text-gray-700 dark:text-gray-400">
                                    Organize and spend by custom tags.
                                </p>
                            </div>
                        </div>
                        <div className="duration-300 ease-in-out animate-fade-in flex justify-start items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-small p-4 rounded-4xl gap-4">
                            <div className="duration-300 ease-in-out animate-fade-in flex justify-center items-center bg-primary p-2 text-white rounded-2xl">
                                <PieChart></PieChart>
                            </div>
                            <div className="flex duration-300 ease-in-out animate-fade-in flex-col">
                                <h4 className="font-bold">Budgets</h4>
                                <p className="text-gray-700 dark:text-gray-400">
                                    Manage your budgets easily by automation.
                                </p>
                            </div>
                        </div>
                        <div className="duration-300 ease-in-out animate-fade-in flex justify-start items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-small p-4 rounded-4xl gap-4">
                            <div className="duration-300 ease-in-out animate-fade-in flex justify-center items-center bg-primary p-2 text-white rounded-2xl">
                                <Goal></Goal>
                            </div>
                            <div className="flex duration-300 ease-in-out animate-fade-in flex-col">
                                <h4 className="font-bold">Goals</h4>
                                <p className="text-gray-700 dark:text-gray-400">
                                    Save money for your dreams with ease.
                                </p>
                            </div>
                        </div>
                        <div className="duration-300 ease-in-out animate-fade-in flex justify-start items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-small p-4 rounded-4xl gap-4">
                            <div className="duration-300 ease-in-out animate-fade-in flex justify-center items-center bg-primary p-2 text-white rounded-2xl">
                                <DollarSign></DollarSign>
                            </div>
                            <div className="flex duration-300 ease-in-out animate-fade-in flex-col">
                                <h4 className="font-bold">
                                    Free and Open Source
                                </h4>
                                <p className="text-gray-700 dark:text-gray-400">
                                    Track & Manage your money with no limits for
                                    free.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col border-t border-gray-300 w-full justify-center items-center py-4 gap-4">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                        Ready to track your money?
                    </h2>

                    <Link
                        to={"/login"}
                        className="px-6 cursor-pointer active:scale-95 duration-300 ease-in-out p-2 rounded-full bg-primary text-white font-medium shadow-medium"
                    >
                        Open App Now
                    </Link>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Website;
