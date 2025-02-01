import {Suspense, useRef} from "react";
import { StorageModule } from "../../modules/FAQModule/component/StorageModule/StorageModule.tsx";
import { Banner } from "../../modules/BannerModule/Banner.tsx";
import { Counter } from "../../modules/AboutCompanyModule/component/Counter/Counter.tsx";
import { AboutUs } from "../../modules/AboutCompanyModule/component/AboutUs/AboutUs.tsx";
import { PortfolioBlock } from "../../modules/PotfolioModule/PortfolioBlock.tsx";
import { OurTeam } from "../../modules/OurTeamModule/OurTeam.tsx";
import { WorksModule } from "../../modules/WorksModule/WorksModule.tsx";
import {Loader} from "../LoaderPage/Loader.tsx";

export const HomePage = () => {

    const ourTeam = useRef<HTMLDivElement | null>(null);

    return (
        <section>
            <Suspense fallback={<Loader/>}>
                <Banner />
                <Counter />
                <AboutUs />
                <WorksModule />
                <PortfolioBlock />
                <div id="ourTeam" ref={ourTeam}>
                    <OurTeam />
                </div>
                <StorageModule />
            </Suspense>
        </section>
    );
};
