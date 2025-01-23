import classes from "./Footer.module.scss";

import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { useNavigate } from "react-router-dom";
import { FooterContact } from "./component/FooterContact/FooterContact.tsx";
import { SectionLinkItem } from "./SectionLinkItem.tsx";
import { FooterBottom } from "./component/FooterBottom/FooterBottom.tsx";
import { useTranslation } from "react-i18next";
import { LogoIcon } from "../../assets/Icons/LogoIcon.tsx";

export const Footer = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <>
            <div className={classes.hr} />
            <MultiContainer>
                <footer className={classes.footer}>
                    <div
                        className={classes.footerLogo}
                        onClick={() => handleNavigate('/')}
                    >
                        <LogoIcon />
                    </div>
                    <div className={classes.footerContent}>
                        <FooterContact />
                        <div className={classes.footerLink}>
                            <div className={classes.link} onClick={() => handleNavigate('/about-company')}>
                                <span>{t("header.about")}</span>
                            </div>
                            <div className={classes.link} onClick={() => handleNavigate('/services')}>
                                <span>{t("header.services")}</span>
                            </div>
                            <SectionLinkItem
                                to="portfolio"
                                label={t("header.portfolio")}
                                className={classes.link}
                            />
                            <SectionLinkItem
                                to="ourTeam"
                                label={t("team")}
                                className={classes.link}
                            />
                            <SectionLinkItem
                                to="faq"
                                label="FAQ"
                                className={classes.link}
                            />
                        </div>
                        <FooterBottom />
                    </div>
                </footer>
            </MultiContainer>
        </>
    );
};