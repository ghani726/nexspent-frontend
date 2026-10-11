import { CircleUserRound, LogIn } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
const MorePopOver = ({
    isMenuShown,
    setIsMenuShown,
}: {
    isMenuShown: boolean;
    setIsMenuShown: (value: boolean) => void;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [count, setCount] = useState(0);
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setCount((prev) => prev + 1);
                if (count > 0) {
                    setCount(0);
                    setIsMenuShown(false);
                }
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => document.removeEventListener("click", handleOutsideClick);
    });

    return (
        <div
            ref={ref}
            className={`menu z-10 ${isMenuShown ? "translate-y-0 opacity-100" : "translate-y-[-170%] opacity-0"} ease-in-out duration-300 flex flex-col items-start justify-center p-2 bg-white dark:bg-gray-800 absolute right-2 top-15.5 rounded-3xl shadow-[0_0_10px_rgba(0,0,0,0.3)] `}
        >
            <Link
                to="/register"
                onClick={() => {
                    setIsMenuShown(false);
                }}
                className={` p-2 w-full text-left rounded-2xl cursor-pointer duration-300 ease-in-out transition-all text-secondary-600 flex items-center gap-2 bg-transparent hover:bg-secondary-100 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
                <CircleUserRound
                    className="h-5 w-5 shrink-0"
                    size={24}
                    strokeWidth={2.2}
                ></CircleUserRound>
                <p className={`text-xs`}>Get started</p>
            </Link>
            <Link
                to={"/login"}
                className={`p-2 w-full text-left rounded-2xl cursor-pointer duration-300 ease-in-out transition-all text-secondary-600 flex items-center gap-2 bg-transparent hover:bg-secondary-100 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
                <LogIn
                    className="h-5 w-5 shrink-0"
                    size={24}
                    strokeWidth={2.2}
                ></LogIn>
                <p className={`text-xs`}>Login</p>
            </Link>
        </div>
    );
};

export default MorePopOver;
