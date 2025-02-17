import classes from "./PortfolioBlock.module.scss";

import React, { Children, useRef, useState, CSSProperties, ReactNode } from "react";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { usePortfolioQuery } from "./api/usePortfolioQuery.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { LeftIcon } from "../../assets/Icons/LeftIcon.tsx";
import { RightIcon } from "../../assets/Icons/RightIcon.tsx";
import { useTranslation } from "react-i18next";
import {Loader} from "../../pages/LoaderPage/Loader.tsx";

const MAX_VISIBILITY = 3;

interface CarouselProps {
    children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
    const [active, setActive] = useState<number>(2);
    const [startX, setStartX] = useState<number | null>(null);
    const count = Children.count(children);
    const portfolio = useRef<HTMLDivElement>(null);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!startX) return;

        const diffX = startX - e.touches[0].clientX;
        if (Math.abs(diffX) > 50) {
            setActive((prevActive) => {
                if (diffX > 0 && prevActive < count - 1) {
                    return prevActive + 1;
                } else if (diffX < 0 && prevActive > 0) {
                    return prevActive - 1;
                }
                return prevActive;
            });
            setStartX(null);
        }
    };

    const handleTouchEnd = () => {
        setStartX(null);
    };

    return (
        <div
            id="portfolio"
            ref={portfolio}
            className={classes.car}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className={classes.carousel}>
                {active > 0 && (
                    <button
                        className={`${classes.nav} ${classes.left}`}
                        onClick={() => setActive((i) => i - 1)}
                        aria-label="buttonPrevious"
                    >
                        <LeftIcon width="20px" height="20px" color="white" />
                    </button>
                )}
                {Children.map(children, (child, i) => (
                    <div
                        key={i}
                        className={classes.cardContainer}
                        style={{
                            "--active": i === active ? 1 : 0,
                            "--offset": (active - i) / 3,
                            "--direction": Math.sign(active - i),
                            "--abs-offset": Math.abs(active - i) / 3,
                            pointerEvents: active === i ? "auto" : "none",
                            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
                            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
                        } as CSSProperties}
                    >
                        {child}
                    </div>
                ))}
                {active < count - 1 && (
                    <button
                        className={`${classes.nav} ${classes.right}`}
                        onClick={() => setActive((i) => i + 1)}
                        aria-label="buttonNext"
                    >
                        <RightIcon width="20px" height="20px" color="white" />
                    </button>
                )}
            </div>
        </div>
    );
};

export const PortfolioBlock = () => {
    const { data, error, isLoading } = usePortfolioQuery();
    const { t } = useTranslation();

    if(isLoading) return <Loader/>;
    if (error) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <MultiContainer>
            <Typography className={classes.title} variant="h2" color="white">
                {t("header.portfolio")}
            </Typography>
            <Carousel>
                {data.map((item: { title: string; description: string; image: string; link: string }, i: number) => (
                    <div key={i} className={classes.card}>

                       <div className={classes.cardMobile}>
                           <div>
                               <span>
                                   {item.title}
                               </span>
                               <p>{item.description}</p>
                           </div>
                           <div>
                               <img src={item.image} alt={item.title} />
                           </div>
                       </div>

                        <div className={classes.cardContent}>
                            <div>
                                <Typography color="activeColor" variant="h2">
                                    {item.title}
                                </Typography>
                                <p>{item.description}</p>
                            </div>
                            <div className={classes.cardImage}>
                                <img src={item.image} alt={item.title} />
                            </div>
                        </div>

                        <div className={classes.cardBtn}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <Typography className={classes.cardBtnName} variant="h4" color="white">
                                    {t("buttonShow")}
                                </Typography>
                            </a>
                        </div>
                    </div>
                ))}
            </Carousel>
        </MultiContainer>
    );
};