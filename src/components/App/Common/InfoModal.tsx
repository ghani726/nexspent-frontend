import { X } from "lucide-react";
import { ReactNode, RefObject } from "react";

const InfoModal = ({ ref, title, desc, icon }: {
    ref: RefObject<HTMLDialogElement | null>
    title: string,
    desc: string,
    icon: ReactNode
}) => {
    return (
        <dialog
            ref={ref}
            onClick={(e) => {
                if (e.target === ref?.current) {
                    ref.current.close();
                }
            }}
            className={`flex open:flex duration-300 ease-in-out flex-col justify-center shadow-large min-w-2xs w-9/10 ms:w-2/3 md:w-1/2 lg:w-1/3 items-center rounded-5xl bg-surface dark:bg-gray-900 dark:text-white fixed top-1/2 left-1/2 -translate-1/2 dark:shadow-emerald-800`}
        >
            <div className="p-10 flex open:flex gap-2 flex-col justify-center items-center">
                <button
                    title="Close"
                    onClick={() => ref?.current?.close()}
                    className="text-secondary-600 rounded-full p-2 cursor-pointer disabled:cursor-not-allowed hover:text-red-600 duration-300 ease-in-out absolute right-8 top-8"
                >
                    <X></X>
                </button>
                <span className="flex bg-primary p-4 rounded-full text-white justify-center items-center">
                    {icon}
                </span>
                <h2 className="text-primary text-3xl font-bold">{title}</h2>
                <p className="text-center text-lg max-w-100">{desc}</p>
                <button className="text-white bg-primary cursor-pointer font-semibold px-6 p-3 rounded-full mt-2 duration-300 ease-in-out active:scale-95">
                    View Guide
                </button>
            </div>
        </dialog>
    );
};

export default InfoModal;
