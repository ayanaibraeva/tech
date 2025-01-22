import classes from "./AboutUs.module.scss";

import {useCounterQuery} from "../../api/useCounterQuery.tsx";
import {MultiContainer} from "../../../../UI/MultiContainer/MultiContainer.tsx";
import {Typography} from "../../../../UI/Typography/Typography.tsx";
import {Loader} from "../../../../pages/LoaderPage/Loader.tsx";
import {ChevronRight} from "../../../../assets/Icons/ChevronRight.tsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const AboutUs = () => {

    const {data, loading, error} = useCounterQuery();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleLearnMore = () => {
        navigate("/about-company");
    };

    if(loading) return <Loader/>
    if(error) return <div>...error</div>
    if(!data) return null

    return (
        <MultiContainer>
                {
                    data.map((item) =>
                    <div className={classes.aboutUs}>
                        <Typography className={classes.headingTablet} variant="h2">{t("header.about")}</Typography>
                        <div className={classes.aboutUsImage}>
                            <img src={item.image} alt=""/>
                        </div>
                        <div>
                            <Typography className={classes.heading} variant="h2">{t("header.about")}</Typography>
                            <Typography variant="body" className={classes.text}>
                                {item.description}
                            </Typography>
                            <button
                                onClick={handleLearnMore}
                                className={classes.btn}
                            >
                                <Typography variant="h4">{t("buttonMore")}</Typography>
                                <ChevronRight color="#FFF" height="24px" width="24px"/>
                            </button>
                        </div>
                    </div>
                    )}
        </MultiContainer>
    )
}