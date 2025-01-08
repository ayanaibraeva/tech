import classes from "./MultiContainer.module.scss";

export const MultiContainer = ({children}) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    )
}