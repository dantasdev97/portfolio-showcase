import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { categories, projects } from "@/data/projects";

const PortfolioSection = () => {
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? projects : projects.filter((p) => p.category === active);
  const navigate = useNavigate();

  return (
    <section id="portfolio" className="scroll-mt-32 lg:scroll-mt-8">
      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-2xl font-heading font-bold">Portfólio</h2>
        </div>

        {/* Category filters - scrollable on mobile */}
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
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/projeto/${project.id}`)}
                className="rounded-xl overflow-hidden bg-secondary/50 border border-border hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="h-[140px] bg-muted/50 flex items-center justify-center relative overflow-hidden">
                  {project.gallery[0] ? (
                    <img
                      src={project.gallery[0].url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                <div className="p-4">
                  <h3 className="font-heading font-semibold">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{project.desc}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
