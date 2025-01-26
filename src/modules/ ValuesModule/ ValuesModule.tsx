import classes from "./ValuesModule.module.scss";

import { useValuesQuery } from "./api/useValuesQuery";
import { Loader } from "../../pages/LoaderPage/Loader";
import { MultiContainer } from "../../UI/MultiContainer/MultiContainer";
import { Typography } from "../../UI/Typography/Typography";
import { useTranslation } from "react-i18next";
import { UseQueryResult } from "@tanstack/react-query";

type ValueType = {
    id: string | number;
    title: string;
    text: string;
};

export const ValuesModule = () => {
    const { data, isLoading, error }: UseQueryResult<ValueType[], Error> = useValuesQuery();

    const { t } = useTranslation();

    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <MultiContainer>
            <Typography variant="h2" className={classes.valuesHeading}>
                {t("values")}
            </Typography>
            <div className={classes.values}>
                {data.map((item: ValueType) => (
                    <div key={item.id} className={classes.valuesContent}>
                        <ul>
                            <li className={classes.valuesTitle}>{item.title}</li>
                        </ul>
                        <Typography variant="body" className={classes.valuesText}>
                            {item.text}
                        </Typography>
                    </div>
                ))}
            </div>
        </MultiContainer>
    );
};
