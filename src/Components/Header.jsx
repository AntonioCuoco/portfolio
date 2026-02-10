import { useLocation, useNavigate } from "react-router-dom";
import RamsButton from "./ramsButton";
import ScrambleLogo from "./ScrambleLogo";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === "/";
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleScroll = (elementId) => {
        setMobileMenuOpen(false);
        if (isHomePage) {
            // If already on home page, just scroll
            document.getElementById(elementId)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else {
            // If on another page, navigate to home with hash
            navigate(`/#${elementId}`);
        }
    };

    const handleHomeClick = () => {
        setMobileMenuOpen(false);
        if (isHomePage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    return (
        <div className="flex justify-between items-center relative">
            <ScrambleLogo />

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-5 font-bespoke">
                <li
                    className="cursor-pointer hover:text-[#EE7B30] transition-colors duration-300"
                    onClick={handleHomeClick}
                >
                    Home
                </li>
                <li
                    className="cursor-pointer hover:text-[#EE7B30] transition-colors duration-300"
                    onClick={() => handleScroll("work")}
                >
                    Projects
                </li>
                <li
                    className="cursor-pointer hover:text-[#EE7B30] transition-colors duration-300"
                    onClick={() => handleScroll("blog")}
                >
                    Blog
                </li>
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:block">
                <RamsButton text="Get In Touch" size="default" elementId="contact" />
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-2xl p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>

            {/* Mobile Navigation Overlay */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-2xl mt-2 p-4 z-50 md:hidden">
                    <ul className="flex flex-col gap-4 font-bespoke">
                        <li
                            className="cursor-pointer hover:text-[#EE7B30] transition-colors duration-300 py-2"
                            onClick={handleHomeClick}
                        >
                            Home
                        </li>
                        <li
                            className="cursor-pointer hover:text-[#EE7B30] transition-colors duration-300 py-2"
                            onClick={() => handleScroll("work")}
                        >
                            Projects
                        </li>
                        <li
                            className="cursor-pointer hover:text-[#EE7B30] transition-colors duration-300 py-2"
                            onClick={() => handleScroll("contact")}
                        >
                            Contacts
                        </li>
                        <li className="pt-2 border-t border-gray-100">
                            <RamsButton text="Get In Touch" size="default" elementId="contact" />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}