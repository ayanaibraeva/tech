import {ComponentType, lazy} from "react";

export const loadComponent = (
    path: () => Promise<{ [key: string]:ComponentType<any> }>,
    componentName: string
) => {
    return lazy(() =>
        path().then((module) => ({ default: module[componentName] }))
    );
};