import classes from "./WorksModule.module.scss";

import { useWorksQuery } from "./api/useWorksQuery.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { LineIcon } from "../../assets/Icons/LineIcon.tsx";
import { useTranslation } from "react-i18next";
import {Loader} from "../../pages/LoaderPage/Loader.tsx";

interface WorkItem {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export const WorksModule = () => {
    const { data, error, isLoading } = useWorksQuery();
    const { t } = useTranslation();

    if(isLoading) return <Loader/>
    if (error) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <MultiContainer>
            <Typography variant="h2" className={classes.worksHeading}>{t("howWeWorks")}</Typography>
            <div>
                <div className={classes.works}>
                    {
                        data?.map((item: WorkItem, index: number) => (
                            <div
                                key={item.id || index}
                                className={classes.worksLine}
                            >
                                <div className={classes.worksImage}>
                                    <img src={item.icon} alt={item.title} />
                                </div>
                                <div className={classes.line}>
                                    {index < 2 && <LineIcon />}
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className={classes.worksContent}>
                    {
                        data?.map((item: WorkItem, index: number) => (
                            <div
                                key={item.id || index}
                                className={classes.worksText}
                            >
                                <Typography variant="h4">{item.title}</Typography>
                                <Typography variant="microBody">{item.description}</Typography>
                            </div>
                        ))
                    }
                </div>

                <div>
                    {
                        data?.map((item: WorkItem, index: number) => (
                            <div
                                key={item.id || index}
                                className={classes.mobileWorks}
                            >
                                <div className={classes.worksImage}>
                                    <img src={item.icon} alt={item.title} />
                                </div>
                                <div className={classes.content}>
                                    <div className={classes.worksText}>
                                        <Typography variant="h4">{item.title}</Typography>
                                        <Typography variant="microBody">{item.description}</Typography>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </MultiContainer>
    );
};