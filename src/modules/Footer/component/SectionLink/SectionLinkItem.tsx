import classes from "../../../Header/Header.module.scss";
import { NavLink } from "react-router-dom";
import React from "react";

interface SectionLinkItemProps {
    to: string;
    label: string;
    className?: string;
}

export const SectionLinkItem: React.FC<SectionLinkItemProps> = ({ to, label, className }) => {
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