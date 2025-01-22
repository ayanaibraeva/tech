import classes from "./Header.module.scss";

import { useState, useEffect } from "react";
import { SectionLinkItem } from "../Footer/SectionLinkItem.tsx";
import { SubLinks } from "./components/Sublinks/SubLinks.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { useNavigate } from "react-router-dom";
import { LanguageSelector } from "./components/LanguagesSelector/LanguagesSelector.tsx";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { LogoIcon } from "../../assets/Icons/LogoIcon.tsx";
import { useFooterQuery } from "../Footer/api/useFooterQuery.tsx";
import { useTranslation } from "react-i18next";

export const Header = () => {
    const { data } = useFooterQuery();
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const headerLinks = [
        { id: '1', label: 'portfolio', title: `${t("header.portfolio")}` },
    ];

    const navigate = useNavigate();

    const handleClickAbout = () => {
        navigate("/about-company");
    };

    const handleClickContacts = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    };

    const handleClickLogo = () => {
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => {
            const newState = !prevState;
            document.body.style.overflow = newState ? "hidden" : "auto";
            return newState;
        });
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1000px)");
        setIsMobile(mediaQuery.matches);

        const handleResize = () => {
            setIsMobile(mediaQuery.matches);
        };

        mediaQuery.addListener(handleResize);

        return () => {
            mediaQuery.removeListener(handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = "auto";
    };


    return (
        <header className={classes.header}>
            <MultiContainer>
                <div className={classes.navbar}>
                    <div className={classes.logo} onClick={() => {handleClickLogo(); closeMenu()}}>
                        <LogoIcon />
                    </div>
                    <div className={classes.navbarItem}>
                        <div className={classes.navbarList} onClick={handleClickAbout}>
                            <span>{t("header.about")}</span>
                        </div>
                        <SubLinks />
                        <ul>
                            {headerLinks.map(link => (
                                <SectionLinkItem
                                    key={link.id}
                                    to={link.label}
                                    label={link.title}
                                    className={classes.navbarList}
                                />
                            ))}
                        </ul>
                        <div className={classes.navbarList} onClick={handleClickContacts}>
                            <span>{t("header.contact")}</span>
                        </div>
                    </div>


                    {!isMobile && (
                        <div className={classes.navLeft}>
                            <LanguageSelector />
                            {data && (
                                <a
                                    href={data[0]?.telegram_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.navBtn}
                                >
                                    <Typography variant="h4">{t("header.button")}</Typography>
                                </a>
                            )}
                        </div>
                    )}


                    <div className={classes.nav}>
                        {isMobile && isMenuOpen && (
                            <>
                                <LanguageSelector />
                                {data && (
                                    <a
                                        href={data[0]?.telegram_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={classes.navBtn}
                                    >
                                        <Typography variant="h4">{t("header.button")}</Typography>
                                    </a>
                                )}
                            </>
                        )}
                        <div
                            className={`${classes.burgerIcon} ${isMenuOpen ? classes.open : ''}`}
                            onClick={toggleMenu}
                        >
                            <div className={classes.burgerBar}></div>
                            <div className={classes.burgerBar}></div>
                            <div className={classes.burgerBar}></div>
                        </div>
                    </div>
                </div>
            </MultiContainer>

            <div className={`${classes.sidePanel} ${isMenuOpen ? classes.open : ''}`}>
                <div
                    className={classes.navbarList}
                    onClick={() => {handleClickAbout(); closeMenu()}}
                >
                    <span>{t("header.about")}</span>
                </div>
                <div className={classes.sidePanelLinks}>
                    {headerLinks.map(link => (
                        <div key={link.id} onClick={closeMenu}>
                            <SectionLinkItem
                                key={link.id}
                                to={link.label}
                                label={link.title}
                                className={classes.navbarList}
                            />
                        </div>
                    ))}
                    <div
                        className={classes.navbarList}
                        onClick={() => {handleClickContacts(); closeMenu();}}
                    >
                        <span>{t("header.contact")}</span>
                    </div>
                    <SubLinks closeMenu={closeMenu}/>
                </div>
            </div>

            <div className={classes.hr} />
        </header>
    );
};
