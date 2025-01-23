import classes from "./QuestionItem.module.scss";

import React, { useContext, useRef } from "react";
import { QuestionsContext } from "../Questions/Questions.tsx";
import { Typography } from "../../../../UI/Typography/Typography.tsx";
import { ChevronDown } from "../../../../assets/Icons/ChevronDown.tsx";


interface QuestionItemProps {
    children: React.ReactNode;
    value: string;
    trigger: string;
    [key: string]: any;
}


interface QuestionsContextType {
    selected: string | null;
    setSelected: (value: string | null) => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ children, value, trigger, ...props }) => {
    const { selected, setSelected } = useContext(QuestionsContext) as QuestionsContextType;
    const ref = useRef<HTMLDivElement | null>(null);
    const open = selected === value;

    return (
        <li className={classes["accordion-item"]} {...props}>
            <div
                role="button"
                onClick={() => setSelected(open ? null : value)}
                className={classes["header"]}
            >
                <Typography variant="h4">
                    {trigger}
                </Typography>
                <div>
                    <ChevronDown
                        width="36px"
                        height="36px"
                        color="white"
                        className={`${classes["chevron"]} ${open ? classes["open"] : ""}`}
                    />
                </div>
            </div>
            <div
                className={`${classes["content-wrapper"]} ${open ? classes["open"] : ""}`}
                style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
            >
                <div className={classes["content"]} ref={ref}>
                    {children}
                </div>
            </div>
        </li>
    );
};