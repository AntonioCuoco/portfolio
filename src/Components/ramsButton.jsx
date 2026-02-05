// Size configurations for the button
const sizeConfig = {
    default: {
        container: "h-10",
        circle: "h-7",
        padding: "px-3 py-1.5",
        text: "text-sm",
        rounded: "rounded-xl"
    },
    xs: {
        container: "w-12 h-12",
        circle: "w-8 h-8",
        padding: "p-2",
        text: "text-[10px]",
        rounded: "rounded-xl"
    },
    sm: {
        container: "w-16 h-16",
        circle: "w-10 h-10",
        padding: "p-3",
        text: "text-xs",
        rounded: "rounded-xl"
    },
    md: {
        container: "w-20 h-20",
        circle: "w-12 h-12",
        padding: "p-4",
        text: "text-sm",
        rounded: "rounded-xl"
    },
    lg: {
        container: "w-28 h-28",
        circle: "w-16 h-16",
        padding: "p-5",
        text: "text-base",
        rounded: "rounded-xl"
    },
    xl: {
        container: "w-36 h-36",
        circle: "w-20 h-20",
        padding: "p-6",
        text: "text-lg",
        rounded: "rounded-2xl"
    }
};

export default function RamsButton({
    text,
    size = "md",
    textColor = "#EE7B30",
    borderColor = "#e5e5e5",
    className = "",
    elementId,
}) {
    const config = sizeConfig[size] || sizeConfig.md;

    return (
        <button
            className={`
                ${config.container}
                bg-[#f8f8f8]
                ${config.rounded}
                ${config.padding}
                flex items-center justify-center
                cursor-pointer
                transition-all
                duration-200
                hover:scale-[1.02]
                active:scale-[0.98]
                font-bespoke
                ${className}
            `}
            style={{
                border: `1px solid ${borderColor}`
            }}
            onClick={() => document.getElementById(elementId)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })}
        >
            {/* Inner white circle with shadow */}
            <div
                className={`
                    ${config.circle}
                    bg-white
                    rounded-full
                    flex items-center justify-center
                    shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                    px-3
                `}
            >
                {/* Orange text inside */}
                <span
                    className={`${config.text} text-center font-medium leading-tight whitespace-nowrap font-tanker`}
                    style={{ color: textColor }}
                >
                    {text}
                </span>
            </div>
        </button>
    );
}