import classes from "./Counter.module.scss";

import {MultiContainer} from "../../../../UI/MultiContainer/MultiContainer.tsx";
import {useCounterQuery} from "../../api/useCounterQuery.tsx";
import CountUp from "react-countup";
import {useState} from "react";
import ScrollTrigger from "react-scroll-trigger";
import {Typography} from "../../../../UI/Typography/Typography.tsx";
import {Loader} from "../../../../pages/LoaderPage/Loader.tsx";
export const Counter = () => {

    const {data, loading, error} = useCounterQuery();
    const [counterOn, setCounterOn] = useState(false);

    if(loading) return <Loader/>
    if(error) return <div>...error</div>
    if(!data) return null

    return (
        <MultiContainer>
            <ScrollTrigger onEnter={() => setCounterOn(true)}>
                <div className={classes.counter}>
                    {
                        counterOn && data[0]?.details.map((item) =>
                            <div
                                key={item.id}
                                className={classes.counterCard}
                            >
                                <span>
                                    <CountUp
                                        key={item.id}
                                        start={0}
                                        end={item.volume}
                                        duration={2}
                                        delay={0}
                                    />
                                    {item.sign}
                                </span>
                                <Typography variant="body" className={classes.title}>{item.title}</Typography>
                                <Typography variant="extraSmallBody">{item.description}</Typography>
                            </div>
                        )}
                </div>
            </ScrollTrigger>
        </MultiContainer>
    )
}