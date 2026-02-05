import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoArrowUpRight, GoArrowLeft } from "react-icons/go";
import { getProjectBySlug, projects } from "@/data/projects";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function ProjectDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const foundProject = getProjectBySlug(slug);
        if (foundProject) {
            setProject(foundProject);
            // Trigger entrance animation
            setTimeout(() => setIsLoaded(true), 50);
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    // Get adjacent projects for navigation
    const currentIndex = projects.findIndex(p => p.slug === slug);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    if (!project) {
        return (
            <div className="min-h-screen bg-[#F3F3F4] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#EE7B30] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F3F3F4] font-bespoke">
            {/* Fixed Header */}
            <div className="px-6 py-4">
                <Header />
            </div>

            {/* Main Content */}
            <main className={`transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Hero Section */}
                <section className="px-6 py-8">
                    {/* Back Button */}
                    <Link
                        to="/#work"
                        className="inline-flex items-center gap-2 text-[#040404] hover:text-[#EE7B30] transition-colors duration-300 mb-8 group"
                    >
                        <GoArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-bespoke">Back to Projects</span>
                    </Link>

                    {/* Project Header */}
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-12 items-start">
                            {/* Left: Project Info */}
                            <div className="flex-1 space-y-6">
                                {/* Status Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#e0e0e0] shadow-sm">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-sm text-[#6b6b6b]">{project.status}</span>
                                </div>

                                {/* Title */}
                                <div>
                                    <h1 className="text-5xl lg:text-7xl font-tanker text-[#040404] leading-tight">
                                        {project.title}
                                    </h1>
                                    <p className="text-xl lg:text-2xl text-[#6b6b6b] mt-2 font-bespoke">
                                        {project.subtitle}
                                    </p>
                                </div>

                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-6 pt-4">
                                    <div>
                                        <p className="text-xs text-[#9b9b9b] uppercase tracking-wider">Year</p>
                                        <p className="text-lg font-semibold text-[#040404]">{project.year}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#9b9b9b] uppercase tracking-wider">Role</p>
                                        <p className="text-lg font-semibold text-[#040404]">{project.role}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#040404] text-white rounded-full hover:bg-[#EE7B30] transition-all duration-300 group shadow-lg hover:shadow-xl"
                                        >
                                            <span className="font-medium">View Live</span>
                                            <GoArrowUpRight className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#040404] rounded-full border-2 border-[#040404] hover:bg-[#040404] hover:text-white transition-all duration-300 group shadow-lg hover:shadow-xl"
                                        >
                                            <span className="font-medium">View Code</span>
                                            <GoArrowUpRight className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right: Main Image */}
                            <div className="flex-1 w-full lg:max-w-2xl">
                                <div className="relative group">
                                    {/* Image Container with Premium Shadow */}
                                    <div className="relative overflow-hidden rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] transition-shadow duration-500">
                                        {/* Loading Skeleton */}
                                        {!imageLoaded && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                                        )}
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className={`w-full h-auto object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover:scale-[1.02]`}
                                            onLoad={() => setImageLoaded(true)}
                                        />
                                        {/* Subtle Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    {/* Decorative Elements */}
                                    <div className="absolute -z-10 -top-4 -right-4 w-24 h-24 bg-[#EE7B30]/10 rounded-full blur-2xl" />
                                    <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-[#040404]/5 rounded-full blur-3xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Description Section */}
                <section className="px-6 py-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* About */}
                            <div className="bg-white rounded-[32px] p-8 lg:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                                <h2 className="text-2xl font-tanker text-[#040404] mb-6">About the Project</h2>
                                <div className="prose prose-lg text-[#6b6b6b] leading-relaxed whitespace-pre-line">
                                    {project.longDescription}
                                </div>
                            </div>

                            {/* Features & Tech */}
                            <div className="space-y-8">
                                {/* Technologies */}
                                <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                                    <h2 className="text-2xl font-tanker text-[#040404] mb-6">Technologies</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-gradient-to-br from-[#f8f8f8] to-[#f0f0f0] text-[#040404] rounded-full text-sm font-medium border border-[#e8e8e8] hover:border-[#EE7B30] hover:shadow-md transition-all duration-300 cursor-default"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Features */}
                                <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                                    <h2 className="text-2xl font-tanker text-[#040404] mb-6">Key Features</h2>
                                    <ul className="space-y-4">
                                        {project.features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-[#6b6b6b]"
                                            >
                                                <span className="w-2 h-2 mt-2 bg-[#EE7B30] rounded-full flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Navigation to Other Projects */}
                <section className="px-6 py-16 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-tanker text-[#040404] text-center mb-12">More Projects</h2>
                        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6">
                            {/* Previous Project */}
                            <div className="flex-1">
                                {prevProject ? (
                                    <Link
                                        to={`/project/${prevProject.slug}`}
                                        className="group block h-full p-6 rounded-[24px] border-2 border-[#e0e0e0] hover:border-[#EE7B30] transition-all duration-300 hover:shadow-lg"
                                    >
                                        <p className="text-sm text-[#9b9b9b] mb-2 flex items-center gap-2">
                                            <GoArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                                            Previous Project
                                        </p>
                                        <h3 className="text-xl font-tanker text-[#040404] group-hover:text-[#EE7B30] transition-colors duration-300">
                                            {prevProject.title}
                                        </h3>
                                        <p className="text-sm text-[#6b6b6b] mt-1">{prevProject.subtitle}</p>
                                    </Link>
                                ) : (
                                    <div className="h-full p-6 rounded-[24px] border-2 border-dashed border-[#e0e0e0] flex items-center justify-center">
                                        <p className="text-[#9b9b9b]">First Project</p>
                                    </div>
                                )}
                            </div>

                            {/* Next Project */}
                            <div className="flex-1">
                                {nextProject ? (
                                    <Link
                                        to={`/project/${nextProject.slug}`}
                                        className="group block h-full p-6 rounded-[24px] border-2 border-[#e0e0e0] hover:border-[#EE7B30] transition-all duration-300 hover:shadow-lg text-right"
                                    >
                                        <p className="text-sm text-[#9b9b9b] mb-2 flex items-center justify-end gap-2">
                                            Next Project
                                            <GoArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                        </p>
                                        <h3 className="text-xl font-tanker text-[#040404] group-hover:text-[#EE7B30] transition-colors duration-300">
                                            {nextProject.title}
                                        </h3>
                                        <p className="text-sm text-[#6b6b6b] mt-1">{nextProject.subtitle}</p>
                                    </Link>
                                ) : (
                                    <div className="h-full p-6 rounded-[24px] border-2 border-dashed border-[#e0e0e0] flex items-center justify-center">
                                        <p className="text-[#9b9b9b]">Last Project</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
