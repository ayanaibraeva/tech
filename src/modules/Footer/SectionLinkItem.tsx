import classes from "../Header/Header.module.scss"

import { NavLink } from "react-router-dom";

export const SectionLinkItem = ({ to, label, className }) => {
    return (
        <li className={className}>
            <NavLink
                to={`/#${to}`}
                aria-label={to}
            >
                <span className={classes.navbarList}>
                    {label}
                </span>
            </NavLink>
        </li>
    );
};