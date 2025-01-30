import { Header } from "../../modules/Header/Header.tsx";
import { Footer } from "../../modules/Footer/Footer.tsx";
import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import {useScrollToHash} from "../../utils/hooks/useScrollToHash.tsx";
import {Loader} from "../../pages/LoaderPage/Loader.tsx";


export const Layout = () => {

    useScrollToHash();

    return (
        <>
            <Header/>
            <Suspense fallback={<Loader />}>
                <Outlet/>
            </Suspense>
            <Footer/>
        </>
    )
}