import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Todos", "Código", "WordPress", "Design"];

const projects = [
  { title: "Barbearia Of Brothers", category: "WordPress", tags: ["WordPress", "Elementor"], desc: "Site profissional para barbearia com agendamento online." },
  { title: "Mens Concept Barbershop", category: "WordPress", tags: ["WordPress", "Elementor"], desc: "Landing page para agendamento e serviços." },
  { title: "Dashboard Analytics", category: "Código", tags: ["React", "TypeScript"], desc: "Painel de controle com gráficos e métricas." },
  { title: "E-commerce UI", category: "Design", tags: ["Figma", "UI/UX"], desc: "Design de interface para loja virtual." },
];

const PortfolioSection = () => {
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="scroll-mt-32 lg:scroll-mt-8">
      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-2xl font-heading font-bold">Portfólio</h2>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
                className="rounded-xl overflow-hidden bg-secondary/50 border border-border hover:border-primary/30 transition-all group"
              >
                <div className="h-[140px] bg-muted/50 flex items-center justify-center relative overflow-hidden">
                  <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center">
                    <ExternalLink className="text-primary" size={24} />
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
