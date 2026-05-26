import { useState, useEffect } from "react";
import { ExternalLink, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { categories, projects } from "@/data/projects";
import TechIcon from "@/components/TechIcon";

const CARDS_PER_PAGE = 4;

const PortfolioSection = () => {
  const [active, setActive] = useState("Todos");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const filtered = active === "Todos" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    setPage(1);
  }, [active]);

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

  return (
    <section id="portfolio" className="scroll-mt-32 lg:scroll-mt-8">
      <div className="glass-card accent-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-2xl font-heading font-bold">Portfólio</h2>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {paginated.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/projeto/${project.id}`)}
                className="rounded-xl overflow-hidden bg-secondary/50 border border-border hover:border-primary/30 transition-all group cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="h-[140px] bg-muted/50 flex items-center justify-center relative overflow-hidden">
                  {project.gallery[0] ? (
                    <img
                      src={project.gallery[0].url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const fallback = project.gallery[0].fallback;
                        if (fallback && e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center">
                      <ExternalLink className="text-primary" size={24} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                    <span className="text-xs font-medium text-primary">Ver detalhes →</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <h3 className="font-heading font-semibold">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{project.desc}</p>

                  {/* Technology icons */}
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/60 border border-border"
                      >
                        <TechIcon src={tech.iconSrc} alt={tech.name} className="w-3.5 h-3.5" />
                        <span className="text-[10px] text-muted-foreground">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state for Vídeos */}
          {paginated.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-2 py-16 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Video className="text-primary/50" size={28} />
              </div>
              <p className="text-sm text-muted-foreground font-medium">Vídeos em breve...</p>
            </motion.div>
          )}
        </div>

        {/* Pagination — only shown when needed */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
              Anterior
            </button>
            <span className="text-sm text-muted-foreground">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Próximo
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
