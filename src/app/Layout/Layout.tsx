import { Header } from "../../modules/Header/Header.tsx";
import { Footer } from "../../modules/Footer/Footer.tsx";
import {Outlet} from "react-router-dom";
import {useScrollToHash} from "../../utils/hooks/useScrollToHash.tsx";

export const Layout = () => {

    useScrollToHash();

    return (
        <>
            <Header/>
                <Outlet/>
            <Footer/>
        </>
    )
}