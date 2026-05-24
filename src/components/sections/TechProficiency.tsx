import { motion } from "framer-motion";
import { Code } from "lucide-react";

interface Skill {
  name: string;
  pct: number;
}

const featured: Skill = { name: "Angular / JS", pct: 95 };
const others: Skill[] = [
  { name: "HTML / CSS", pct: 95 },
  { name: "WordPress", pct: 93 },
  { name: "SQL / PHP", pct: 80 },
  { name: "jQuery / Node", pct: 85 },
];

const Hex = ({ pct, size, big = false }: { pct: number; size: number; big?: boolean }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <div
      className="absolute inset-0"
      style={{
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        background: "linear-gradient(155deg, hsl(145 85% 55%), hsl(145 100% 36%))",
        boxShadow: "0 0 24px hsl(145 100% 45% / 0.35)",
      }}
    />
    <span
      className={`absolute inset-0 flex items-center justify-center font-heading font-bold text-white ${
        big ? "text-3xl" : "text-xl"
      }`}
    >
      {pct}%
    </span>
  </div>
);

const TechProficiency = () => {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
          <Code className="text-primary" size={20} />
        </div>
        <h3 className="text-xl font-heading font-semibold">Domínio técnico</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Featured / principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="row-span-2 flex flex-col items-center justify-center rounded-2xl bg-secondary/40 border border-primary/40 p-4"
          style={{ boxShadow: "0 0 22px hsl(145 100% 45% / 0.18)" }}
        >
          <Hex pct={featured.pct} size={150} big />
          <p className="font-heading font-semibold mt-3">{featured.name}</p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">Principal</p>
        </motion.div>

        {others.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex flex-col items-center justify-center rounded-2xl bg-secondary/40 p-4 min-h-[150px]"
          >
            <Hex pct={s.pct} size={92} />
            <p className="text-sm font-heading font-semibold mt-2.5">{s.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechProficiency;
