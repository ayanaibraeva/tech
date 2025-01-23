import * as React from 'react';
import classes from "./FormInput.module.scss";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    placeholder?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    id?: string;
    signature?: string;
    htmlFor?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({
     type,
     placeholder,
     value,
     onChange,
     id,
     signature,
     htmlFor,
     ...rest
 }, ref) => {
    return (
        <div className={classes.form}>
            <label htmlFor={htmlFor}>{signature}</label>
            <input
                className={classes.formInput}
                type={type}
                placeholder={placeholder}
                ref={ref}
                value={value}
                onChange={onChange}
                id={id}
                {...rest}
            />
        </div>
    );
});

FormInput.displayName = "TextInput";