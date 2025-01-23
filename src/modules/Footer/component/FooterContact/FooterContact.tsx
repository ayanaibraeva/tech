import classes from "./FooterContact.module.scss";

import { Loader } from "../../../../pages/LoaderPage/Loader.tsx";
import { useFooterQuery } from "../../api/useFooterQuery.tsx";
import { TelegramIcon } from "../../../../assets/Icons/TelegramIcon.tsx";
import { InstagramIcon } from "../../../../assets/Icons/InstagramIcon.tsx";
import { EmailIcon } from "../../../../assets/Icons/EmailIcon.tsx";
import { LocationIcon } from "../../../../assets/Icons/LocationIcon.tsx";


interface FooterContactItem {
    telegram_link?: string;
    instagram_link?: string;
    email?: string;
    address_link?: string;
}

export const FooterContact = () => {
    const { data, isLoading, error } = useFooterQuery();

    if (isLoading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <div>
            {
                data.map((item: FooterContactItem, id: number) => (
                    <div key={id} className={classes.footerContact}>
                        {item.telegram_link && (
                            <a href={item.telegram_link} target="_blank" rel="noopener noreferrer">
                                <TelegramIcon />
                            </a>
                        )}
                        {item.instagram_link && (
                            <a href={item.instagram_link} target="_blank" rel="noopener noreferrer">
                                <InstagramIcon />
                            </a>
                        )}
                        {item.email && (
                            <a href={`mailto:${item.email}`} target="_blank" rel="noopener noreferrer">
                                <EmailIcon />
                            </a>
                        )}
                        {item.address_link && (
                            <a href={item.address_link} target="_blank" rel="noopener noreferrer">
                                <LocationIcon />
                            </a>
                        )}
                    </div>
                ))
            }
        </div>
    );
};