import {ServicesModule} from "../../modules/ServicesModule/ServicesModule.tsx";
import {MultiContainer} from "../../UI/MultiContainer/MultiContainer.tsx";
import {TechModule} from "../../modules/TechModule/TechModule.tsx";
import {useScrollToTop} from "../../utils/hooks/useScrollToTop.ts";

export const Services = () => {

    useScrollToTop();

    return (
        <MultiContainer>
            <ServicesModule/>
            <TechModule/>
        </MultiContainer>
    )
}