import  { useState } from "react";

export const ChevronDownHover = ({ width, height, defaultColor, hoverColor, className }) => {
    const [color, setColor] = useState(defaultColor);

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            onMouseEnter={() => setColor(hoverColor)}
            onMouseLeave={() => setColor(defaultColor)}
        >
            <path
                d="M26.2505 12.1284L18.0005 20.3784L9.75052 12.1284L7.62952 14.2494L18.0005 24.6204L28.3715 14.2494L26.2505 12.1284Z"
                style={{
                    fill: color,
                    transition: "fill 0.5s ease"
                }}
            />
        </svg>
    );
};
