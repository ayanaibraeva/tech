import classes from "./QuestionItem.module.scss";

import {useContext, useRef} from "react";
import {QuestionsContext} from "../Questions/Questions.tsx";
import {Typography} from "../../../../UI/Typography/Typography.tsx";
import {ChevronDown} from "../../../../assets/Icons/ChevronDown.tsx";

export const QuestionItem = ({ children, value, trigger, ...props}) => {

    const {selected, setSelected} = useContext(QuestionsContext);
    const ref = useRef(null);
    const open = selected === value;

    return (
        <li className={classes["accordion-item"]} {...props}>
            <div
                role="button"
                onClick={() => setSelected(open ? null : value)}
                className={classes["header"]}
            >
                <Typography variant="h4" >
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
    )
}