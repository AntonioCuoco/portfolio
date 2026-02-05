import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const Blog = () => {
    const [articles, setArticles] = useState([]);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const articles = await fetch("https://versatile-topic-442111-u7.oa.r.appspot.com/getArticle");
            const data = await articles.json();
            console.log("data", data);
            setArticles(data);
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const handleArticleClick = (article) => {
        window.open(`https://99dev.netlify.app/blog/${article.titleArticle}`, "_blank");
    };

    return (
        <div className="flex flex-col gap-6 md:gap-8" id="blog">
            <h1 className="text-3xl md:text-4xl font-tanker">Blog</h1>

            {/* Grid responsive: 1 colonna mobile, 2 colonne tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {articles?.map((article, index) => (
                    <div
                        key={index}
                        className="group overflow-hidden rounded-[8px] relative cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-500"
                        onClick={() => handleArticleClick(article)}
                        onMouseEnter={() => setHoveredId(index)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {/* Image with fixed height and smooth hover effect */}
                        <div className="relative overflow-hidden h-56 sm:h-64 md:h-72 lg:h-80">
                            <img
                                src={article.imgCopertina}
                                alt={article.titleArticle}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />

                            {/* Overlay gradient on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-[#040404]/60 via-transparent to-transparent transition-opacity duration-500 ${hoveredId === index ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </div>

                        {/* Arrow icon */}
                        <div
                            className="absolute top-2 right-2 w-fit h-fit border-2 border-white rounded-lg p-1.5 md:p-2 bg-[#040404] z-10 cursor-pointer"
                            onClick={() => handleArticleClick(article)}
                        >
                            <GoArrowUpRight className="text-white text-sm md:text-base" />
                        </div>

                        {/* Title */}
                        <div className="absolute top-2 left-2 max-w-[70%] sm:max-w-[75%] border-2 border-white rounded-lg p-1.5 md:p-2 bg-[#040404] z-10">
                            <h2 className="text-white font-tanker text-sm sm:text-base md:text-lg lg:text-xl truncate">
                                {article.titleArticle}
                            </h2>
                        </div>

                        {/* Category badge */}
                        <div className="absolute bottom-2 left-2 border-2 border-white rounded-lg px-2 py-1 md:p-2 bg-[#040404] z-10">
                            <span className="text-white text-xs md:text-sm uppercase tracking-wider">{article.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
