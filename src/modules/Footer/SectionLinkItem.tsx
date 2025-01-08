import classes from "../Header/Header.module.scss"

import { NavLink } from "react-router-dom";
import { Typography } from "../../UI/Typography/Typography.tsx";

export const SectionLinkItem = ({ to, label, className }) => {
    return (
        <li className={className}>
            <NavLink
                to={`/#${to}`}
                aria-label={to}
            >
                <Typography className={classes.navbarList} color="white" variant="h4">
                    {label}
                </Typography>
            </NavLink>
        </li>
    );
};