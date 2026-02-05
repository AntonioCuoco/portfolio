import { useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { useState } from "react";

export default function Slider({ imgList, imageShownNumber = 1, title, subtitle }) {
    const navigate = useNavigate();
    const [hoveredId, setHoveredId] = useState(null);

    const handleProjectClick = (project) => {
        // Extract slug from the project - if it doesn't have one, create from title
        const slug = project.slug || project.title.toLowerCase().replace(/\s+/g, '-');
        navigate(`/project/${slug}`);
    };

    // Responsive grid classes based on imageShownNumber
    const getResponsiveGrid = (num) => {
        switch (num) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-1 sm:grid-cols-2";
            case 3:
                return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
            case 4:
                return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
            default:
                return "grid-cols-1 sm:grid-cols-2";
        }
    };

    return (
        <div className="w-full">
            {title && <h1 className="text-xl md:text-2xl font-bold mb-2">{title}</h1>}
            {subtitle && <h2 className="text-base md:text-lg text-gray-400 mb-4">{subtitle}</h2>}

            {/* 
                Grid container responsive:
                - Mobile: 1 colonna
                - Tablet: 2 colonne
                - Desktop: N colonne (da imageShownNumber)
            */}
            <div className={`grid ${getResponsiveGrid(imageShownNumber)} gap-4 md:gap-6`}>
                {imgList?.map((img) => (
                    <div
                        key={img.id}
                        className="group overflow-hidden rounded-[8px] relative cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-500"
                        onClick={() => handleProjectClick(img)}
                        onMouseEnter={() => setHoveredId(img.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {/* Image with smooth hover effect */}
                        <div className="relative overflow-hidden">
                            <img
                                src={img.link}
                                alt={img.title}
                                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />

                            {/* Overlay gradient on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-[#040404]/60 via-transparent to-transparent transition-opacity duration-500 ${hoveredId === img.id ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </div>
                        <div
                            className="absolute top-2 right-2 w-fit h-fit border-2 border-white rounded-lg p-1.5 md:p-2 bg-[#040404] z-10 cursor-pointer"
                            onClick={() => handleProjectClick(img)}
                        >
                            <GoArrowUpRight className="text-white text-sm md:text-base" />
                        </div>
                        <div className="absolute top-2 left-2 max-w-[70%] border-2 border-white rounded-lg p-1.5 md:p-2 bg-[#040404] z-10 cursor-pointer">
                            <h1 className="text-white font-tanker text-base md:text-xl truncate">{img.title}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
