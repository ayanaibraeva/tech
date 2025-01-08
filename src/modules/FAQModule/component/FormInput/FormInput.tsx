import * as React from 'react';
import classes from "./FormInput.module.scss";


export const FormInput = React.forwardRef(({
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
