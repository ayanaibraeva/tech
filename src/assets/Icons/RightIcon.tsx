import {FC} from "react";

interface RightIconProps {
    width?: string | number;
    height?: string | number;
    color?: string;
}

export const RightIcon:FC<RightIconProps> = ({ width, height, color }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 10.0648 18.0081"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path
                id="Vector"
                d="M1 1L9 9L1 17"
                stroke={color}
                strokeOpacity="1.000000"
                strokeWidth="2.000000"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>

    )
}