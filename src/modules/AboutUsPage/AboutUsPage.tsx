import classes from './AboutUsPage.module.scss';

import { useState } from 'react';
import { useCounterQuery } from '../AboutCompanyModule/api/useCounterQuery.tsx';
import { Loader } from '../../pages/LoaderPage/Loader.tsx';
import { Typography } from '../../UI/Typography/Typography.tsx';
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "../../UI/Breadcrumbs/Breadcrums.tsx";

export const AboutUsPage = () => {

    const { data, isLoading, error } = useCounterQuery();
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const { t } = useTranslation();

    const handleImageClick = (index: number) => {
        setClickedIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const renderMedia = (media: string, type: 'image' | 'video') => {
        if (type === 'image') {
            return <img src={media} alt="" />;
        } else if (type === 'video') {
            return <video src={media} controls />;
        }
        return null;
    };

    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <>
            <Breadcrumbs currentPage={t("header.about")} />
            <Typography variant="h2" className={classes.aboutUsHeading}>{t("header.about")}</Typography>
            {data.map((item, index) => (
                <div key={index}>
                    <div className={classes.aboutUs}>
                        <div
                            className={`${classes.aboutUsImage} ${clickedIndex === index ? classes.clicked : ''}`}
                            onClick={() => handleImageClick(index)}
                        >
                            {renderMedia(item.image, 'image')}
                        </div>
                        <div
                            className={`${classes.aboutUsImage1} ${clickedIndex === index ? classes.clicked : ''}`}
                            onClick={() => handleImageClick(index)}
                        >
                            {item.video2 ? renderMedia(item.video2, 'video') : renderMedia(item.image2, 'image')}
                        </div>
                    </div>
                    <Typography variant="body" className={classes.content}>
                        {item.description}
                    </Typography>
                </div>
            ))}
        </>
    );
};
