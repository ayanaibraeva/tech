import classes from "./NotFoundPage.module.scss";

import notFound from "../../assets/image/404.png";
import {MultiContainer} from "../../UI/MultiContainer/MultiContainer.tsx";
import {Typography} from "../../UI/Typography/Typography.tsx";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

export const NotFoundPage = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/')
    }

    return (
       <MultiContainer>
           <div className={classes.container}>
               <div>
                   <p>{t("404")}</p>
                   <button
                        onClick={handleClick}
                   >
                       <Typography color="white" variant="h4">{t("toTheMain")}</Typography>
                   </button>
               </div>
               <div>
                   <img src={notFound} alt="404"/>
               </div>
           </div>
       </MultiContainer>
    )
}