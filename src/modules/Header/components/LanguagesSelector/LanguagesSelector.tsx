import classes from "./LanguageSelector.module.scss";

import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef, useState} from "react";
import {ChevronDown} from "../../../../assets/Icons/ChevronDown.tsx";
import {useOutsideClick} from "../../../../utils/hooks/useOutsideClick.ts";

export const LanguageSelector = () => {

    const { i18n } = useTranslation();
    const [activeList, setActiveList] = useState<boolean | null>(null);
    const ref = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useOutsideClick(ref, () => setActiveList(null));
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setActiveList(null);
        window.location.reload()

        const currentPath = location.pathname + location.search;
        navigate(currentPath, { replace: true });
    };

    const languages = [
        { code: "ru", label: "RU" },
        { code: "en", label: "EN" },
    ];

    return (
        <div ref={ref} className={classes.headerSelect}>
            <button
                type="button"
                className={classes.selectedOption}
                onClick={() => setActiveList((prev) => !prev)}
            >
                {languages.find((lang) => lang.code === i18n.language)?.label}
                <ChevronDown
                    height="24px"
                    width="24px"
                    color="white"
                    className={`${classes.ArrowDownSvg} ${activeList ? classes.open : ""}`}
                />
            </button>
            <ul className={`${classes.optionList} ${activeList ? classes.open : ""}`}>
                {languages
                    .filter((lang) => lang.code !== i18n.language)
                    .map((lang) => (
                        <li
                            key={lang.code}
                            className={classes.languageOption}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            {lang.label}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
