import {PATH} from "../../utils/constants/constants.ts";
import {createBrowserRouter} from "react-router-dom";
import {Layout} from "../Layout/Layout.tsx";
import {loadComponent} from "../../utils/helpers/helpers.ts";


const HomePage = loadComponent(() => import('../../pages/HomePage/HomePage.tsx'), 'HomePage',)
const Services = loadComponent(() => import('../../pages/ServicesPage/Services.tsx'), 'Services',)
const AboutCompany = loadComponent(() => import('../../pages/AboutCompany/AboutCompany.tsx'), 'AboutCompany',)
const NotFoundPage = loadComponent(() => import('../../pages/NotFoundPage/NotFoundPage.tsx'), 'NotFoundPage',)

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: PATH.home,
                element: <HomePage/>
            },
            {
                path: PATH.services,
                element: <Services/>
            },
            {
                path: PATH.aboutCompany,
                element: <AboutCompany/>
            },
            {
                path: PATH.notFoundPage,
                element: <NotFoundPage/>
            }
        ]
    }
])