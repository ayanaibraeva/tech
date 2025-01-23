import classes from "./Breadcrumbs.module.scss";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {Typography} from "../Typography/Typography.tsx";
import {ChevronRight} from "../../assets/Icons/ChevronRight.tsx";
import {FC, JSX} from "react";

interface BreadcrumbsProps {
    currentPage?: string;
    parentPageLink?: string;
    currentPageId?: string;
    className?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ currentPage, parentPageLink, currentPageId, className }) => {

    const { t } = useTranslation();

    const crumbs: JSX.Element[] = [];

    crumbs.push(
        <li key="main">
            <NavLink to={"/"}>
                <Typography variant="h4" color="white" >
                    {t("main")}
                </Typography>
            </NavLink>
        </li>
    );

    crumbs.push(
        <li key="icon1">
            <ChevronRight color="white" height="24px" width="24px" />
        </li>
    );

    if (currentPage && parentPageLink) {
        crumbs.push(
            <li key="currentLink">
                <NavLink to={parentPageLink}>
                    <Typography className={classes.breadcrumbTitle} variant="h4" color="activeColor" >
                        {currentPage}
                    </Typography>
                </NavLink>
            </li>
        );

        crumbs.push(
            <li key="icon2">
                <ChevronRight color="white" height="24px" width="24px" />
            </li>
        );

        crumbs.push(
            <li key="currentTitle">
                <Typography variant="h4" color="activeColor" >
                    {currentPageId}
                </Typography>
            </li>
        );

    } else if (currentPage) {
        crumbs.push(
            <li key="currentTitle">
                <Typography variant="h4" color="activeColor" >
                    {currentPage}
                </Typography>
            </li>
        );
    }
    return <ul className={`${classes.breadcrumbList} ${className}`}>{crumbs}</ul>;
};


