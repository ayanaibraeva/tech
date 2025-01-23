import classes from "./Banner.module.scss";

import { Typography } from "../../UI/Typography/Typography.tsx";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import bannerImage from "../../assets/image/Start.png";
import { Loader } from "../../pages/LoaderPage/Loader.tsx";
import { useBannerQuery } from "./api/useBannerQuery.tsx";
import { useFooterQuery } from "../Footer/api/useFooterQuery.tsx";
import { useTranslation } from "react-i18next";

interface BannerItem {
    id: string;
    title: string;
    text: string;
}

export const Banner = () => {
    const { data, isLoading, error } = useBannerQuery();
    const { data: footerData } = useFooterQuery();

    const { t } = useTranslation();

    if (isLoading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <MultiContainer>
            <>
                {data.map((item: BannerItem, index: number) => (
                    <div key={item.id || index} className={classes.banner}>
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
                                    href={footerData[0]?.telegram_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button>
                                        <Typography variant="h4">{t("header.button")}</Typography>
                                    </button>
                                </a>
                            )}
                        </div>
                        <div className={classes.bannerImage}>
                            <img src={bannerImage} alt="" />
                        </div>
                    </div>
                ))}
            </>
        </MultiContainer>
    );
};
