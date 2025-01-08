import classes from "./Banner.module.scss";

import {Typography} from "../../UI/Typography/Typography.tsx";
import {MultiContainer} from "../../UI/MultiContainer/MultiContainer.tsx";

import bannerImage from "../../assets/image/Start.png"
import {Loader} from "../../pages/LoaderPage/Loader.tsx";
import {useBannerQuery} from "./api/useBannerQuery.tsx";

export const Banner = () => {

    const { data, loading, error } = useBannerQuery();

    if (loading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <MultiContainer>
            <div className={classes.banner}>
                {
                    data.map((item) =>
                        <>
                            <div className={classes.bannerHeading}>
                                <Typography  variant="h1">{item.title}</Typography>
                                <Typography className={classes.bannerTitle} variant="body" color="activeColor">{item.text}</Typography>
                                {/* Ссылка на Telegram */}
                                <a href="https://t.me/ayanaibraeva" target="_blank" rel="noopener noreferrer">
                                    <button>Связаться</button>
                                </a>
                            </div>
                            <div className={classes.bannerImage}>
                                <img src={bannerImage} alt=""/>
                            </div>
                        </>
                    )
                }
            </div>
        </MultiContainer>
    )
}
