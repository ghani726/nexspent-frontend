import { Link } from "react-router";

const Website = () => {
    return (
        <div className="w-full h-dvh flex justify-center items-center flex-col p-4 gap-4">
			<h3 className="w-full text-center text-xl md:text-2xl -mb-4 font-bold animsl">Welcome to</h3>
            <h1 className="text-5xl ms:text-6xl duration-300 ease-in-out w-full text-center font-bold text-primary animate-slide-in-left -mb-1 md:mb-0">
                Nex<span className="text-black">Spent</span>
            </h1>
            <p className="text-gray-500 text-sm w-full text-center animate-slide-in-left md:max-w-2/3 lg:max-w-1/2 max-w-9/10 xs:max-w-8/10">
                This is the main route(page) which is the main home page for
                marketing pages. This would be made at the end. These pages are
                almost completed, you can visit them.
            </p>
			<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
				<Link to={"/app"} className="px-6 w-26 text-center p-2.5 rounded-full font-semibold text-white bg-primary text-sm shadow-small animate-slide-in-left">App</Link>
				<Link to={"/login"} className="px-6 w-26 text-center p-2.5 rounded-full font-semibold text-primary bg-white text-sm shadow-small animate-slide-in-left">Login</Link>
				<Link to={"/register"} className="px-6 w-26 text-center p-2.5 rounded-full font-semibold text-white bg-primary text-sm shadow-small animate-slide-in-left">Register</Link>
			</div>
        </div>
    );
};

export default Website;
