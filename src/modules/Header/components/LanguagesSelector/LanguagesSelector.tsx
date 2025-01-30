import classes from "./LanguageSelector.module.scss";

import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { RefObject, useRef, useState, useEffect } from "react";
import { ChevronDown } from "../../../../assets/Icons/ChevronDown.tsx";
import { useOutsideClick } from "../../../../utils/hooks/useOutsideClick.ts";

export const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const [activeList, setActiveList] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useOutsideClick(ref as RefObject<HTMLElement>, () => setActiveList(false));

    useEffect(() => {
        if (!i18n.language) {
            i18n.changeLanguage('ru-RU');
        }
    }, [i18n]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setActiveList(false);
        window.location.reload();

        const currentPath = location.pathname + location.search;
        navigate(currentPath, { replace: true });
    };

    const languages = [
        { code: "ru-RU", label: "RU" },
        { code: "en", label: "EN" },
    ];

    const currentLanguageLabel = languages.find((lang) => lang.code === i18n.language)?.label;

    return (
        <div ref={ref} className={classes.headerSelect}>
            <button
                type="button"
                className={classes.selectedOption}
                onClick={() => setActiveList((prev) => !prev)}
                aria-label="buttonLanguages"
            >
                {currentLanguageLabel || "RU"}
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