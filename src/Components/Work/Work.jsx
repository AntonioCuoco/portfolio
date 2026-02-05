import Slider from "@/Components/Slider/Slider";
import { projects } from "@/data/projects";

// Transform projects data for the Slider component
const sliderProjects = projects.map(project => ({
    id: project.id,
    slug: project.slug,
    link: project.thumbnail,
    title: project.title
}));

export default function Work() {
    return (
        <div className="flex flex-col gap-8" id="work">
            <h1 className="text-4xl font-tanker">Work</h1>
            <Slider imgList={sliderProjects} imageShownNumber={2} />
        </div>
    );
}