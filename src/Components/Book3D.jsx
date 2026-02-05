import React, { useState } from 'react';

const Book3D = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-[110px] h-[150px]" style={{ perspective: '800px' }}>
      <div
        className="relative w-full h-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main book container */}
        <div
          className="relative w-[90px] h-[130px] mx-auto mt-2.5 transition-transform duration-500 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered
              ? 'rotateY(-50deg) rotateX(5deg) translateY(-4px)'
              : 'rotateY(-30deg) rotateX(10deg)',
          }}
        >
          {/* Front Cover */}
          <div
            className="absolute w-[90px] h-[130px] bg-gradient-to-b from-white to-gray-50 rounded-r overflow-hidden"
            style={{
              transform: 'translateZ(12px)',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 2px 4px 12px rgba(0,0,0,0.15)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="h-full flex flex-col">
              {/* Title section */}
              <div className="pt-3 px-2 pb-1">
                <h2 className="text-xl font-extrabold text-[#1e3a5f] m-0 leading-none tracking-tight">
                  Python
                </h2>
                <p className="text-[5px] text-slate-500 mt-1 leading-tight font-medium">
                  Guida alla sintassi,<br />
                  alle funzionalità avanzate<br />
                  e all'analisi dei dati
                </p>
              </div>

              {/* Decorative illustration area */}
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 mx-1.5 my-1 rounded">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-md flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold font-mono">&lt;/&gt;</span>
                </div>
              </div>

              {/* Publisher */}
              <div className="py-1.5 bg-gradient-to-b from-amber-400 to-amber-500 text-center">
                <span className="text-[9px] font-bold text-gray-800 lowercase tracking-wide">apogeo</span>
              </div>
            </div>
          </div>

          {/* Spine */}
          <div
            className="absolute w-6 h-[130px] bg-gradient-to-b from-[#1e3a5f] to-[#0f2439] flex flex-col items-center justify-between py-2.5"
            style={{
              transform: 'rotateY(90deg) translateZ(-8px) translateX(0px)',
              boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.3)',
              backfaceVisibility: 'hidden'
            }}
          >
            <span
              className="text-[11px] font-bold text-white tracking-wide"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Python
            </span>
            <span
              className="text-[7px] font-semibold text-amber-400 tracking-normal"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              apogeo
            </span>
          </div>

          {/* Pages (right side) */}
          <div
            className="absolute w-[22px] h-[126px] top-0.5 rounded-r"
            style={{
              right: '-22px',
              background: 'repeating-linear-gradient(90deg, #fafafa 0px, #fafafa 2px, #f0f0f0 2px, #f0f0f0 4px)',
              transform: 'translateZ(11px)',
              boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.08), 1px 0 2px rgba(0,0,0,0.05)',
              backfaceVisibility: 'hidden'
            }}
          />

          {/* Back Cover */}
          <div
            className="absolute w-[90px] h-[130px] bg-gradient-to-b from-[#1e3a5f] to-[#0f2439] rounded-l"
            style={{
              transform: 'translateZ(-12px)',
              backfaceVisibility: 'hidden'
            }}
          />

          {/* Top */}
          <div
            className="absolute w-[90px] h-6 bg-gradient-to-b from-white via-gray-100 to-gray-200 rounded-tr"
            style={{
              transform: 'rotateX(90deg) translateZ(0) translateY(-12px)',
              backfaceVisibility: 'hidden'
            }}
          />

          {/* Bottom */}
          <div
            className="absolute w-[90px] h-6 bg-gradient-to-b from-gray-200 to-gray-300"
            style={{
              transform: 'rotateX(-90deg) translateZ(130px) translateY(-12px)',
              backfaceVisibility: 'hidden'
            }}
          />
        </div>

        {/* Shadow - simple 2D ellipse shadow */}
        <div
          className="absolute left-1/2 bottom-0 w-16 h-3 opacity-40 group-hover:opacity-50 group-hover:w-20 transition-all duration-500"
        />
      </div>
    </div>
  );
};

export default Book3D;
