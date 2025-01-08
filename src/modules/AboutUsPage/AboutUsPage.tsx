import classes from './AboutUsPage.module.scss';

import { useState } from 'react';
import { useCounterQuery } from '../AboutCompanyModule/api/useCounterQuery.tsx';
import { Loader } from '../../pages/LoaderPage/Loader.tsx';
import { MultiContainer } from '../../UI/MultiContainer/MultiContainer.tsx';
import { Typography } from '../../UI/Typography/Typography.tsx';

export const AboutUsPage = () => {

    const { data, loading, error } = useCounterQuery();
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setClickedIndex(prevIndex => (prevIndex === index ? null : index));
    };

    if (loading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <MultiContainer>
            <Typography variant="h2" className={classes.aboutUsHeading}>О компании</Typography>
            {data.map((item, index) => (
                <>
                    <div className={classes.aboutUs} key={index}>
                        <div
                            className={`${classes.aboutUsImage} ${clickedIndex === index ? classes.clicked : ''}`}
                            onClick={() => handleImageClick(index)}
                        >
                            <img src={item.image} alt="" />
                        </div>
                        <div
                            className={`${classes.aboutUsImage1} ${clickedIndex === index ? classes.clicked : ''}`}
                            onClick={() => handleImageClick(index)}
                        >
                            <img src={item.image2} alt="" />
                        </div>
                    </div>
                    <Typography variant="body" className={classes.content}>
                        {item.description}
                    </Typography>
                </>
            ))}
        </MultiContainer>
    );
};
