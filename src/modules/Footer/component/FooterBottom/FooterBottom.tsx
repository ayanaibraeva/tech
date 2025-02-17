import classes from "./FooterBottom.module.scss";

import { useFooterQuery } from "../../api/useFooterQuery.tsx";
import { NumberIcon } from "../../../../assets/Icons/NumberIcon.tsx";
import { ScheduleIcon } from "../../../../assets/Icons/ScheduleIcon.tsx";


interface FooterItem {
    work_schedule?: string;
    phone_number?: string;
}

export const FooterBottom = () => {
    const { data, error } = useFooterQuery();

    if (error) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <div>
            {
                data.map((item: FooterItem, id: number) => (
                    <div key={id} className={classes.footerBottom}>
                        {item.work_schedule && (
                            <span className={classes.icons}>
                                <ScheduleIcon />
                                {item.work_schedule}
                            </span>
                        )}
                        {item.phone_number && (
                            <a
                                className={classes.icons}
                                href={`tel:${item.phone_number}`}
                            >
                                <NumberIcon />
                                {item.phone_number}
                            </a>
                        )}
                    </div>
                ))
            }
        </div>
    );
};