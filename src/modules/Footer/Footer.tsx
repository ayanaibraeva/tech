import classes from "./Footer.module.scss";

import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { useNavigate } from "react-router-dom";
import { FooterContact } from "./component/FooterContact/FooterContact.tsx";
import {SectionLinkItem} from "./SectionLinkItem.tsx";
import {FooterBottom} from "./component/FooterBottom/FooterBottom.tsx";

export const Footer = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className={classes.hr} />
            <MultiContainer>
                <footer className={classes.footer}>
                    <div onClick={() => handleNavigate('/')}>
                        <Typography className={classes.footerLogo} variant="h2">TECHFUSION</Typography>
                    </div>
                    <div className={classes.footerContent}>
                        <FooterContact />
                        <div className={classes.footerLink}>
                            <div className={classes.link} onClick={() => handleNavigate('/about-company')}>
                                <Typography variant="h4">О компании</Typography>
                            </div>
                            <div className={classes.link} onClick={() => handleNavigate('/services')}>
                                <Typography variant="h4" >Услуги</Typography>
                            </div>
                            <SectionLinkItem
                                to="portfolio"
                                label="Портфолио"
                                className={classes.link}
                            />
                            <SectionLinkItem
                                to="ourTeam"
                                label="Наша команда"
                                className={classes.link}
                            />
                            <SectionLinkItem
                                to="faq"
                                label="FAQ"
                                className={classes.link}
                            />
                        </div>
                        <FooterBottom/>
                    </div>
                </footer>
            </MultiContainer>
        </>
    );
};
