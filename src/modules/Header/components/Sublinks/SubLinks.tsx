import classes from "./SubLinks.module.scss";

import { useRef, useState, useEffect } from "react";
import { useServicesTypesQuery } from "../../api/useServicesTypesQuery.tsx";
import { Loader } from "../../../../pages/LoaderPage/Loader.tsx";
import { ChevronRight } from "../../../../assets/Icons/ChevronRight.tsx";
import { ChevronDownHover } from "../../../../assets/Icons/ChevronDownHover.tsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SubLinks = ({ closeMenu }) => {

    const { data, loading, error } = useServicesTypesQuery();

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const toggleRef = useRef(null);
    const { t } = useTranslation();

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleItemClick = (name) => {
        navigate(`/services?name=${name}`);
        closeDropdown();
        if (closeMenu) {
            closeMenu();
        }
    };

    const toggleSubForm = () => {
        setIsOpen((prev) => !prev);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <div>
            <div onClick={toggleSubForm} ref={toggleRef}>
                <span className={classes.toggle}>
                    {t("header.services")}
                    <ChevronDownHover
                        height="24px"
                        width="24px"
                        className={`${classes.ArrowDownSvg} ${isOpen ? classes.open : ""}`}
                    />
                </span>
            </div>
            <div
                ref={dropdownRef}
                className={`${classes.subForm} ${isOpen ? classes.open : ""}`}
            >
                {data.map((item) => (
                    <div
                        key={item.id}
                        className={classes.subFormContent}
                        onClick={() => handleItemClick(item.name)}
                    >
                        <p className={classes.title}>
                            {item.name}
                            <ChevronRight className={classes.nameIcon} height="24px" width="24px" color="white" />
                        </p>
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
