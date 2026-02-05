import { useState, useEffect, useRef } from 'react';

/**
 * MusicCarousel - A curved 3D carousel of album covers
 * Replicates the aesthetic from the reference image with stacked, 
 * rotated album covers creating a fan-like effect  
 * TODO: implements the spotify web api to fetch 5 albums image to show and in the footer show something like this, all the images of albums is retrived by spotify api
 */

// Default album covers with placeholder gradients
const defaultAlbums = [
    {
        id: 1,
        image: null,
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        alt: 'Album 1'
    },
    {
        id: 2,
        image: null,
        gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%)',
        alt: 'Album 2'
    },
    {
        id: 3,
        image: null,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        alt: 'Album 3'
    },
    {
        id: 4,
        image: null,
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        alt: 'Album 4'
    },
    {
        id: 5,
        image: null,
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        alt: 'Album 5'
    }
];

export default function MusicCarousel({
    albums = defaultAlbums,
    playlistName = "Antonio's Playlist",
    spotifyLink = "#",
    autoRotate = false, // Changed default to false
    rotateInterval = 3000
}) {
    const [activeIndex, setActiveIndex] = useState(2); // Start with middle album
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);

    // Auto rotation effect - only if autoRotate is true
    useEffect(() => {
        if (!autoRotate || isHovered) return;

        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % albums.length);
        }, rotateInterval);

        return () => clearInterval(interval);
    }, [autoRotate, isHovered, albums.length, rotateInterval]);

    // Calculate position and rotation for each album
    const getAlbumStyle = (index) => {
        const totalAlbums = albums.length;
        const centerIndex = activeIndex;

        // Calculate relative position from center
        let relativePos = index - centerIndex;

        // Handle wrapping for circular effect
        if (relativePos > totalAlbums / 2) relativePos -= totalAlbums;
        if (relativePos < -totalAlbums / 2) relativePos += totalAlbums;

        // Position calculations for the curved fan effect
        const spreadAngle = 20; // Slightly reduced angle for compact view
        const rotation = relativePos * spreadAngle;

        // Horizontal offset - reduced to fit in 1x2 container while keeping fan effect
        const xOffset = relativePos * 55;

        // Vertical offset
        const yOffset = Math.abs(relativePos) * 10;

        // Z-index - center album is on top
        const zIndex = totalAlbums - Math.abs(relativePos);

        // Scale - flatter scaling for better visibility in small space
        const scale = 1 - Math.abs(relativePos) * 0.1;

        // Opacity
        const opacity = 1 - Math.abs(relativePos) * 0.1;

        return {
            transform: `
                translateX(${xOffset}px) 
                translateY(${yOffset}px) 
                rotate(${rotation}deg) 
                scale(${scale})
            `,
            zIndex,
            opacity,
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        };
    };

    return (
        <div
            className="flex flex-col items-center justify-between h-full w-full py-2 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Carousel Container */}
            <div
                ref={containerRef}
                className="relative flex items-center justify-center flex-1 w-full"
                style={{ perspective: '1000px' }}
            >
                {/* Albums Stack */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {albums.map((album, index) => (
                        <div
                            key={album.id}
                            className="absolute cursor-pointer hover:scale-105"
                            style={getAlbumStyle(index)}
                            onClick={() => setActiveIndex(index)}
                        >
                            {/* Album Cover */}
                            <div
                                className="
                                    w-20 h-20 
                                    sm:w-24 sm:h-24 
                                    md:w-28 md:h-28
                                    rounded-xl
                                    shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                                    overflow-hidden
                                    border-2 border-white/20
                                "
                                style={{
                                    background: album.image
                                        ? `url(${album.image}) center/cover no-repeat`
                                        : album.gradient,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {album.image && (
                                    <img
                                        src={album.image}
                                        alt={album.alt}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Playlist Info */}
            <div className="text-center mt-4 space-y-1">
                <p className="font-semibold text-sm md:text-base text-gray-800">
                    {playlistName}
                </p>
                <a
                    href={spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        inline-flex items-center gap-1.5 
                        text-xs text-gray-500 
                        hover:text-green-500 
                        transition-colors
                        group
                    "
                >
                    {/* Spotify Icon */}
                    <svg
                        className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    <span>Play on Spotify</span>
                </a>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-1.5 mt-3">
                {albums.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`
                            w-1.5 h-1.5 rounded-full transition-all duration-300
                            ${index === activeIndex
                                ? 'bg-green-500 w-4'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }
                        `}
                        aria-label={`Go to album ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
