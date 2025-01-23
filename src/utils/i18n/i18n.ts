import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";


// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import translationEN from './locales/en/translation.json';
// import translationRU from './locales/ru/translation.json';

// export const resources = {
//     en: { translation: translationEN },
//     ru: { translation: translationRU },
// } as const;
//
// i18n.use(initReactI18next).init({
//     resources,
//     lng: 'en', // Default language
//     interpolation: {
//         escapeValue: false, // React already escapes values
//     },
// });
//
// export default i18n;

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(Backend)
    .init({
        debug: true,
        fallbackLng: "ru",
        returnObjects: true,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}.json',
        }
    });

export default i18n;