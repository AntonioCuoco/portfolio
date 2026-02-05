// Size configurations for masonry elements - responsive
// On mobile (1 col grid), everything spans full width
// On tablet/desktop, uses proper column spans
const sizeConfig = {
    // Standard sizes
    "1x1": "col-span-1 row-span-1",
    "1x2": "col-span-1 row-span-2",
    "2x1": "col-span-1 sm:col-span-2 row-span-1",
    "2x2": "col-span-1 sm:col-span-2 row-span-1 sm:row-span-2",
    // Extended sizes
    "3x1": "col-span-1 sm:col-span-2 lg:col-span-3 row-span-1",
    "3x2": "col-span-1 sm:col-span-2 lg:col-span-3 row-span-1 sm:row-span-2",
    "4x2": "col-span-1 sm:col-span-2 lg:col-span-4 row-span-1 sm:row-span-2",
};

export default function MasonryElement({
    title,
    subtitle,
    size = "1x1",
    children,
    className = "",
    contentClassName = "",
    onClick
}) {
    const gridSize = sizeConfig[size] || sizeConfig["1x1"];

    return (
        <div
            className={`
                ${gridSize}
                bg-white
                rounded-[16px] md:rounded-[24px]
                p-4 md:p-6
                flex flex-col
                shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]
                transition-shadow
                duration-300
                overflow-hidden
                ${onClick ? 'cursor-pointer' : ''}
                ${className}
            `}
            onClick={onClick}
        >
            {/* Header section with title and subtitle */}
            {(title || subtitle) && (
                <div className="mb-3 md:mb-4">
                    {title && (
                        <h3 className="text-[#040404] font-bespoke font-semibold text-base md:text-lg">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-[#6b6b6b] font-bespoke text-xs md:text-sm mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {/* Content area - receives children */}
            <div className={`flex-1 overflow-auto ${contentClassName}`}>
                {children}
            </div>
        </div>
    );
}
