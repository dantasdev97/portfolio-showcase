import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useState } from "react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Projeto não encontrado.</p>
          <button onClick={() => navigate("/")} className="text-primary font-medium">
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 max-w-[900px] mx-auto">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-medium text-sm"
      >
        <ArrowLeft size={18} />
        Voltar
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card overflow-hidden"
      >
        {/* Gallery */}
        <div className="relative">
          {project.gallery.length > 0 && (
            <>
              {project.gallery[activeImg]?.type === "video" ? (
                <video
                  src={project.gallery[activeImg].url}
                  controls
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              ) : (
                <img
                  src={project.gallery[activeImg]?.url}
                  alt={project.gallery[activeImg]?.alt || project.title}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              )}

              {project.gallery.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {project.gallery.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        i === activeImg ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      {item.type === "video" ? (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                          ▶ Video
                        </div>
                      ) : (
                        <img src={item.url} alt={item.alt || ""} className="w-full h-full object-cover" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold">{project.title}</h1>
              <div className="flex gap-2 mt-3 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-primary/15 text-primary font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all shrink-0">
              <ExternalLink size={16} />
              Ver Projeto
            </button>
          </div>

          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>{project.fullDescription}</p>
            {project.challenges && (
              <p className="text-sm italic">{project.challenges}</p>
            )}
          </div>

          {/* Technologies */}
          <div className="mt-8">
            <h3 className="text-lg font-heading font-semibold mb-4">Tecnologias usadas:</h3>
            <div className="flex gap-4 flex-wrap">
              {project.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/60 border border-border"
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
