import classes from "./Header.module.scss";

import { SectionLinkItem } from "../Footer/SectionLinkItem.tsx";
import { SubLinks } from "./components/Sublinks/SubLinks.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { useNavigate } from "react-router-dom";
import {LanguageSelector} from "./components/LanguagesSelector/LanguagesSelector.tsx";
import {MultiContainer} from "../../UI/MultiContainer/MultiContainer.tsx";
import {LogoIcon} from "../../assets/Icons/LogoIcon.tsx";

export const Header = () => {

    const headerLinks = [
        { id: '1', label: 'portfolio', title: 'Портфолио' },
    ];

    const navigate = useNavigate();

    const handleClickAbout = () => {
        navigate("/about-company");
    }

    const handleClickContacts = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    };

    const handleClickLogo = () => {
        navigate('/');
    }

    return (
        <header className={classes.header}>
            <MultiContainer>
                <div className={classes.navbar}>
                    <div className={classes.logo} onClick={handleClickLogo}>
                        <LogoIcon/>
                    </div>
                    <div className={classes.navbarItem}>
                        <div className={classes.navbarList} onClick={handleClickAbout}>
                            <Typography variant="h4">О компании</Typography>
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
                            <Typography variant="h4">Контакты</Typography>
                        </div>
                    </div>
                    <div className={classes.nav}>
                        <LanguageSelector/>
                        <Typography variant="h4" className={classes.navBtn}>Связаться</Typography>
                    </div>
                </div>
            </MultiContainer>
            <div className={classes.hr}/>
        </header>
    );
};
