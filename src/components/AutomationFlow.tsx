import { motion } from "framer-motion";

const Node = ({ label, accent = false }: { label: string; accent?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    whileHover={{ scale: 1.04 }}
    className={`rounded-xl px-4 py-3 text-center text-sm font-medium transition-colors ${
      accent
        ? "border border-primary/50 bg-primary/10 text-primary"
        : "border border-border bg-secondary/30 text-foreground/75 hover:border-primary/40"
    }`}
  >
    {label}
  </motion.div>
);

const Connector = ({ variant }: { variant: "split" | "converge" }) => {
  const paths =
    variant === "split"
      ? ["M50 0 C 50 14, 25 10, 25 24", "M50 0 C 50 14, 75 10, 75 24"]
      : ["M25 0 C 25 14, 50 10, 50 24", "M75 0 C 75 14, 50 10, 50 24"];

  return (
    <svg
      className="w-full h-9"
      viewBox="0 0 100 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.8"
          strokeOpacity="0.55"
          strokeDasharray="3 4"
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
};

const AutomationFlow = () => {
  return (
    <div>
      <div className="mx-auto max-w-[460px]">
        {/* Prompt Engineering */}
        <div className="flex justify-center">
          <div className="w-2/3">
            <Node label="Prompt Engineering" accent />
          </div>
        </div>

        <Connector variant="split" />

        {/* Claude / OpenAI */}
        <div className="grid grid-cols-2 gap-4">
          <Node label="Claude API" />
          <Node label="OpenAI API" />
        </div>

        <Connector variant="converge" />

        {/* MCP Server */}
        <div className="flex justify-center">
          <div className="w-2/3">
            <Node label="MCP Server" accent />
          </div>
        </div>

        <Connector variant="split" />

        {/* n8n / Supabase */}
        <div className="grid grid-cols-2 gap-4">
          <Node label="n8n Workflows" />
          <Node label="Supabase Vector" />
        </div>

        <Connector variant="converge" />

        {/* AI Agents */}
        <div className="flex justify-center">
          <div className="w-2/3">
            <Node label="AI Agents" accent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationFlow;
