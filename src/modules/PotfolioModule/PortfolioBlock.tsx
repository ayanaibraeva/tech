import classes from "./PortfolioBlock.module.scss";

import { Children, useRef, useState } from "react";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { Loader } from "../../pages/LoaderPage/Loader.tsx";
import { usePortfolioQuery } from "./api/usePortfolioQuery.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { LeftIcon } from "../../assets/Icons/LeftIcon.tsx";
import { RightIcon } from "../../assets/Icons/RightIcon.tsx";
import { useTranslation } from "react-i18next";

const MAX_VISIBILITY = 3;

const Carousel = ({ children }) => {
    const [active, setActive] = useState(2);
    const count = Children.count(children);
    const portfolio = useRef();
    const startX = useRef(0);
    const currentX = useRef(0);

    // Обработка начала касания
    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
    };

    // Обработка движения пальца
    const handleTouchMove = (e) => {
        currentX.current = e.touches[0].clientX;
    };

    // Обработка завершения касания
    const handleTouchEnd = () => {
        const deltaX = startX.current - currentX.current;
        if (deltaX > 50 && active < count - 1) {
            setActive((prev) => prev + 1); // Сдвиг вправо
        } else if (deltaX < -50 && active > 0) {
            setActive((prev) => prev - 1); // Сдвиг влево
        }
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
                        className={classes.cardContainer}
                        style={{
                            "--active": i === active ? 1 : 0,
                            "--offset": (active - i) / 3,
                            "--direction": Math.sign(active - i),
                            "--abs-offset": Math.abs(active - i) / 3,
                            pointerEvents: active === i ? "auto" : "none",
                            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
                            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
                        }}
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
    const { data, loading, error } = usePortfolioQuery();
    const { t } = useTranslation();

    if (loading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <MultiContainer>
            <Typography className={classes.title} variant="h2" color="white">
                {t("header.portfolio")}
            </Typography>
            <Carousel>
                {data.map((item, i) => (
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
