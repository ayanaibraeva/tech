import classes from "./ServicesModule.module.scss";

import { useEffect, useState } from "react";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { useServicesTypesQuery } from "../Header/api/useServicesTypesQuery.tsx";
import { useQueryServices } from "./api/useQueryServices.tsx";
import { Tilt } from "react-tilt";
import { Loader } from "../../pages/LoaderPage/Loader.tsx";
import { useLocation } from "react-router-dom";

export const ServicesModule = () => {

    const { data: dataNames, isLoading: isLoadingNames, isError: isErrorNames } = useServicesTypesQuery();
    const { data: dataServices, isLoading: isLoadingServices, isError: isErrorServices } = useQueryServices();

    const [activeName, setActiveName] = useState("");

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

    if (isLoadingNames || isLoadingServices) return <Loader />;
    if (isErrorNames || isErrorServices) return <div>Ошибка загрузки данных</div>;

    const filteredServices = activeName
        ? dataServices?.filter((service) =>
            service.types.some((type) => type.name === activeName)
        )
        : [];

    return (
        <div>
            <Typography variant="h2" className={classes.title}>Услуги</Typography>
            <div className={classes.caption}>
                {dataNames?.map(({ id, name }) => (
                    <div
                        key={id}
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
                    {filteredServices.map((service) => (
                        <Tilt
                            options={{
                                max: 45,
                                scale: 1,
                                speed: 450
                            }}
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
