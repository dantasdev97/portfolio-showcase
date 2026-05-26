import { motion } from "framer-motion";

// Posições estáticas das partículas (% do viewport)
const PARTICLES = [
  { x: "12%",  y: "18%", dur: 8  },
  { x: "28%",  y: "72%", dur: 11 },
  { x: "45%",  y: "38%", dur: 9  },
  { x: "62%",  y: "85%", dur: 14 },
  { x: "78%",  y: "22%", dur: 10 },
  { x: "88%",  y: "55%", dur: 13 },
  { x: "35%",  y: "92%", dur: 16 },
  { x: "72%",  y: "10%", dur: 12 },
];

const GridBackground = () => {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none">

      {/* Noise SVG filter — grain sutil */}
      <svg width="0" height="0" className="absolute">
        <filter id="portfolio-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="absolute inset-0"
        style={{
          filter: "url(#portfolio-noise)",
          opacity: 0.028,
          mixBlendMode: "overlay",
        }}
      />

      {/* Grid lines, faded toward edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.55) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.55) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 40%, black 30%, transparent 100%)",
        }}
      />

      {/* Glow 1 — large, main green, traverses diagonally */}
      <motion.div
        className="absolute w-[55vw] h-[55vw] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(145 100% 45% / 0.10), transparent 70%)" }}
        animate={{ x: ["-12vw", "55vw", "-12vw"], y: ["-8vh", "65vh", "-8vh"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glow 2 — right side counter-movement */}
      <motion.div
        className="absolute right-0 w-[45vw] h-[45vw] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(145 100% 45% / 0.07), transparent 70%)" }}
        animate={{ x: ["8vw", "-45vw", "8vw"], y: ["60vh", "-6vh", "60vh"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glow 3 — centre-top, slightly cooler teal, slow */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full left-1/2 top-0"
        style={{
          background: "radial-gradient(circle, hsl(160 70% 30% / 0.08), transparent 70%)",
          transform: "translateX(-50%)",
        }}
        animate={{ y: ["-10vh", "30vh", "-10vh"], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Partículas flutuantes */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{ left: p.x, top: p.y }}
          animate={{ y: [-6, 6], opacity: [0.15, 0.55] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.7,
          }}
        />
      ))}

      {/* Vinheta — escurece bordas para dar profundidade */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, hsl(var(--background) / 0.55) 100%)",
        }}
      />
    </div>
  );
};

export default GridBackground;
