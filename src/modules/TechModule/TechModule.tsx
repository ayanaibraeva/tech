import classes from "./TechModule.module.scss";

import React, { useState, useRef, useCallback } from "react";
import { Typography } from "../../UI/Typography/Typography.tsx";
import { useTechTypesQuery } from "./api/useTechTypesQuery.tsx";
import { useTechQuery } from "./api/useTechQuery.tsx";
import { Loader } from "../../pages/LoaderPage/Loader.tsx";
import { useTranslation } from "react-i18next";

interface TechType {
    name: string;
}

interface TechItem {
    id: string;
    name: string;
    icon?: string;
    types?: TechType[];
}

const useDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (ref.current) {
            isDragging.current = true;
            startX.current = e.pageX - ref.current.offsetLeft;
            scrollLeft.current = ref.current.scrollLeft;
            ref.current.style.cursor = "grabbing";
        }
    }, [ref]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current || !ref.current) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        const scroll = (x - startX.current) * 2;
        ref.current.scrollLeft = scrollLeft.current - scroll;
    }, [ref]);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        if (ref.current) {
            ref.current.style.cursor = "grab";
        }
    }, [ref]);

    const handleMouseLeave = useCallback(() => {
        if (isDragging.current) {
            isDragging.current = false;
            if (ref.current) ref.current.style.cursor = "grab";
        }
    }, [ref]);

    return { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave };
};

export const TechModule = () => {
    const {
        data: techTypes,
        isError: isErrorTypes,
        isLoading: isLoadingTypes
    } = useTechTypesQuery();

    const {
        data: techData,
        isError: isErrorTech,
        isLoading: isLoadingTech
    } = useTechQuery();

    const { t } = useTranslation();

    const [activeName, setActiveName] = useState<string>("Все");
    const captionRef = useRef<HTMLDivElement | null>(null);

    const {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave
    } = useDragScroll(captionRef);

    if (isLoadingTech || isLoadingTypes) return <Loader />;
    if (isErrorTypes || isErrorTech) return <div>...error</div>;

    const types: TechType[] = techTypes ?? [];
    const techItems: TechItem[] = techData ?? [];

    const filteredTech = activeName === "Все"
        ? techItems
        : techItems.filter((tech: TechItem) =>
            tech.types?.some((type: TechType) => type.name === activeName)
        );

    const handleTypeClick = (typeName: string) => {
        setActiveName(typeName);
        if (captionRef.current) {
            const clickedButton = Array.from(captionRef.current.children).find(child => {
                const button = child.querySelector('button');
                return button && button.textContent === typeName;
            });
            if (clickedButton) {
                const rect = clickedButton.getBoundingClientRect();
                const containerRect = captionRef.current.getBoundingClientRect();
                if (rect.right > containerRect.right || rect.left < containerRect.left) {
                    clickedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        }
    };

    const handleShowAll = () => {
        setActiveName("Все");
    };

    return (
        <div>
            <div className={classes.title}>
                <Typography variant="h2">{t("technology")}</Typography>
                <Typography variant="h3">{t("technologyP")}</Typography>
            </div>
            <div
                className={classes.caption}
                ref={captionRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <div onClick={handleShowAll}>
                    <button className={activeName === "Все" ? classes.activeButton : ""}>
                        Все
                    </button>
                </div>
                {types.map((type, index) => (
                    <div key={index} onClick={() => handleTypeClick(type.name)}>
                        <button className={activeName === type.name ? classes.activeButton : ""}>
                            {type.name}
                        </button>
                    </div>
                ))}
            </div>

            {filteredTech.length > 0 ? (
                <div className={classes.card}>
                    {filteredTech.map(tech => (
                        <div key={tech.id} className={classes.cardContent}>
                            <img src={tech.icon || "placeholder.png"} alt={tech.name || "Technology"} />
                            <span>{tech.name}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <span>Нет данных для выбранного направления</span>
                </div>
            )}
        </div>
    );
};