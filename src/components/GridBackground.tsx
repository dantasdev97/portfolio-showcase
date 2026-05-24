import { motion } from "framer-motion";

// Animated grid + drifting green glows. Fixed behind all content, desktop + mobile.
const GridBackground = () => {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none">
      {/* Grid lines, faded toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 35%, transparent 100%)",
        }}
      />

      {/* Drifting glows */}
      <motion.div
        className="absolute w-[55vw] h-[55vw] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(145 100% 45% / 0.10), transparent 70%)" }}
        animate={{ x: ["-12vw", "55vw", "-12vw"], y: ["-8vh", "65vh", "-8vh"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 w-[45vw] h-[45vw] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(145 100% 45% / 0.07), transparent 70%)" }}
        animate={{ x: ["8vw", "-45vw", "8vw"], y: ["60vh", "-6vh", "60vh"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default GridBackground;
