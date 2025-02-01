import classes from "./TechModule.module.scss";

import { Typography } from "../../UI/Typography/Typography.tsx";
import { useTechTypesQuery } from "./api/useTechTypesQuery.tsx";
import { useTechQuery } from "./api/useTechQuery.tsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {Loader} from "../../pages/LoaderPage/Loader.tsx";

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
    const { data: techTypes, isError: isErrorTypes, isLoading: isLoadingTypes } = useTechTypesQuery();
    const { data: techData, isError: isErrorTech, isLoading: isLoadingTech } = useTechQuery();
    const { t } = useTranslation();

    const [activeName, setActiveName] = useState<string | undefined>(undefined);

    if(isLoadingTech || isLoadingTypes) return <Loader/>
    if (isErrorTypes || isErrorTech) return <div>...error</div>;
    const types = Array.isArray(techTypes) ? techTypes : [];
    const techItems = Array.isArray(techData) ? techData : [];

    const filteredTech = activeName
        ? techItems.filter((tech: Tech) =>
            tech.types?.some((type: TechType) => type.name === activeName)
        )
        : techItems;

    return (
        <div>
            <div className={classes.title}>
                <Typography variant="h2">{t("technology")}</Typography>
                <Typography variant="h3">{t("technologyP")}</Typography>
            </div>
            <div className={classes.caption}>
                {types.map((type, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveName(type.name)}
                    >
                        <button className={activeName === type.name ? classes.activeButton : ""}>
                            {type.name}
                        </button>
                    </div>
                ))}
            </div>

            {filteredTech.length > 0 ? (
                <div className={classes.card}>
                    {filteredTech.map((tech: Tech) => (
                        <div
                            key={tech.id}
                            className={classes.cardContent}
                        >
                            <img
                                src={tech.icon || "placeholder.png"}
                                alt={tech.name || "Technology"}
                            />
                            <span>{tech.name}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <span>Нет данных для выбранного направления</span>
                </div>
            )}
        </div>
    );
};