import classes from "./SubLinks.module.scss";

import { useRef, useState } from "react";
import { useServicesTypesQuery } from "../../api/useServicesTypesQuery.tsx";
import { Loader } from "../../../../pages/LoaderPage/Loader.tsx";
import { ChevronRight } from "../../../../assets/Icons/ChevronRight.tsx";
import { ChevronDownHover } from "../../../../assets/Icons/ChevronDownHover.tsx";
import { useNavigate } from "react-router-dom";
import {Typography} from "../../../../UI/Typography/Typography.tsx";

export const SubLinks = () => {
    const { data, loading, error } = useServicesTypesQuery();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const dropdownRef = useRef(null);
    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleItemClick = (name) => {
        navigate(`/services?name=${name}`);
        closeDropdown();
    };

    const toggleSubForm = () => {
        setIsOpen((prev) => !prev);
    };

    if (loading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <div>
            <div onClick={toggleSubForm}>
                <Typography  className={classes.toggle} variant="h4">
                    Услуги
                    <ChevronDownHover
                        height="24px"
                        width="24px"
                        defaultColor="white"
                        hoverColor="#CC23AC"
                        className={`${classes.ArrowDownSvg} ${isOpen ? classes.open : ""}`}
                    />
                </Typography>
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
                            <ChevronRight height="24px" width="24px" color="white" />
                        </p>
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
