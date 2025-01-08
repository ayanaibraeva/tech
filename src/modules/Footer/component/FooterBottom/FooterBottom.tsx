import classes from "./FooterBottom.module.scss";

import { Loader } from "../../../../pages/LoaderPage/Loader.tsx";
import { useFooterQuery } from "../../api/useFooterQuery.tsx";
import {NumberIcon} from "../../../../assets/Icons/NumberIcon.tsx";
import {ScheduleIcon} from "../../../../assets/Icons/ScheduleIcon.tsx";
export const FooterBottom = () => {

    const { data, loading, error } = useFooterQuery();

    if (loading) return <Loader />;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <div>
            {
                data?.map((item) =>
                    <div key={item.id} className={classes.footerBottom} >
                        {item.work_schedule && (
                            <a className={classes.icons}>
                                <ScheduleIcon/>
                                {item.work_schedule}
                            </a>
                        )}
                        {item.phone_number && (
                            <a
                                className={classes.icons}
                                href={`tel:${item.phone_number}`}  // добавляем префикс "tel:"
                            >
                                <NumberIcon/>
                                {item.phone_number}
                            </a>
                        )}
                    </div>
                )
            }
        </div>
    );
};
