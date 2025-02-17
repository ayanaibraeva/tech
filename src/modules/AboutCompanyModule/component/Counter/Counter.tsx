import classes from "./Counter.module.scss";

import {MultiContainer} from "../../../../UI/MultiContainer/MultiContainer.tsx";
import {useCounterQuery} from "../../api/useCounterQuery.tsx";
import CountUp from "react-countup";
import {useEffect, useState} from "react";
import {Typography} from "../../../../UI/Typography/Typography.tsx";
import { useInView } from 'react-intersection-observer';
import {Loader} from "../../../../pages/LoaderPage/Loader.tsx";

export const Counter = () => {
    const { ref, inView } = useInView({ triggerOnce: true });

    const { data, error, isLoading } = useCounterQuery();
    const [counterOn, setCounterOn] = useState(false);

    useEffect(() => {
        if (inView) setCounterOn(true);
    }, [inView]);

    if(isLoading) return <Loader/>
    if (error) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <MultiContainer>
            <div ref={ref} className={classes.counter}>
                {counterOn && data[0]?.details.map((item) => (
                    <div key={item.id} className={classes.counterCard}>
                        <span>
                            <CountUp start={0} end={item.volume} duration={2} delay={0} />
                            {item.sign}
                        </span>
                        <Typography variant="body" className={classes.title}>{item.title}</Typography>
                        <Typography variant="extraSmallBody">{item.description}</Typography>
                    </div>
                ))}
            </div>
        </MultiContainer>
    );
};
