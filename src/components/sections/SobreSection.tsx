import { motion } from "framer-motion";
import { ArrowUp, CalendarDays, MapPin, Globe, BadgeCheck } from "lucide-react";
import AutomationFlow from "@/components/AutomationFlow";
import PricingCard from "@/components/PricingCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const stats = [
  { value: "5+", label: "Anos no mercado" },
  { value: "40+", label: "Projetos entregues" },
  { value: "12", label: "Clientes felizes" },
  { value: "3", label: "Países atendidos" },
];

const info = [
  { icon: CalendarDays, label: "Idade", value: "28 anos" },
  { icon: MapPin, label: "Reside em", value: "Leiria, PT" },
  { icon: Globe, label: "Nacionalidade", value: "Brasileiro" },
  { icon: BadgeCheck, label: "Status", value: "Disponível", dot: true },
];

const SobreSection = () => {
  return (
    <section id="sobre" className="scroll-mt-32 lg:scroll-mt-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card p-6 md:p-8"
      >
        <h2 className="text-2xl font-heading font-bold mb-1">Sobre Mim</h2>
        <div className="h-0.5 bg-primary/30 mb-8" />

        <motion.div custom={0} variants={fadeUp} className="space-y-4 text-foreground/85 leading-relaxed">
          <p className="font-medium text-foreground">Olá, tudo bem? 👋</p>
          <p>
            Sou um entusiasta da tecnologia, atuando como Programador &amp; Web Designer.
            Atualmente, moro em Leiria, Portugal, onde continuo a aprimorar minhas habilidades no dinâmico universo web.
          </p>
          <p>
            Trabalho também com ferramentas de Inteligência Artificial e automação — desde integração de LLMs
            (Claude API, OpenAI) a agentes com MCP (Model Context Protocol), workflows n8n e soluções com
            bases de dados vetoriais.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div custom={1} variants={fadeUp} className="grid grid-cols-2 gap-4 mt-8">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-secondary/50 px-5 py-4">
              <div className="flex items-center gap-1.5">
                <span className="text-3xl font-heading font-bold text-foreground">{s.value}</span>
                <ArrowUp className="text-primary" size={18} strokeWidth={3} />
              </div>
              <p className="text-[11px] tracking-wide uppercase text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Info grid */}
        <motion.div custom={2} variants={fadeUp} className="grid grid-cols-2 gap-4 mt-4">
          {info.map(({ icon: Icon, label, value, dot }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl bg-secondary/50 px-4 py-3.5">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Icon className="text-primary" size={18} />
              </div>
              <div>
                <p className="text-[10px] tracking-wide uppercase text-muted-foreground">{label}</p>
                <p className="font-heading font-semibold text-sm mt-0.5 flex items-center gap-1.5">
                  {dot && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  {value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* AI & Automation flow */}
        <motion.div custom={3} variants={fadeUp} className="mt-10">
          <h3 className="text-xl font-heading font-semibold mb-5">Skills em IA &amp; Automação</h3>
          <AutomationFlow />
        </motion.div>

        {/* Dynamic pricing */}
        <motion.div custom={4} variants={fadeUp} className="mt-10">
          <h3 className="text-xl font-heading font-semibold mb-5">Planos &amp; Serviços</h3>
          <PricingCard />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SobreSection;
