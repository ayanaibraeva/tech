import {FC} from "react";

interface ChevronProps {
    width?: string | number;
    height?: string | number;
    color?: string;
    className?: string;
}
export const ChevronDown:FC<ChevronProps> = ({ width, height, color, className }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M26.2505 12.1284L18.0005 20.3784L9.75052 12.1284L7.62952 14.2494L18.0005 24.6204L28.3715 14.2494L26.2505 12.1284Z"
                fill={color}
            />
        </svg>
    )
}