import img99dev from "@/assets/99dev.png";
import leTransfer from "@/assets/leTransfer.png";
import myPortfolio from "@/assets/portfolio.png";

/**
 * Project data for the portfolio
 * Each project contains all the information needed for the slider and detail page
 */
export const projects = [
    {
        id: 1,
        slug: "99dev",
        title: "99dev",
        subtitle: "Blog & CMS Platform",
        thumbnail: img99dev,
        images: [img99dev],
        description: "A modern blog and content management system designed for developers. Features a clean, intuitive interface with powerful editing capabilities and seamless content publishing workflows.",
        longDescription: `99dev is a comprehensive blog and CMS platform built specifically for developers who want to share their knowledge and experiences with the community.

The platform features:
• **Rich Text Editor** - A powerful WYSIWYG editor with syntax highlighting for code snippets
• **SEO Optimization** - Built-in tools to optimize content for search engines
• **Analytics Dashboard** - Track your content's performance with detailed insights
• **Responsive Design** - Perfect reading experience across all devices
• **Fast & Lightweight** - Optimized for performance with minimal dependencies`,
        technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Vite"],
        features: [
            "Rich text editor with syntax highlighting",
            "SEO optimization tools",
            "Analytics dashboard",
            "Responsive design",
            "Fast performance"
        ],
        year: "2024",
        role: "Full Stack Developer",
        liveUrl: "https://99dev.netlify.app",
        githubUrl: "https://github.com/antoniocuoco/99dev",
        status: "Live"
    },
    {
        id: 2,
        slug: "letransfer",
        title: "leTransfer",
        subtitle: "Secure File Sharing",
        thumbnail: leTransfer,
        images: [leTransfer],
        description: "A secure and fast file transfer application with end-to-end encryption. Share files confidently with expiring links and password protection.",
        longDescription: `leTransfer is a cutting-edge file sharing platform that prioritizes security without compromising on user experience.

Key highlights:
• **End-to-End Encryption** - Your files are encrypted before they leave your device
• **Expiring Links** - Set custom expiration times for enhanced security
• **Password Protection** - Add an extra layer of security to shared files
• **Large File Support** - Transfer files up to 10GB with ease
• **Real-time Progress** - Track upload and download progress in real-time`,
        technologies: ["React", "TypeScript", "AWS", "Node.js", "PostgreSQL"],
        features: [
            "End-to-end encryption",
            "Expiring links",
            "Password protection",
            "Large file support",
            "Real-time progress tracking"
        ],
        year: "2024",
        role: "Full Stack Developer",
        liveUrl: "https://letransfer.app",
        githubUrl: "https://github.com/antoniocuoco/letransfer",
        status: "Live"
    },
    {
        id: 3,
        slug: "portfolio",
        title: "myPortfolio",
        subtitle: "Personal Portfolio",
        thumbnail: myPortfolio,
        images: [myPortfolio],
        description: "A modern, responsive portfolio website showcasing my projects and skills. Built with React and featuring smooth animations and a clean design.",
        longDescription: `This portfolio is a reflection of my design philosophy and technical skills, built from the ground up to create a memorable first impression.

Design principles:
• **Minimalist Aesthetic** - Clean layouts that focus on content
• **Smooth Animations** - Micro-interactions that enhance user experience
• **Performance First** - Optimized for fast load times
• **Accessibility** - Designed with inclusivity in mind
• **Mobile Responsive** - Flawless experience on all screen sizes`,
        technologies: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
        features: [
            "Modern design system",
            "Smooth animations",
            "Responsive layout",
            "Fast performance",
            "SEO optimized"
        ],
        year: "2024",
        role: "Frontend Developer",
        liveUrl: "https://antoniocuoco.dev",
        githubUrl: "https://github.com/antoniocuoco/portfolio",
        status: "Live"
    }
];

/**
 * Get project by slug
 * @param {string} slug - The project slug
 * @returns {object|undefined} - The project object or undefined
 */
export const getProjectBySlug = (slug) => {
    return projects.find(project => project.slug === slug);
};

/**
 * Get project by id
 * @param {number} id - The project id
 * @returns {object|undefined} - The project object or undefined
 */
export const getProjectById = (id) => {
    return projects.find(project => project.id === id);
};
