import classes from "./PortfolioBlock.module.scss";
import { Children, useRef, useState, CSSProperties, ReactNode } from "react";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { Loader } from "../../pages/LoaderPage/Loader.tsx";
import { usePortfolioQuery } from "./api/usePortfolioQuery.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { LeftIcon } from "../../assets/Icons/LeftIcon.tsx";
import { RightIcon } from "../../assets/Icons/RightIcon.tsx";
import { useTranslation } from "react-i18next";

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
            setActive((prevActive) => (diffX > 0 ? prevActive + 1 : prevActive - 1));
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
                    <button className={`${classes.nav} ${classes.left}`} onClick={() => setActive((i) => i - 1)}>
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
                    <button className={`${classes.nav} ${classes.right}`} onClick={() => setActive((i) => i + 1)}>
                        <RightIcon width="20px" height="20px" color="white" />
                    </button>
                )}
            </div>
        </div>
    );
};

export const PortfolioBlock = () => {
    const { data, isLoading, error } = usePortfolioQuery();
    const { t } = useTranslation();

    if (isLoading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data || data.length === 0) return null;

    return (
        <MultiContainer>
            <Typography className={classes.title} variant="h2" color="white">
                {t("header.portfolio")}
            </Typography>
            <Carousel>
                {data.map((item: { title: string; description: string; image: string; link: string }, i: number) => (
                    <div key={i} className={classes.card}>
                        <Typography color="activeColor" variant="h2">
                            {item.title}
                        </Typography>
                        <div className={classes.cardContent}>
                            <Typography variant="body">{item.description}</Typography>
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