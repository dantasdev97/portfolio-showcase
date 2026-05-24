import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Palette,
  Sparkles,
  Workflow,
  Search,
  Plug,
  Braces,
  Database,
  type LucideIcon,
} from "lucide-react";

interface Node {
  id: string;
  label: string;
  x: number; // % horizontal center
  y: number; // % vertical center
  filled?: boolean;
  icon: LucideIcon;
  name: string;
  desc: string;
}

const NODES: Node[] = [
  { id: "wp", label: "WP", x: 22, y: 15, filled: true, icon: Globe, name: "WordPress", desc: "Sites institucionais, blogs e e-commerce com WooCommerce." },
  { id: "css", label: "CSS", x: 55, y: 21, icon: Palette, name: "CSS & Tailwind", desc: "Interfaces responsivas e animadas com CSS moderno e Tailwind." },
  { id: "ia", label: "IA", x: 81, y: 32, icon: Sparkles, name: "Inteligência Artificial", desc: "Integração de LLMs — Claude API e OpenAI — em produtos reais." },
  { id: "n8n", label: "n8n", x: 43, y: 41, filled: true, icon: Workflow, name: "Automação n8n", desc: "Workflows e integrações automatizadas, sem escrever cola entre serviços." },
  { id: "seo", label: "SEO", x: 19, y: 53, icon: Search, name: "SEO", desc: "Otimização técnica e de conteúdo para ranquear no Google." },
  { id: "mcp", label: "MCP", x: 67, y: 51, icon: Plug, name: "MCP", desc: "Agentes conectados a ferramentas via Model Context Protocol." },
  { id: "js", label: "JS", x: 35, y: 70, filled: true, icon: Braces, name: "JavaScript", desc: "Aplicações dinâmicas com JavaScript, React e Next.js." },
  { id: "db", label: "DB", x: 82, y: 68, icon: Database, name: "Bases de Dados", desc: "Dados relacionais e vetoriais — Supabase e PostgreSQL." },
];

const EDGES: [string, string][] = [
  ["wp", "css"], ["css", "ia"], ["css", "n8n"], ["ia", "mcp"],
  ["n8n", "seo"], ["n8n", "mcp"], ["n8n", "js"], ["mcp", "db"], ["seo", "js"],
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

const TechConstellation = () => {
  const [activeId, setActiveId] = useState("wp");
  const active = byId(activeId);

  return (
    <div className="mt-10 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-heading font-semibold">Skills</h3>
        <span className="text-[11px] text-muted-foreground hidden sm:block">
          Toque num nó para explorar
        </span>
      </div>

      {/* Constellation canvas */}
      <div className="relative w-full max-w-[460px] mx-auto h-[340px] sm:h-[400px]">
        {/* Connector lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {EDGES.map(([a, b]) => {
            const na = byId(a);
            const nb = byId(b);
            const isActive = activeId === a || activeId === b;
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={`${na.x}%`} y1={`${na.y}%`}
                x2={`${nb.x}%`} y2={`${nb.y}%`}
                stroke="hsl(var(--primary))"
                strokeWidth={isActive ? 1.4 : 1}
                strokeOpacity={isActive ? 0.7 : 0.22}
                strokeDasharray="4 5"
                animate={{ strokeDashoffset: [0, -18] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isActive = activeId === node.id;
          const size = node.filled ? "w-16 h-16 sm:w-[72px] sm:h-[72px]" : "w-12 h-12 sm:w-14 sm:h-14";
          return (
            <motion.button
              key={node.id}
              type="button"
              onClick={() => setActiveId(node.id)}
              onMouseEnter={() => setActiveId(node.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
              whileTap={{ scale: 0.92 }}
            >
              <span
                className={`relative flex items-center justify-center rounded-full font-heading font-bold transition-all duration-300 ${size} ${
                  node.filled
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/80 text-primary border-2 border-primary/60"
                } ${isActive ? "ring-2 ring-primary ring-offset-2 ring-offset-card scale-110" : ""}`}
                style={
                  node.filled || isActive
                    ? { boxShadow: "0 0 22px hsl(145 100% 45% / 0.45)" }
                    : undefined
                }
              >
                <span className={node.filled ? "text-sm sm:text-base" : "text-xs sm:text-sm"}>
                  {node.label}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Description card */}
      <div className="mt-2 max-w-[460px] mx-auto rounded-2xl bg-secondary/40 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
              <active.icon className="text-primary" size={22} />
            </div>
            <div>
              <p className="font-heading font-semibold leading-tight">{active.name}</p>
              <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{active.desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechConstellation;
