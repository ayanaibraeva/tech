import classes from "./AboutUs.module.scss";

import { useCounterQuery } from "../../api/useCounterQuery";
import { MultiContainer } from "../../../../UI/MultiContainer/MultiContainer";
import { Typography } from "../../../../UI/Typography/Typography";
import { Loader } from "../../../../pages/LoaderPage/Loader";
import { ChevronRight } from "../../../../assets/Icons/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";



export const AboutUs = () => {
    const { data, isLoading, error } = useCounterQuery();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLearnMore = () => {
        navigate("/about-company");
    };

    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <MultiContainer>
            {data.map((item, index: number) => (
                <div key={item.id || index} className={classes.aboutUs}>
                    <Typography className={classes.headingTablet} variant="h2">
                        {t("header.about")}
                    </Typography>
                    <div className={classes.aboutUsImage}>
                        <img src={item.image} alt="" />
                    </div>
                    <div>
                        <Typography className={classes.heading} variant="h2">
                            {t("header.about")}
                        </Typography>
                        <Typography variant="body" className={classes.text}>
                            {item.description}
                        </Typography>
                        <button onClick={handleLearnMore} className={classes.btn}>
                            <Typography variant="button" color="white">{t("buttonMore")}</Typography>
                            <ChevronRight color="#FFF" height="24px" width="24px" />
                        </button>
                    </div>
                </div>
            ))}
        </MultiContainer>
    );
};
