import classes from "./OurTeam.module.scss";

import { useTeamQuery } from "./api/useTeamQuery.tsx";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css";
import { useRef } from 'react';
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { LeftIcon } from "../../assets/Icons/LeftIcon.tsx";
import { RightIcon } from "../../assets/Icons/RightIcon.tsx";
import {Loader} from "../../pages/LoaderPage/Loader.tsx";


interface TeamMember {
    id: string;
    name: string;
    position: string;
    image: string;
}

export const OurTeam = () => {
    const { data, isError, isLoading } = useTeamQuery();
    const swiperRef:any = useRef(null);
    const { t } = useTranslation();


    if(isLoading) return <Loader/>;
    if (isError) return <div>...error</div>;
    if (!Array.isArray(data) || data.length < 4) return null;

    return (
        <MultiContainer>
            <Typography variant="h2" className={classes.teamHeading}>
                {t("team")}
            </Typography>
            <div className={classes.ourTeam}>
                <Swiper
                    spaceBetween={40}
                    slidesPerView={4}
                    loop={true}
                    pagination={{
                        clickable: true,
                        el: `.${classes.pagination}`,
                    }}
                    modules={[Pagination]}
                    ref={swiperRef}
                    breakpoints={{
                        1024: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 8
                        },
                        0: {
                            slidesPerView: 1,
                        },
                    }}
                >
                    {data.map((item: TeamMember) => (
                        <SwiperSlide key={item.id}>
                            <div className={classes.card}>
                                <div className={classes.cardImg}>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className={classes.cardContent}>
                                    <p>{item.name}</p>
                                    <span>{item.position}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={classes.btn}>
                <button
                    className={classes.arrowLeft}
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                    aria-label="buttonPrevious"
                >
                    <LeftIcon width="16px" height="16px" color="white" />
                </button>

                <button
                    className={classes.arrowRight}
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    aria-label={t("buttonNext")}
                >
                    <RightIcon width="16px" height="16px" color="white" />
                </button>
            </div>

            <div className={classes.pagination}></div>
        </MultiContainer>
    );
};