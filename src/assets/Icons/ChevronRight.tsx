import {FC} from "react";

interface ChevronRightProps {
    width?: string | number;
    height?: string | number;
    color?: string;
    className?: string;
}
export const ChevronRight:FC<ChevronRightProps> = ({color, width, height, className}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g
                id="solar:chevron-down">
                <path
                    id="Vector"
                    d="M8.08594 6.50006L13.5859 12.0001L8.08594 17.5001L9.49994 18.9141L16.4139 12.0001L9.49994 5.08606L8.08594 6.50006Z"
                    fill={color}
                />
            </g>
        </svg>

    )
}