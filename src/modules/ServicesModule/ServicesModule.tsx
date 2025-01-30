import classes from "./ServicesModule.module.scss";
import { useEffect, useState, useRef } from "react";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { useServicesTypesQuery } from "../Header/api/useServicesTypesQuery.tsx";
import { useQueryServices } from "./api/useQueryServices.tsx";
import Tilt from "react-parallax-tilt";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "../../UI/Breadcrumbs/Breadcrums.tsx";

interface ServiceType {
    id: string;
    name: string;
}

interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    types: ServiceType[];
}

export const ServicesModule = () => {
    const { data: dataNames, isError: isErrorNames } = useServicesTypesQuery();
    const { data: dataServices, isError: isErrorServices } = useQueryServices();
    const { t } = useTranslation();

    const [activeName, setActiveName] = useState<string>("");
    const nameRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const nameFromUrl = queryParams.get("name");

    useEffect(() => {
        if (nameFromUrl) {
            setActiveName(nameFromUrl);
        } else if (dataNames && dataNames.length > 0) {
            setActiveName(dataNames[0].name);
        }
    }, [dataNames, nameFromUrl]);

    useEffect(() => {
        if (activeName && nameRefs.current[activeName]) {
            nameRefs.current[activeName].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });
        }
    }, [activeName]);

    if (isErrorNames || isErrorServices) return <div>...error</div>;
    if (!Array.isArray(dataNames) || !Array.isArray(dataServices)) return null;

    const filteredServices = activeName
        ? dataServices.filter((service: Service) =>
            service.types.some((type) => type.name === activeName)
        )
        : [];

    return (
        <div>
            <Breadcrumbs currentPage={t("development")} />
            <Typography variant="h2" className={classes.title}>{t("services")}</Typography>
            <div className={classes.caption}>
                {dataNames.map(({ id, name }: ServiceType) => (
                    <div
                        key={id}
                        ref={(el) => (nameRefs.current[name] = el)} // Сохраняем ссылку на элемент
                        onClick={() => setActiveName(name)}
                        className={`${classes.line} ${activeName === name ? classes.active : ''}`}
                    >
                        <Typography variant="smallBody" color="white">
                            {name}
                        </Typography>
                    </div>
                ))}
            </div>

            {filteredServices.length > 0 ? (
                <div className={classes.card}>
                    {filteredServices.map((service: Service) => (
                        <Tilt
                            tiltMaxAngleX={45}
                            tiltMaxAngleY={45}
                            scale={1.05}
                            transitionSpeed={450}
                            key={service.id}
                            className={classes.activeComponent}
                        >
                            <img
                                src={service.icon}
                                alt={service.title || "Иконка"}
                                className={classes.icon}
                            />
                            <Typography variant="body">{service.title}</Typography>
                            <span>{service.description}</span>
                        </Tilt>
                    ))}
                </div>
            ) : (
                <div>
                    <span>
                        Нет данных для выбранного направления
                    </span>
                </div>
            )}
        </div>
    );
};