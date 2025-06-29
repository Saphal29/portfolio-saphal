import { useState, useRef, useEffect } from "react"
import { Github } from "lucide-react"
import { useTranslation } from "react-i18next"
import gsap from "gsap"


interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubLink: string
  category: string
}

export default function Projects() {
  const { t } = useTranslation()
  const projects: Project[] = [
    {
      id: 1,
      title: t("projects.ryde.title"),
      description: t("projects.ryde.description"),
      technologies: ["React Native", "Nativewind", "Node.js", "MySQL"],
      githubLink: "https://github.com/Saphal29/Ryde.git",
      category: t("projects.filter.mobile"),
    },
    {
      id: 2,
      title: t("projects.horizon.title"),
      description: t("projects.horizon.description"),
      technologies: ["HTML", "CSS", "JavaScript"],
      githubLink: "https://github.com/Saphal29/Horizon.git",
      category: t("projects.filter.web"),
    },
    {
      id: 3,
      title: t("projects.kitab_zone.title"),
      description: t("projects.kitab_zone.description"),
      technologies: ["HTML", "CSS", "JavaScript", "Java", "JDBC", "MySQL"],
      githubLink: "https://github.com/Saphal29/Kitab-Zone.git",
      category: t("projects.filter.full_stack"),
    },
  ]

  const [filter, setFilter] = useState(t("projects.filter.all"))
  const categories = [t("projects.filter.all"), t("projects.filter.web"), t("projects.filter.mobile"), t("projects.filter.full_stack")]

  const filteredProjects = filter === t("projects.filter.all") ? projects : projects.filter((project) => project.category === filter)

  const comp = useRef(null)

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.project-card'))
    if (cards.length > 0) {
      // Ensure all cards are visible before animating
      cards.forEach(card => (card as HTMLElement).style.opacity = "1");
      // Animate on next frame to ensure DOM is ready
      requestAnimationFrame(() => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.05 }
        );
      });
    }
  }, [])

  return (
    <div ref={comp} className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("projects.title")}</h1>
          <p className="text-lg text-gray-600 mb-8">{t("projects.subtitle")}</p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === category ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden project-card"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{project.title}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{project.category}</span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                  >
                    <Github size={16} />
                    {t("projects.view_code")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm stats-card">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">3+</h3>
            <p className="text-gray-600">{t("projects.stats.completed_projects")}</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm stats-card">
            <h3 className="text-2xl font-bold text-green-600 mb-2">5+</h3>
            <p className="text-gray-600">{t("projects.stats.technologies_used")}</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm stats-card">
            <h3 className="text-2xl font-bold text-purple-600 mb-2">100%</h3>
            <p className="text-gray-600">{t("projects.stats.open_source")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}