import React, { ReactNode } from 'react';
import classes from "./MultiContainer.module.scss";

interface MultiContainerProps {
    children: ReactNode;
}

export const MultiContainer: React.FC<MultiContainerProps> = ({ children }) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};