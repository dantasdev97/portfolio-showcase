import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

interface TimelineItem {
  period: string;
  title: string;
  place: string;
  desc: string;
  tags: string[];
}

const items: TimelineItem[] = [
  {
    period: "2022 — 2024",
    title: "O Novo Nível",
    place: "Portugal · Web Designer Full Stack",
    desc: "Soluções personalizadas para o sucesso do seu negócio.",
    tags: ["WordPress", "Angular", "SEO"],
  },
  {
    period: "2020 — 2022",
    title: "Freelancer",
    place: "Brasil · Projetos diversos",
    desc: "Desenvolvimento de sites e aplicações web para clientes diversos.",
    tags: ["HTML/CSS", "jQuery", "PHP"],
  },
  {
    period: "2019 — 2020",
    title: "Análise & Desenv. de Sistemas",
    place: "São Paulo · Formação superior",
    desc: "Foco em análise de requisitos, banco de dados e desenvolvimento web.",
    tags: ["SQL", "UML", "JS"],
  },
];

const ExperienceTimeline = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
          <CalendarDays className="text-primary" size={20} />
        </div>
        <h3 className="text-xl font-heading font-semibold">Experiência &amp; Cursos</h3>
      </div>

      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />

        <div className="space-y-8">
          {items.map((item, i) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="relative"
            >
              {/* Dot */}
              <span
                className={`absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                  i === 0
                    ? "bg-primary border-primary"
                    : "bg-card border-primary/60"
                }`}
                style={i === 0 ? { boxShadow: "0 0 12px hsl(145 100% 45% / 0.6)" } : undefined}
              />

              <span className="inline-block text-[11px] font-heading font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/25 mb-2">
                {item.period}
              </span>
              <p className="font-heading font-semibold">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.place}</p>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/70 border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
