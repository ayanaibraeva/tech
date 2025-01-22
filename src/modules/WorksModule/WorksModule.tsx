import classes from "./WorksModule.module.scss";

import {Loader} from "../../pages/LoaderPage/Loader.tsx";
import {useWorksQuery} from "./api/useWorksQuery.tsx";
import {Typography} from "../../UI/Typography/Typography.tsx";
import {MultiContainer} from "../../UI/MultiContainer/MultiContainer.tsx";
import {LineIcon} from "../../assets/Icons/LineIcon.tsx";
import {useTranslation} from "react-i18next";

export const WorksModule = () => {

    const { data, loading, error } = useWorksQuery();
    const {t} = useTranslation()

    if(loading) return <Loader/>
    if(error) return <div>...error</div>
    if(!data) return null

    return (
       <MultiContainer>
           <Typography variant="h2" className={classes.worksHeading}>{t("howWeWorks")}</Typography>
               <div>
                   <div className={classes.works}>
                       {
                           data?.map((item, index) =>
                               <div
                                   key={item.id || index}
                                   className={classes.worksLine}
                               >
                                   <div className={classes.worksImage}>
                                       <img src={item.icon} alt={item.title}/>
                                   </div>
                                   <div className={classes.line}>
                                       {index < 2 && <LineIcon />}
                                   </div>
                               </div>
                           )
                       }
                   </div>

                   <div className={classes.worksContent}>
                       {
                           data?.map((item, index) =>
                               <div
                                   key={item.id || index}
                                   className={classes.worksText}
                               >
                                   <Typography variant="h4">{item.title}</Typography>
                                   <Typography variant="microBody"> {item.description}</Typography>
                               </div>
                           )
                       }
                   </div>


                   <div>
                       {
                           data?.map((item, index) =>
                               <div
                                   key={item.id || index}
                                   className={classes.mobileWorks}
                               >
                                   <div className={classes.worksImage}>
                                       <img src={item.icon} alt={item.title}/>
                                   </div>
                                   <div className={classes.content}>
                                       <div className={classes.worksText}>
                                           <Typography variant="h4">{item.title}</Typography>
                                           <Typography variant="microBody"> {item.description}</Typography>
                                       </div>
                                   </div>
                               </div>
                           )
                       }
                   </div>
               </div>
       </MultiContainer>
    )
}