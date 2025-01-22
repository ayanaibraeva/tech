import classes from "./ApplicationForm.module.scss";

import { Typography } from "../../../../UI/Typography/Typography.tsx";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput.tsx";
import { useFormQuery } from "../../api/useFormQuery.tsx";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ApplicationForm = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" });
    const { mutate, isLoading } = useFormQuery();

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: () => {
                toast.success(`${t("faq.toastForm")}`, { position: "top-right" });
                reset();
            },
            onError: () => {
                toast.error(`${t("faq.toastFormError")}`, { position: "top-right" });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <ToastContainer />
            <div className={classes.formInput}>
                <Typography htmlFor="name" color="black" variant="body">{t("faq.fio")}*</Typography>
                <FormInput
                    id="name"
                    type="text"
                    placeholder={t("faq.write")}
                    {...register("name",
                        { required: `${t("faq.requiredField")}` })}
                />
                <div className={classes.errors}>
                    <Typography variant="span">
                        {errors?.name && errors.name.message}
                    </Typography>
                </div>
            </div>
            <div className={classes.formInput}>
                <Typography htmlFor="company_name" color="black" variant="body">{t("faq.company")}:</Typography>
                <FormInput
                    id="company_name"
                    type="text"
                    placeholder={t("faq.write")}
                    {...register("company_name")}
                />
            </div>
            <div className={classes.formInput}>
                <Typography htmlFor="phone_number" color="black" variant="body">
                    {t("form.number")}
                </Typography>
                <FormInput
                    id="phone_number"
                    type="tel"
                    placeholder={t("faq.write")}
                    {...register("phone_number", {
                        required: `${t("faq.requiredField")}`,
                        pattern: {
                            value: /^[^a-zA-Z\u0400-\u04FF]+$/,
                            message: `${t("faq.correctNumber")}`
                        }
                    })}
                />
                <div className={classes.errors}>
                    <Typography variant="span">
                        {errors?.phone_number && errors.phone_number.message}
                    </Typography>
                </div>
            </div>
            <div className={classes.formInput}>
                <Typography htmlFor="phone_number" color="black" variant="body">{t("faq.description")}:</Typography>
                <textarea
                    className={classes.formArea}
                    id="description"
                    placeholder={t("faq.write")}
                    {...register("description")}
                />
            </div>
            <button type="submit" disabled={isLoading} className={classes.submitButton}>
                <Typography color="white" variant="h4" >{t("faq.send")}</Typography>
            </button>
        </form>
    );
};
