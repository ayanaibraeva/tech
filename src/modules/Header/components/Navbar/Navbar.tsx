import {SubLinks} from "../Sublinks/SubLinks.tsx";

export const useNavbar = () => {
    return  [
        {
            id: "/about-company",
            title: "O компании",
            href: "/about-company"
        },
        {
            id: "1",
            title: <SubLinks/>,
            href: ""
        },
        {
            id: "portfolio",
            title: "Портфолио",
            href: "/#portfolio"
        },
        {
            id: "contacts",
            title: "Контакты",
            href: "/#contacts"
        },
    ]
}