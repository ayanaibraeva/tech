import classes from "./StorageModule.module.scss"

import {FC, useRef, useState} from "react";
import { Typography } from "../../../../UI/Typography/Typography.tsx";
import { ApplicationForm } from "../ApplicationForm/ApplicationForm.tsx";
import { MultiContainer } from "../../../../UI/MultiContainer/MultiContainer.tsx";
import {Faq} from "../Faq/Faq.tsx";
import {useQuestionsQuery} from "../../api/useQuestionsQuery.tsx";
import {Loader} from "../../../../pages/LoaderPage/Loader.tsx";

interface ComponentItem {
    id: number;
    Component:FC;
    label: string;
    title: string;
}

const components: ComponentItem[] = [
    { id: 1, Component: Faq, label: "Вопросы", title: "Часто задаваемые вопросы" },
    { id: 2, Component: ApplicationForm, label: "Оставить заявку", title: "Оставить заявку" },
];
export const StorageModule:FC = () => {

    const {data, loading, error} = useQuestionsQuery();
    const faq = useRef();

    const [activeComponent, setActiveComponent] = useState<number>(1);

    const ActiveComponent = components.find((comp) => comp.id === activeComponent)?.Component;
    const activeTitle = components.find((comp) => comp.id === activeComponent)?.title;

    if(loading) return <Loader/>
    if(error) return <div>...error</div>
    if(!data) return null

    return (
        <MultiContainer>
            <Typography id="faq" ref={faq} variant="h2" color="white" className={classes.title}>
                {activeTitle}
            </Typography>
            <div>
                <div className={classes.caption}>
                    {components.map(({ id, label }) => (
                        <div
                            key={id}
                            onClick={() => setActiveComponent(id)}
                            className={classes.line}
                        >
                            <Typography
                                variant="h3"
                                color={activeComponent === id ? "activeColor" : "white"}
                            >
                                {label}
                            </Typography>
                            <div
                                className={`${classes.indicator} ${
                                    activeComponent === id ? classes.activeIndicator : classes.inactiveIndicator
                                }`}
                            />
                        </div>
                    ))}
                </div>
                <div className={classes.activeComponent}>
                    <ActiveComponent />
                </div>
            </div>
        </MultiContainer>
    );
};
