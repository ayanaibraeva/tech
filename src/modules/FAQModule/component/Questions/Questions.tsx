import classes from "./Questions.module.scss";

import { createContext, useEffect, useState, ReactNode } from "react";

export const QuestionsContext = createContext({});

interface QuestionsProps {
    children: ReactNode;
    value: any;
    onChange?: (selected: any) => void;
    [key: string]: any;
}

export const Questions = ({ children, value, onChange, ...props }: QuestionsProps) => {
    const [selected, setSelected] = useState(value);

    useEffect(() => {
        onChange?.(selected);
    }, [selected, onChange]);

    return (
        <div className={classes.accordionBlock}>
            <ul {...props} className={classes.accordion}>
                <QuestionsContext.Provider value={{ selected, setSelected }}>
                    {children}
                </QuestionsContext.Provider>
            </ul>
        </div>
    );
};