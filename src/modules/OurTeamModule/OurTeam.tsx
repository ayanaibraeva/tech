import classes from "./OurTeam.module.scss";

import { useTeamQuery } from "./api/useTeamQuery.tsx";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer.tsx";
import { LeftIcon } from "../../assets/Icons/LeftIcon.tsx";
import { RightIcon } from "../../assets/Icons/RightIcon.tsx";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { Loader } from "../../pages/LoaderPage/Loader.tsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css";

import { useRef } from 'react';
import { Pagination } from "swiper/modules";

export const OurTeam = () => {

    const { data, loading, error } = useTeamQuery();
    const swiperRef = useRef(null); // Реф для доступа к Swiper

    if (loading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <MultiContainer>
            <Typography variant="h2" className={classes.teamHeading}>Наша команда</Typography>
            <div >
                <div className={classes.ourTeam}>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={4} // Стандартное количество слайдов для десктопов
                        loop={true} // Сделать слайдер цикличным
                        pagination={{
                            clickable: true, // Возможность клика по пагинации
                            el: `.${classes.pagination}`, // Привязка к кастомному элементу для пагинации
                        }}
                        modules={[Pagination]} // Включаем Pagination модуль
                        ref={swiperRef} // Привязываем реф
                        breakpoints={{
                            450: { // Мобильные устройства
                                slidesPerView: 2,
                                spaceBetween: 10, // Можно добавить расстояние между слайдами (если нужно)
                            },
                            900: { // Планшеты
                                slidesPerView: 3, // Показываем 3 слайда
                                spaceBetween: 30, // Расстояние между слайдами
                            },
                            1024: { // Десктопы
                                slidesPerView: 4, // Показываем 4 слайда
                                spaceBetween: 50, // Расстояние между слайдами
                            },
                        }}
                    >
                        {data?.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className={classes.card}>
                                    <div className={classes.cardImg}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className={classes.cardContent}>
                                        <Typography variant="body" color="activeColor">{item.name}</Typography>
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

            </div>


            {/* Пагинация */}
            <div className={classes.pagination}>
                {/* Пагинация будет отображаться здесь */}
            </div>
        </MultiContainer>
    );
};
