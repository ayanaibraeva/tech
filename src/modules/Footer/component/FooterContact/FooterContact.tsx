import classes from "./FooterContact.module.scss";

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
    const { data, error } = useFooterQuery();

    if (error) return null;
    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    return (
        <div>
            {data.map((item: FooterContactItem, id: number) => (
                <div key={id} className={classes.footerContact}>
                    {item.telegram_link && (
                        <a
                            href={item.telegram_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Перейти в Telegram"
                        >
                            <TelegramIcon />
                        </a>
                    )}
                    {item.instagram_link && (
                        <a
                            href={item.instagram_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Перейти в Instagram"
                        >
                            <InstagramIcon />
                        </a>
                    )}
                    {item.email && (
                        <a
                            href={`mailto:${item.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Написать на email: ${item.email}`}
                        >
                            <EmailIcon />
                        </a>
                    )}
                    {item.address_link && (
                        <a
                            href={item.address_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Посмотреть адрес"
                        >
                            <LocationIcon />
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};