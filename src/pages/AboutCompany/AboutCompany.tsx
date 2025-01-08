import {MultiContainer} from "../../UI/MultiContainer/MultiContainer.tsx";
import {Counter} from "../../modules/AboutCompanyModule/component/Counter/Counter.tsx";
import {OurTeam} from "../../modules/OurTeamModule/OurTeam.tsx";
import {AboutUsPage} from "../../modules/AboutUsPage/AboutUsPage.tsx";
import {ValuesModule} from "../../modules/ ValuesModule/ ValuesModule.tsx";
import {useScrollToTop} from "../../utils/hooks/useScrollToTop.ts";

export const AboutCompany = () => {

    useScrollToTop()

    return (
        <MultiContainer>
            <AboutUsPage/>
            <Counter/>
            <ValuesModule/>
            <OurTeam/>
        </MultiContainer>
    )
}