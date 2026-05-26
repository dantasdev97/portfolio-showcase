import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useState } from "react";
import TechIcon from "@/components/TechIcon";
import Seo from "@/components/Seo";
import ShareButtons from "@/components/ShareButtons";
import LikeButton from "@/components/LikeButton";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

function scoreColor(n: number): string {
  return n >= 90 ? "hsl(var(--primary))" : n >= 50 ? "#e3b341" : "#f25555";
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Seo title="Projeto não encontrado | Augusto Dantas" path="/" noindex />
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Projeto não encontrado.</p>
          <button onClick={() => navigate("/")} className="text-primary font-medium">
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  const projectPath = `/projeto/${project.id}`;
  const heroImage = project.gallery[0]?.url ?? "/perfil.jpg";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.desc,
      url: absoluteUrl(projectPath),
      image: absoluteUrl(heroImage),
      keywords: project.tags.join(", "),
      creator: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: project.title, item: absoluteUrl(projectPath) },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-10 max-w-[760px] mx-auto">
      <Seo
        title={`${project.title} | Augusto Dantas`}
        description={project.desc}
        path={projectPath}
        jsonLd={jsonLd}
      />
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
        className="glass-card overflow-hidden lg:h-[660px] lg:flex lg:flex-col"
      >
        {/* Gallery */}
        <div className="relative lg:shrink-0">
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
                  onError={(e) => {
                    const fallback = project.gallery[activeImg]?.fallback;
                    if (fallback && e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
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
                          ▶ Vídeo
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt={item.alt || ""}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const fallback = item.fallback;
                            if (fallback && e.currentTarget.src !== fallback) {
                              e.currentTarget.src = fallback;
                            }
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col gap-6 lg:flex-1 lg:overflow-y-auto scrollbar-hide">
          {/* Title + tags */}
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

          {/* Description */}
          <div className="space-y-4 leading-relaxed">
            <p className="text-foreground/90 whitespace-pre-line">{project.fullDescription}</p>
            {project.challenges && (
              <p className="text-sm text-foreground/70 italic border-l-2 border-primary/30 pl-4">
                {project.challenges}
              </p>
            )}
          </div>

          {/* Technologies — horizontal scroll */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Tecnologias
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {project.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/60 border border-border"
                >
                  <TechIcon src={tech.iconSrc} alt={tech.name} className="w-5 h-5" />
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance & Segurança */}
          {(project.pagespeed?.mobile != null ||
            project.pagespeed?.desktop != null ||
            project.sslValid) && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Performance &amp; Segurança
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.pagespeed?.mobile != null && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/60 border border-border">
                    <span className="text-sm text-muted-foreground">PageSpeed Mobile</span>
                    <span
                      className="text-base font-bold"
                      style={{ color: scoreColor(project.pagespeed.mobile) }}
                    >
                      {project.pagespeed.mobile}
                    </span>
                  </div>
                )}
                {project.pagespeed?.desktop != null && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/60 border border-border">
                    <span className="text-sm text-muted-foreground">PageSpeed Desktop</span>
                    <span
                      className="text-base font-bold"
                      style={{ color: scoreColor(project.pagespeed.desktop) }}
                    >
                      {project.pagespeed.desktop}
                    </span>
                  </div>
                )}
                {project.sslValid && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/60 border border-border text-primary">
                    <ShieldCheck size={16} />
                    <span className="text-sm font-medium">SSL válido</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Gosto + Partilha */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between border-t border-border pt-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Gostaste?
              </h3>
              <LikeButton projectId={project.id} />
            </div>
            <ShareButtons
              url={absoluteUrl(projectPath)}
              title={project.title}
              image={absoluteUrl(heroImage)}
            />
          </div>

          {/* Live button — bottom */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all"
            >
              <ExternalLink size={16} />
              Ver Projeto ao Vivo
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
