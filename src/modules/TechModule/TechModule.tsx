import classes from "./TechModule.module.scss";

import { Typography } from "../../UI/Typography/Typography.tsx";
import { useTechTypesQuery } from "./api/useTechTypesQuery.tsx";
import { useTechQuery } from "./api/useTechQuery.tsx";
import { Loader } from "../../pages/LoaderPage/Loader.tsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";


interface TechType {
    id: string;
    name: string;
}

interface Tech {
    id: string;
    icon: string;
    name: string;
    types: TechType[];
}

export const TechModule = () => {
    const { data: techTypes, isLoading: isLoadingTypes, isError: isErrorTypes } = useTechTypesQuery();
    const { data: techData, isLoading: isLoadingTech, isError: isErrorTech } = useTechQuery();
    const { t } = useTranslation();

    const [activeName, setActiveName] = useState<string | undefined>(undefined);

    if (isLoadingTypes || isLoadingTech) return <Loader />;
    if (isErrorTypes || isErrorTech) return <div>Ошибка загрузки данных</div>;
    if (!techData || !techTypes) return null;

    const filteredTech = activeName
        ? techData?.filter((tech: Tech) =>
            tech.types.some((type: TechType) => type.name === activeName)
        )
        : techData || [];

    return (
        <div>
            <div className={classes.title}>
                <Typography variant="h2">{t("technology")}</Typography>
                <Typography variant="h3">{t("technologyP")}</Typography>
            </div>
            <div className={classes.caption}>
                {techTypes?.map(({ id, name }: TechType, index: number) => (
                    <div
                        key={id || `${name}-${index}`}
                        onClick={() => setActiveName(name)}
                    >
                        <button className={activeName === name ? classes.activeButton : ""}>
                            {name}
                        </button>
                    </div>
                ))}
            </div>

            {filteredTech.length > 0 ? (
                <div className={classes.card}>
                    {filteredTech?.map((tech: Tech) => (
                        <div
                            key={tech.id}
                            className={classes.cardContent}
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                            />
                            <span>{tech.name}</span>
                        </div>
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