import classes from "./ValuesModule.module.scss";

import {useValuesQuery} from "./api/useValuesQuery.tsx";
import {Loader} from "../../pages/LoaderPage/Loader.tsx";
import {MultiContainer} from "../../UI/MultiContainer/MultiContainer.tsx";
import {Typography} from "../../UI/Typography/Typography.tsx";

export const ValuesModule = () => {

    const { data, loading, error } = useValuesQuery();

    if (loading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <MultiContainer>
            <Typography variant="h2" className={classes.valuesHeading}>Наши основные ценности</Typography>
            <div className={classes.values}>
                {
                    data.map((item) =>
                        <div className={classes.valuesContent}>
                            <ul>
                                <li className={classes.valuesTitle}>{item.title}</li>
                            </ul>
                            <Typography variant="body" className={classes.valuesText}>{item.text}</Typography>
                        </div>
                    )
                }
            </div>
        </MultiContainer>
    )
}