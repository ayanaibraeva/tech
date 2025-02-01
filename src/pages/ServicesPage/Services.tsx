import {ServicesModule} from "../../modules/ServicesModule/ServicesModule.tsx";
import {MultiContainer} from "../../UI/MultiContainer/MultiContainer.tsx";
import {TechModule} from "../../modules/TechModule/TechModule.tsx";
import {useScrollToTop} from "../../utils/hooks/useScrollToTop.ts";
import {Suspense} from "react";
import {Loader} from "../LoaderPage/Loader.tsx";

export const Services = () => {

    useScrollToTop();

    return (
        <MultiContainer>
            <Suspense fallback={<Loader/>}>
                <ServicesModule/>
                <TechModule/>
            </Suspense>
        </MultiContainer>
    )
}