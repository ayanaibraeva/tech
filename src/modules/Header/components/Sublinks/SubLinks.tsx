import classes from "./SubLinks.module.scss";

import React, { useRef, useState, useEffect } from "react";
import { useServicesTypesQuery } from "../../api/useServicesTypesQuery.tsx";
import { ChevronRight } from "../../../../assets/Icons/ChevronRight.tsx";
import { ChevronDownHover } from "../../../../assets/Icons/ChevronDownHover.tsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SubLinksProps {
    closeMenu?: () => void;
}

interface ServiceType {
    id: string;
    name: string;
    text: string;
}

export const SubLinks: React.FC<SubLinksProps> = ({ closeMenu }) => {
    const { data, isLoading, error } = useServicesTypesQuery();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLDivElement | null>(null);
    const { t } = useTranslation();

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleItemClick = (name: string) => {
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
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target as Node)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (isLoading) return <div>...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data) || data.length === 0) return null;

    const serviceTypes = data as ServiceType[];


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
                {serviceTypes.map && serviceTypes.map((item) => (
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