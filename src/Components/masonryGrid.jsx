// Column configurations - responsive
const columnConfig = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

// Gap configurations
const gapConfig = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-4 md:gap-6",
    xl: "gap-4 md:gap-6 lg:gap-8",
};

export default function MasonryGrid({
    children,
    columns = 4,
    gap = "md",
    rowHeight = "120px",
    className = ""
}) {
    const gridCols = columnConfig[columns] || columnConfig[4];
    const gridGap = gapConfig[gap] || gapConfig.md;

    return (
        <div
            className={`
                grid
                ${gridCols}
                ${gridGap}
                ${className}
            `}
            style={{
                gridAutoRows: rowHeight
            }}
        >
            {children}
        </div>
    );
}