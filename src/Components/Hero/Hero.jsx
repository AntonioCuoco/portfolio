import imgPortfolio from "@/assets/imgPortfolio.png";
import RamsButton from "../ramsButton";
import StatusSquare from "../StatusSquare";

export default function Hero() {
    return (
        <div className="flex flex-col justify-center items-center text-center px-2">
            {/* Main title - responsive */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-tanker flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <span>Hi, i'm</span>
                <img
                    src={imgPortfolio}
                    alt=""
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 border-[2px] md:border-[3px] border-[#040404] rounded-[12px] md:rounded-[16px]"
                />
                <span>Antonio Cuoco</span>
            </h1>

            {/* Subtitle row - responsive */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mt-2 md:mt-0">
                <h2 className="text-xl sm:text-2xl md:text-[2rem] font-tanker">
                    A <span className="text-[#EE7B30]">full stack developer</span> based in Italy
                </h2>
                <div className="border border-[#040404] bg-[#f8f8f8] rounded-full px-3 py-1">
                    <p className="flex justify-center items-center gap-2 font-bespoke text-sm md:text-base">
                        <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-300 flex justify-center items-center">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[radial-gradient(circle_at_30%_30%,#4ade80,#16a34a)] rounded-full animate-pulse" />
                        </span>
                        open to work
                    </p>
                </div>
            </div>

            {/* CTA row - responsive */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-4 md:mt-6">
                <StatusSquare size="md" text="R" downloadable={true} downloadableLink="/file/AntonioCuoco-cv-2026-FrontendDeveloper-1.pdf" />
                <p className="text-sm md:text-base font-bespoke text-center sm:text-left">
                    esplora il mio portfolio e i miei progetti <br />
                    e se ti sono piaciuti non esitare a contattarmi
                </p>
            </div>
        </div>
    )
}