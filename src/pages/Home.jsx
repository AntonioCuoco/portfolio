import Header from "@/Components/Header";
import Hero from "@/Components/Hero/Hero";
import MasonryGrid from "@/Components/masonryGrid";
import MasonryElement from "@/Components/MasonryElement";
import TimelineComponent from "@/Components/Timeline/Timeline";
import StatusSquare from "@/Components/StatusSquare";
import Work from "@/Components/Work/Work";
import Footer from "@/Components/Footer";
import Contact from "@/Components/Contact Form/Contact";
import Book3D from "@/Components/Book3D";
import Blog from "../components/Blog";
import MusicCarousel from "@/Components/MusicCarousel";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col gap-6 md:gap-10 bg-[#F3F3F4] font-bespoke px-4 md:px-6 py-4">
            <Header />
            <Hero />
            <MasonryGrid columns={4} gap="lg" rowHeight="140px">
                {/* Experience - tall left card */}
                <MasonryElement title="My Experience" size="2x2">
                    <div className="flex flex-col gap-4 items-start">
                        <TimelineComponent />
                    </div>
                </MasonryElement>

                {/* Music playlist - center tall card */}
                <MasonryElement title="My music playlist" size="1x2">
                    <MusicCarousel
                        playlistName="Antonio's Playlist"
                        spotifyLink="https://open.spotify.com/user/your-spotify-id"
                    />
                </MasonryElement>

                {/* What I'm reading - right card */}
                <MasonryElement title="What I'm reading" size="1x2">
                    <div className="flex flex-col h-full overflow-hidden">
                        <p className="font-semibold text-sm">Python</p>
                        <p className="text-xs text-gray-500 mb-3">Naomi Ceder</p>
                        <div className="flex-1 flex items-center justify-center">
                            <Book3D title="Python" publisher="Apogeo" />
                        </div>
                    </div>
                </MasonryElement>

                <StatusSquare size="md" draggable={true} />

                {/* How I work - bottom center */}
                <MasonryElement title="Why me" size="2x2">
                    <p className="text-xs md:text-sm text-gray-600">
                        Beyond technical skills, I bring a strong mindset focused on continuous growth and code quality. I like to understand the why behind things, not just make them work. This approach helps me write more solid, maintainable code and make more thoughtful technical decisions. <br /> <br />

                        I strongly believe in team collaboration: discussing solutions, exchanging feedback, and constantly improving the way I approach problems is a core part of how I work. I don’t look for shortcuts, but for solutions that work well today and remain sustainable over time. <br /> <br />

                        I learn new technologies quickly and adapt easily to environments where the tech stack evolves frequently, which I see as an opportunity rather than a challenge. My background as a frontend developer, followed by experience as a full stack developer, allows me to have a broad view of the product and collaborate effectively across frontend, backend, and design. <br /> <br />

                        In short, I don’t just bring code — I bring care, curiosity, and a constant drive to improve.
                    </p>
                </MasonryElement>

                {/* Tech stack - bottom right */}
                <MasonryElement title="Tech Stack" size="1x2">
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">React</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">TypeScript</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Tailwind</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Material UI</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Node.js</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">MongoDB</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">PostgreSQL</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Supabase</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Netlify</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Git</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Github</span>
                    </div>
                </MasonryElement>
                <MasonryElement title="Now i'm learning" size="1x1">
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">AWS</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Python</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Django</span>
                    </div>
                </MasonryElement>

                <MasonryElement title="About me" size="4x2">
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        My journey into web development began with a simple curiosity: understanding how the applications we use every day come to life. From my first line of code to building complex applications, the excitement of creating things for the web has never faded.
                        <br /><br /><br className="hidden md:block" />
                        I've developed strong skills across the web ecosystem — HTML, CSS, JavaScript, React, and Node.js — with a focus on building meaningful digital experiences, not just websites. By working on personal projects and experimenting with new technologies and architectural patterns, I've shaped an approach centered on clean, efficient, and maintainable software.
                        <br /><br /><br className="hidden md:block" />
                        Today, I continue to grow by focusing on frontend and cloud architectures, working with serverless solutions on AWS, microfrontend patterns, and quality-driven tools like Playwright. In parallel, I'm deepening my knowledge of Python and Django, applying what I learn by building new products to turn theory into practice. My goal is to create scalable, resilient web applications ready for what's next.
                    </p>
                </MasonryElement>
            </MasonryGrid>
            <Work />
            <Blog />
            <Contact />
            <Footer />
        </div>
    );
}
