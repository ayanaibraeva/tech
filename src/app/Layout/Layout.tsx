import { Header } from "../../modules/Header/Header.tsx";
import { Footer } from "../../modules/Footer/Footer.tsx";
import {Outlet} from "react-router-dom";
import {useScrollToHash} from "../../utils/hooks/useScrollToHash.tsx";
import {ButtonToTop} from "../../UI/ButtonToTop/ButtonToTop.tsx";

export const Layout = () => {

    useScrollToHash();

    return (
        <>
            <Header/>
                <main>
                    <Outlet/>
                </main>
            <ButtonToTop/>
            <Footer/>
        </>
    )
}