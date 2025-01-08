import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTop = (excludePaths = []) => {
    const { pathname, state } = useLocation();

    useEffect(() => {
        if (!excludePaths.includes(pathname)) {
            window.scrollTo(0, 0);
        }
    }, [pathname, state, excludePaths]);
};
