import classes from "./Typodraphy.module.scss";

export const Typography = (props: any) => {
    const {
        variant,
        weight,
        children,
        className,
        color,
        truncate = false,
        id,
        textTransform
    }: any = props;

    const Tags = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        button: 'button',
        p: 'p',
        span: 'span',
    };


    const TagName:any = Tags[variant as keyof typeof Tags] || 'p';

    const classNamedGenerated = [
        classes[variant],
        classes[weight],
        classes[color],
        className,
    ]
        .filter(Boolean)
        .join(' ')
        .trim();

    const truncateString = (str: any, maxNumber: number) => {
        if (typeof str === 'string') {
            return str.length <= maxNumber ? str : str.slice(0, maxNumber) + '...';
        }
        return str;
    };

    return (
        <TagName id={id} className={classNamedGenerated} style={{ textTransform }}>
            {!truncate ? children : truncateString(children, truncate)}
        </TagName>
    );
};
