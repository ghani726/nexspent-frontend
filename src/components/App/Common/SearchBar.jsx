import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

const SearchBar = ({ searchValue, setSearchValue, ph, title, full = false }) => {
    const search = useRef();

    useEffect(() => {
        const handleEvent = (e) => {
            if (e.key === "F1") {
                e.preventDefault();
                search.current.focus();
            }

            if (e.ctrlKey && e.key.toLowerCase() === "s") {
                e.preventDefault();
                search.current.focus();
            }
        };

        window.addEventListener("keydown", handleEvent);

        return () => window.removeEventListener("keydown", handleEvent);
    }, []);
    return (
        <div className="flex justify-center items-center w-full">
            <div title={title} className={`bg-white dark:bg-gray-800 dark:placeholder:text-white z-5 ${full ? "w-full": "w-xl"} p-2 rounded-full shadow-medium flex justify-between items-center gap-3 border-2 border-transparent focus-within:border-primary ease-in-out duration-300`}>
                <input
                    ref={search}
                    value={searchValue}
                    type="text"
                    placeholder={ph}
                    className="outline-none border-none w-full px-1 peer"
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
                <span className="flex justify-center items-center peer-focus-within:text-primary hover:text-white hover:bg-primary ease-in-out duration-300 text-gray-500 p-1 rounded-full">
                    <Search size={18}></Search>
                </span>
            </div>
        </div>
    );
};

export default SearchBar;
