import classes from "./Questions.module.scss"

import {createContext, useEffect, useState} from "react";
export const QuestionsContext = createContext({});
export const Questions = ({children, value, onChange, ...props}) => {


    const [selected, setSelected] = useState(value);

    useEffect(() => {
        onChange?.(selected)
    }, [selected]);


    return (
        <div className={classes.accordionBlock}>
            <ul {...props} className={classes.accordion}>
                <QuestionsContext.Provider value={{selected, setSelected}}>
                    {children}
                </QuestionsContext.Provider>
            </ul>
        </div>
    )
}
