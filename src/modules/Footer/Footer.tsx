import classes from "./Footer.module.scss";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { Link } from "react-router-dom";
import { FooterContact } from "./component/FooterContact/FooterContact.tsx";
import { SectionLinkItem } from "./component/SectionLink/SectionLinkItem.tsx";
import { FooterBottom } from "./component/FooterBottom/FooterBottom.tsx";
import { useTranslation } from "react-i18next";
import { LogoIcon } from "../../assets/Icons/LogoIcon.tsx";

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className={classes.hr} />
            <MultiContainer>
                <footer className={classes.footer}>
                    <Link to="/" className={classes.footerLogo} aria-label={t("header.home")}>
                        <LogoIcon />
                    </Link>
                    <div className={classes.footerContent}>
                        <FooterContact />
                        <div className={classes.footerLink}>
                            <Link to="/about-company" className={classes.link}>
                                <span>{t("header.about")}</span>
                            </Link>
                            <Link to="/services" className={classes.link}>
                                <span>{t("header.services")}</span>
                            </Link>
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