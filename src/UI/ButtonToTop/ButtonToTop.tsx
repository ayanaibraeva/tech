import classes from "./ButtonToTop.module.scss";

import {MdKeyboardDoubleArrowUp} from "react-icons/md";
import {useEffect, useState} from "react";

export const ButtonToTop = () => {

    const [showButton, setShowButton] = useState(false);

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
        })
    }

    const handleScrolling = () => {
        if(scrollY > 500) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScrolling);
        return () => {
            window.removeEventListener("scroll", handleScrolling)
        }
    }, []);

    return (
        <div className={classes.btn} >
            <button style={{ visibility:showButton ? "visible" : "hidden"}}>
                <MdKeyboardDoubleArrowUp
                    onClick={ScrollToTop}
                    className={classes.animateBounce}
                />
            </button>
        </div>
    )
}