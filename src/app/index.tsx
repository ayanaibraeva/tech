import {RouterProvider} from "react-router-dom";
import {router} from "./Router/Router.tsx";
import "../UI/Typography/fonts/stylesheet.css"
export const App = () => {
    return <RouterProvider router={router} />
}