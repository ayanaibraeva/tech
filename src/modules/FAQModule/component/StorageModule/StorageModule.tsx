import classes from "./StorageModule.module.scss";

import React, { useRef, useState } from "react";
import { Typography } from "../../../../UI/Typography/Typography.tsx";
import { ApplicationForm } from "../ApplicationForm/ApplicationForm.tsx";
import { MultiContainer } from "../../../../UI/MultiContainer/MultiContainer.tsx";
import { Faq } from "../Faq/Faq.tsx";
import { useQuestionsQuery } from "../../api/useQuestionsQuery.tsx";
import { Loader } from "../../../../pages/LoaderPage/Loader.tsx";
import { useTranslation } from "react-i18next";


export const StorageModule: React.FC = () => {
    const { t } = useTranslation();

    const components = [
        { id: 1, Component: Faq, label: t("faq.question"), title: t("faq.faq") },
        { id: 2, Component: ApplicationForm, label: t("faq.bid"), title: t("faq.bid") },
    ];

    const { data, isLoading, error } = useQuestionsQuery();

    const faqRef = useRef<HTMLDivElement>(null);

    const [activeComponent, setActiveComponent] = useState<number>(1);

    const ActiveComponent = components.find((comp) => comp.id === activeComponent)?.Component;
    const activeTitle = components.find((comp) => comp.id === activeComponent)?.title;

    if (isLoading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <MultiContainer>
            <Typography id="faq" ref={faqRef} variant="h2" color="white" className={classes.title}>
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
                    {ActiveComponent && <ActiveComponent />}
                </div>
            </div>
        </MultiContainer>
    );
};