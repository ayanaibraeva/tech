import 'react-i18next';

declare module 'react-i18next' {
    interface DefaultResourcesType {
        translation: {
            values: string;
            [key: string]: string | undefined;
        };
    }
}