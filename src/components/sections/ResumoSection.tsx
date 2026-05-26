import { motion } from "framer-motion";
import TechIcon from "@/components/TechIcon";
import { techIcons } from "@/data/techIcons";
import ExperienceTimeline from "./ExperienceTimeline";
import TechProficiency from "./TechProficiency";
import TechConstellation from "./TechConstellation";

const ResumoSection = () => {
  return (
    <section id="resumo" className="scroll-mt-32 lg:scroll-mt-8">
      <div className="glass-card accent-card p-6 md:p-8">
        <h2 className="text-2xl font-heading font-bold mb-1">Resumo</h2>
        <div className="h-0.5 bg-primary/30 mb-8 green-border-top" />

        <ExperienceTimeline />

        {/* Domínio técnico (hexágonos) */}
        <TechProficiency />

        {/* Skills constellation (in place of Conhecimentos) */}
        <TechConstellation />

        {/* Technologies marquee */}
        <TechMarquee />
      </div>
    </section>
  );
};

const techItems = [
  { name: "PHP", iconSrc: techIcons.PHP },
  { name: "HTML5", iconSrc: techIcons.HTML5 },
  { name: "CSS3", iconSrc: techIcons.CSS3 },
  { name: "React", iconSrc: techIcons.React },
  { name: "Next.js", iconSrc: techIcons["Next.js"] },
  { name: "TypeScript", iconSrc: techIcons.TypeScript },
  { name: "Node.js", iconSrc: techIcons["Node.js"] },
  { name: "JavaScript", iconSrc: techIcons.JavaScript },
  { name: "WordPress", iconSrc: techIcons.WordPress },
  { name: "Figma", iconSrc: techIcons.Figma },
  { name: "Git", iconSrc: techIcons.Git },
  { name: "Tailwind", iconSrc: techIcons.Tailwind },
];

const TechMarquee = () => {
  const doubled = [...techItems, ...techItems];

  return (
    <div className="mt-10 overflow-hidden">
      <h3 className="text-xl font-heading font-semibold mb-5">Tecnologias</h3>
      <div className="relative">
        <motion.div
          className="flex gap-8"
          animate={{ x: [0, -50 * techItems.length] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" },
          }}
        >
          {doubled.map((tech, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0 min-w-[70px]">
              <div className="w-14 h-14 rounded-xl bg-secondary/80 border border-border flex items-center justify-center hover:border-primary/40 transition-colors">
                <TechIcon src={tech.iconSrc} alt={tech.name} className="w-7 h-7" />
              </div>
              <span className="text-[11px] text-foreground/70 font-medium">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ResumoSection;
