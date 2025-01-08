import {StorageModule} from "../../modules/FAQModule/component/StorageModule/StorageModule.tsx";
import {Banner} from "../../modules/BannerModule/Banner.tsx";
import {Counter} from "../../modules/AboutCompanyModule/component/Counter/Counter.tsx";
import {AboutUs} from "../../modules/AboutCompanyModule/component/AboutUs/AboutUs.tsx";
import {PortfolioBlock} from "../../modules/PotfolioModule/PortfolioBlock.tsx";
import {OurTeam} from "../../modules/OurTeamModule/OurTeam.tsx";
import {WorksModule} from "../../modules/WorksModule/WorksModule.tsx";
import {useRef} from "react";
export const HomePage = () => {

    const ourTeam = useRef();

    return (
        <div>
            <Banner/>
            <Counter/>
            <AboutUs/>
            <WorksModule/>
            <PortfolioBlock/>
            <div id="ourTeam" ref={ourTeam}>
                <OurTeam/>
            </div>
            <StorageModule/>
        </div>
    )
}