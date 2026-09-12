import { ArrowRight, Home } from "lucide-react";
import { Link } from "react-router";

const Error = () => {
    const pathName = window.location.pathname;
    const email = "ghani726@outlook.com";
    const subject = encodeURIComponent("Page Not Found");
    const body = encodeURIComponent(
        `Hey Muhammad Ghani Ul Hassan, I was just viewing NexSpent and tried opening "${pathName}" and got error that page not found. Could you help me assist with it?`,
    );

    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

	const linkTo = pathName.includes("/app") ? "/app/" : "/"
    return (
        <div className={`flex flex-col items-center justify-center text-sm h-dvh ${pathName.includes("/app") ? "p-0": "p-4"}`}>
            <p className="font-medium text-lg text-primary animate-slide-in-left">404 Error</p>
            <h2 className="md:text-6xl text-4xl font-bold text-gray-800 animate-slide-in-left">
                Page Not Found
            </h2>
            <p className="text-base w-full text-center mt-4 text-gray-500 animate-slide-in-left">
                Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="flex flex-col ms:flex-row items-center gap-4 mt-6">
                <Link
                    to={linkTo}
                    className="w-48 bg-primary shadow-small hover:bg-primary-hover py-2.5 text-white rounded-full active:scale-95 transition-all flex gap-2 justify-center items-center animate-slide-in-left"
                >
                    <Home size={22}></Home>
                    <p>Go back home</p>
                </Link>
                <a
                    href={mailtoUrl}
                    className="w-48 group bg-white shadow-small dark:bg-gray-800 flex items-center gap-2 justify-center rounded-full py-2.5 active:scale-95 transition animate-slide-in-left"
                >
                    Contact support
                    <ArrowRight size={22}></ArrowRight>
                </a>
            </div>
        </div>
    );
};

export default Error;
