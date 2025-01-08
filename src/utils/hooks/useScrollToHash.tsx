import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToHash = () => {

    const location = useLocation();

    useLayoutEffect(() => {
        if (location.hash) {
            const scrollToElement = () => {
                const element = document.querySelector(location.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };

            setTimeout(scrollToElement, 450);
        }
    }, [location]);
};
