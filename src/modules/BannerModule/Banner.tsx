import classes from "./Banner.module.scss";

import { Typography } from "../../UI/Typography/Typography.tsx";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { useBannerQuery } from "./api/useBannerQuery.tsx";
import { useFooterQuery } from "../Footer/api/useFooterQuery.tsx";
import { useTranslation } from "react-i18next";
import {Loader} from "../../pages/LoaderPage/Loader.tsx";

interface BannerItem {
    id: string;
    title: string;
    text: string;
    image: null
}

export const Banner = () => {
    const { data, error, isLoading } = useBannerQuery();
    const { data: footerData } = useFooterQuery();

    const { t } = useTranslation();

    if(isLoading) return <Loader/>;
    if (error) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data) || data.length === 0) return null;

    const banners = Array.isArray(data) ? data : [];

    const telegramLink = footerData?.[0]?.telegram_link || "#";

    return (
        <MultiContainer>
            <>
                {banners.map((item: BannerItem, index: number) => (
                    <div key={`${item.id || index}`} className={classes.banner}>
                        <div className={classes.bannerHeading}>
                            <Typography variant="h1">{item.title}</Typography>
                            <Typography
                                className={classes.bannerTitle}
                                variant="body"
                                color="activeColor"
                            >
                                {item.text}
                            </Typography>

                            {footerData && (
                                <a
                                    href={telegramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Typography
                                        className={classes.btn}
                                        variant="button"
                                    >
                                        {t("header.button")}
                                    </Typography>
                                </a>
                            )}
                        </div>
                        <div className={classes.bannerImage}>
                            <img src={item.image || "placeholder.png"} alt={item.title || "Banner"} />
                        </div>
                    </div>
                ))}
            </>
        </MultiContainer>
    );
};
