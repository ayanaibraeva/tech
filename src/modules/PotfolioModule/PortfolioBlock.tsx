import classes from "./PortfolioBlock.module.scss";

import { useRef, useState } from "react";
import { Loader } from "../../pages/LoaderPage/Loader.tsx";
import { usePortfolioQuery } from "./api/usePortfolioQuery.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import {LeftIcon} from "../../assets/Icons/LeftIcon.tsx";
import {RightIcon} from "../../assets/Icons/RightIcon.tsx";
import {MultiContainer} from "../../UI/MultiContainer/MultiContainer.tsx";

export const PortfolioBlock = () => {

    const { data, loading, error } = usePortfolioQuery();
    const portfolioRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    if (loading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <MultiContainer>
            <section id="portfolio" ref={portfolioRef}>
                <Typography variant="h2" className={classes.portfolioHeading}>Портфолио</Typography>
                <div className={classes.portfolio}>
                    <div className={classes.portfolioCard}>
                        <Typography variant="h2" color="activeColor">{data[currentIndex].title}</Typography>
                        <div className={classes.portfolioContent}>
                            <Typography
                                className={classes.description}
                                variant="body"
                            >
                                {data[currentIndex].description}
                            </Typography>
                            <div>
                                <img
                                    src={data[currentIndex].image}
                                    alt={data[currentIndex].title}
                                />
                            </div>
                        </div>
                        <a
                            href={data[currentIndex].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.portfolioBtn}
                        >
                            <Typography variant="h4">Посмотреть проект</Typography>
                        </a>
                    </div>

                    <div className={classes.navigation}>
                        <button onClick={handlePrev}>
                            <LeftIcon width="16px" height="16px" color="white"/>
                        </button>
                        <button onClick={handleNext}>
                            <RightIcon width="16px" height="16px" color="white"/>
                        </button>
                    </div>


                    <div className={classes.dots}>
                        {data.map((_, index) => (
                            <span
                                key={index}
                                className={`${classes.dot} ${
                                    index === currentIndex ? classes.active : ""
                                }`}
                                onClick={() => handleDotClick(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </section>
        </MultiContainer>
    );
};
