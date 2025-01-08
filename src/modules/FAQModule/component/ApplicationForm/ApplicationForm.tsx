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
                toast.success("Форма успешно отправлена!", { position: "top-right" });
                reset();
            },
            onError: () => {
                toast.error("Ошибка отправки формы. Пожалуйста, попробуйте снова.", { position: "top-right" });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <ToastContainer />
            <div className={classes.formInput}>
                <Typography htmlFor="name" color="black" variant="body">ФИО*</Typography>
                <FormInput
                    id="name"
                    type="text"
                    placeholder="Напишите"
                    {...register("name", { required: "Это поле обязательное" })}
                />
                <div className={classes.errors}>
                    <Typography variant="span">
                        {errors?.name && errors.name.message}
                    </Typography>
                </div>
            </div>
            <div className={classes.formInput}>
                <Typography htmlFor="company_name" color="black" variant="body">Название компании:</Typography>
                <FormInput
                    id="company_name"
                    type="text"
                    placeholder="Напишите"
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
                    placeholder="Напишите"
                    {...register("phone_number", {
                        required: "Это поле обязательное",
                        pattern: {
                            value: /^[^a-zA-Z\u0400-\u04FF]+$/,
                            message: "Введите корректный номер телефона (например, +123 456 7890)"
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
                <Typography htmlFor="phone_number" color="black" variant="body">Описание:</Typography>
                <textarea
                    className={classes.formArea}
                    id="description"
                    placeholder="Напишите"
                    {...register("description")}
                />
            </div>
            <button type="submit" disabled={isLoading} className={classes.submitButton}>
                {isLoading ? "Отправка..." : "Отправить"}
            </button>
        </form>
    );
};
