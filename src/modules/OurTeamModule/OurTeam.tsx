import classes from "./OurTeam.module.scss";
import { useTeamQuery } from "./api/useTeamQuery.tsx";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { Loader } from "../../pages/LoaderPage/Loader.tsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css";
import { useRef } from 'react';
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import {LeftIcon} from "../../assets/Icons/LeftIcon.tsx";
import {RightIcon} from "../../assets/Icons/RightIcon.tsx";

export const OurTeam = () => {
    const { data, loading, error } = useTeamQuery();
    const swiperRef = useRef(null);
    const { t } = useTranslation();

    if (loading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

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
                    {data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className={classes.card}>
                                <div className={classes.cardImg}>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className={classes.cardContent}>
                                    <Typography variant="body" color="activeColor">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="smallBody">{item.position}</Typography>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={classes.btn}>
                <button
                    className={classes.arrowLeft}
                    onClick={() => swiperRef.current.swiper.slidePrev()}
                >
                    <LeftIcon width="16px" height="16px" color="white" />
                </button>

                <button
                    className={classes.arrowRight}
                    onClick={() => swiperRef.current.swiper.slideNext()}
                >
                    <RightIcon width="16px" height="16px" color="white" />
                </button>
            </div>

            <div className={classes.pagination}></div>
        </MultiContainer>
    );
};
