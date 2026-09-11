import { useEffect, useRef } from "react";

const useBack = ({
    isOpen,
    close,
    name,
}: {
    isOpen: boolean;
    close: () => void;
    name: string;
}) => {
    const closedRef = useRef(close);

    useEffect(() => {
        closedRef.current = close;
    }, [close]);
    const isClosedByPopState = useRef(false);
    useEffect(() => {
        if (!isOpen) return;

        isClosedByPopState.current = false;
        window.history.pushState({ name }, "");

        const handleBack = () => {
            isClosedByPopState.current = true;
            closedRef.current();
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closedRef.current();
            }
        };

        window.addEventListener("popstate", handleBack);
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("popstate", handleBack);
            window.removeEventListener("keydown", handleEsc);

            if (!isClosedByPopState.current) {
                window.history.back();
            }
        };
    }, [isOpen, close, name]);
};

export default useBack;
