import { Briefcase, GraduationCap, Code2, CheckCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const codingSkills = [
  { name: "SQL/PHP", pct: 80 },
  { name: "Angular / JS", pct: 95 },
  { name: "HTML / CSS", pct: 95 },
  { name: "WordPress", pct: 93 },
];

const conhecimentos = [
  "Desenvolvimento WordPress",
  "Instalação de Hospedagem",
  "Responsivo e pronto para dispositivos móveis",
  "Serviços de publicidade",
  "HTML, CSS, jQuery",
  "Marketing de mecanismos de pesquisa",
];

const CircularProgress = ({ pct, label }: { pct: number; label: string }) => {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r={r} fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-heading font-bold text-primary">
          {pct}%
        </span>
      </div>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </div>
  );
};

interface ResumoCardProps {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const ResumoCard = ({ id, title, icon: Icon, children, defaultOpen = false }: ResumoCardProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div custom={0} variants={fadeUp} className="green-border-left pl-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
            <Icon className="text-primary" size={20} />
          </div>
          <h3 className="text-xl font-heading font-semibold">{title}</h3>
        </div>
        <ChevronDown
          size={20}
          className={`text-muted-foreground transition-transform duration-300 hidden lg:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Always visible on mobile, collapsible on desktop */}
      <div className="lg:hidden">{children}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden hidden lg:block"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ResumoSection = () => {
  return (
    <section id="resumo" className="scroll-mt-32 lg:scroll-mt-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card p-6 md:p-8"
      >
        <h2 className="text-2xl font-heading font-bold mb-1">Resumo</h2>
        <div className="h-0.5 bg-primary/30 mb-8 green-border-top" />

        <div className="grid md:grid-cols-2 gap-8">
          <ResumoCard id="experiencia" title="Experiência" icon={Briefcase} defaultOpen>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-primary">2022–2024</p>
                <p className="font-medium mt-1">O Novo Nível</p>
                <p className="text-sm text-muted-foreground">Portugal</p>
                <p className="text-sm text-muted-foreground mt-1">Soluções personalizadas para o sucesso do seu negócio.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">2020–2022</p>
                <p className="font-medium mt-1">Freelancer</p>
                <p className="text-sm text-muted-foreground">Brasil</p>
                <p className="text-sm text-muted-foreground mt-1">Desenvolvimento de sites e aplicações web para clientes diversos.</p>
              </div>
            </div>
          </ResumoCard>

          <ResumoCard id="cursos" title="Cursos" icon={GraduationCap}>
            <div>
              <p className="text-sm font-semibold text-primary">2019–2020</p>
              <p className="font-medium mt-1">Análise e Desenvolvimento de Sistemas</p>
              <p className="text-sm text-muted-foreground">Barra Funda – São Paulo</p>
              <p className="text-sm text-muted-foreground mt-1">Soluções personalizadas para o sucesso do seu negócio.</p>
            </div>
          </ResumoCard>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <ResumoCard id="codificacao" title="Codificação" icon={Code2}>
            <div className="grid grid-cols-2 gap-6">
              {codingSkills.map((s) => (
                <CircularProgress key={s.name} pct={s.pct} label={s.name} />
              ))}
            </div>
          </ResumoCard>

          <ResumoCard id="conhecimentos" title="Conhecimentos" icon={CheckCircle}>
            <ul className="space-y-3">
              {conhecimentos.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </ResumoCard>
        </div>
      </motion.div>

      <TechMarquee />
    </section>
  );
};

const techItems = [
  { name: "PHP", icon: "🐘" },
  { name: "HTML5", icon: "🌐" },
  { name: "CSS3", icon: "🎨" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "📘" },
  { name: "Node.js", icon: "🟢" },
  { name: "JavaScript", icon: "⚡" },
  { name: "WordPress", icon: "📝" },
  { name: "Figma", icon: "🎯" },
  { name: "Git", icon: "🔀" },
  { name: "Tailwind", icon: "💨" },
];

const TechMarquee = () => {
  const doubled = [...techItems, ...techItems];

  return (
    <div className="glass-card mt-5 p-6 overflow-hidden">
      <h3 className="text-xl font-heading font-semibold mb-5">Tecnologias</h3>
      <div className="h-px bg-primary/20 mb-6" />
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
              <div className="w-14 h-14 rounded-xl bg-secondary/80 border border-border flex items-center justify-center text-2xl hover:border-primary/40 transition-colors">
                {tech.icon}
              </div>
              <span className="text-[11px] text-muted-foreground font-medium">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ResumoSection;
