import More from "@/components/Web/More";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const Header = () => {
    const [isMenuShown, setIsMenuShown] = useState(false)
    return (
        <header className="fixed top-0 left-0 w-full flex   rounded-5xl justify-between items-center gap-4 max-h-16 p-2">
            <h1 className="text-primary bg-white dark:bg-gray-800 font-bold px-6 p-2 rounded-full text-2xl shadow-medium border border-gray-200 dark:border-gray-700">
                Nex
                <span className="text-black dark:text-white">Spent</span>
            </h1>
            <div className="flex justify-center items-center gap-2">
                
                <Link to={"/register"} className="px-6 cursor-pointer active:scale-95 duration-300 ease-in-out hidden sm:flex p-2.5 rounded-full bg-primary text-white font-medium shadow-medium border border-gray-200 dark:border-gray-700" >Get Started</Link>
                <Link to={"/login"} className="px-6 cursor-pointer active:scale-95 duration-300 ease-in-out hidden sm:flex p-2.5 rounded-full bg-white dark:bg-gray-800 font-medium shadow-medium border border-gray-200 dark:border-gray-700">Login</Link>
                <button onClick={()=> setIsMenuShown(prev => !prev)} className="p-3 cursor-pointer active:scale-95 duration-300 ease-in-out sm:hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-medium"><MoreHorizontal></MoreHorizontal></button>
            </div>
            <More isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown}></More>
        </header>
    );
};

export default Header;
