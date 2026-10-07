import { ReactNode } from "react";

const ProgressRing = ({
    size = "M",
    percentage,
    children,
    bg1,
    bg2,
}: {
    percentage: number;
    children?: ReactNode;
    bg1?: string;
    bg2?: string;
    size?: "S" | "M" | "L" | "XL";
}) => {
    return (
        <div
            className={`relative ${size === "S" ? "w-40 h-40" : size === "M" ? "w-48 h-48" : size === "L" ? "w-56 h-56" : "w-64 h-64"} flex justify-center items-center z-5`}
        >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                    cx={18}
                    cy={18}
                    r={15.9}
                    fill="none"
                    className={`${bg1 ? bg1: "text-emerald-100 dark:text-gray-800"} stroke-current`}
                    strokeWidth={2.5}
                ></circle>
                <circle
                    cx={18}
                    cy={18}
                    r={15.9}
                    fill="none"
                    style={{ color: bg2 || "#059669" }}
                    className={`stroke-current transition-all duration-300 ${percentage <= 0 ? "opacity-0": "opacity-100"}`}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeDasharray={`${percentage} 100`}
                ></circle>
            </svg>
            <div className="absolute w-full h-full p-8">{children}</div>
        </div>
    );
};

export default ProgressRing;
