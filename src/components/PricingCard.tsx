import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, FileText } from "lucide-react";
import planosDataFallback from "@/data/planos.json";
import OrcamentoModal from "@/components/OrcamentoModal";

interface PlanoAddon {
  text: string;
  preco?: number;
}

interface Plano {
  key: string;
  name: string;
  preco_base: number;
  descricao: string;
  features: { text: string; novo?: boolean }[];
  addons: PlanoAddon[];
  ordem: number;
}

// Tab label mapping (short names for the tab bar)
const TAB_LABELS: Record<string, string> = {
  landing: "Landing",
  loja: "Loja Online",
  app: "App / Auto.",
};

const FALLBACK: Plano[] = [...(planosDataFallback as Plano[])].sort((a, b) => a.ordem - b.ordem);

const PricingCard = () => {
  const [planos, setPlanos] = useState<Plano[]>(FALLBACK);
  const [index, setIndex] = useState(FALLBACK.length - 1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Busca preços actualizados em runtime (sem depender de rebuild do Vercel)
  useEffect(() => {
    fetch("/api/planos")
      .then((r) => r.json())
      .then((data: Plano[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => a.ordem - b.ordem);
          setPlanos(sorted);
          setIndex(sorted.length - 1);
        }
      })
      .catch(() => {/* silently use fallback */});
  }, []);

  // Reset selected addons when plan changes
  function selectPlan(i: number) {
    setIndex(i);
    setSelectedAddons([]);
  }

  function toggleAddon(text: string) {
    setSelectedAddons((prev) =>
      prev.includes(text) ? prev.filter((a) => a !== text) : [...prev, text]
    );
  }

  const plano = planos[index];
  const pct = planos.length > 1 ? (index / (planos.length - 1)) * 100 : 100;

  if (!plano) return null;

  return (
    <>
      {/* Price */}
      <div className="text-center">
        <p className="text-[11px] tracking-[0.2em] text-muted-foreground font-medium">A PARTIR DE</p>
        <div className="h-[68px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={plano.preco_base}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.3 }}
              className="text-5xl font-heading font-bold text-primary"
              style={{ textShadow: "0 0 28px hsl(145 100% 45% / 0.4)" }}
            >
              €{plano.preco_base}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="text-sm text-muted-foreground -mt-1">{plano.name}</p>
      </div>

      {/* Slider */}
      <div className="relative mt-6 h-3 rounded-full bg-secondary">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 w-6 h-6 -translate-y-1/2 -translate-x-1/2 rounded-full bg-card border-2 border-primary transition-all duration-300"
          style={{ left: `${pct}%`, boxShadow: "0 0 14px hsl(145 100% 45% / 0.5)" }}
        />
        <input
          type="range"
          min={0}
          max={planos.length - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          aria-label="Selecionar plano"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Tabs */}
      <div className={`grid gap-2 mt-5`} style={{ gridTemplateColumns: `repeat(${planos.length}, 1fr)` }}>
        {planos.map((p, i) => (
          <button
            key={p.key}
            type="button"
            onClick={() => selectPlan(i)}
            className={`text-[11px] sm:text-xs font-heading font-semibold uppercase tracking-wide py-1.5 rounded-lg transition-all ${
              i === index
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {TAB_LABELS[p.key] ?? p.name}
          </button>
        ))}
      </div>

      {/* Features */}
      <div className="mt-4 space-y-2">
        <AnimatePresence mode="popLayout">
          {plano.features.map((f, i) => (
            <motion.div
              key={`${plano.key}-${f.text}`}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              className="flex items-center gap-3 rounded-lg bg-secondary/40 border border-border px-3 py-2.5"
            >
              <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Check className="text-primary-foreground" size={13} strokeWidth={3} />
              </span>
              <span className="text-sm flex-1">{f.text}</span>
              {f.novo && (
                <span className="text-[10px] font-heading font-bold tracking-wide text-primary">NOVO</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add-ons */}
      {plano.addons.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">
            Extras opcionais — clica para selecionar
          </p>
          <div className="flex flex-wrap gap-2">
            {plano.addons.map((a) => {
              const active = selectedAddons.includes(a.text);
              return (
                <button
                  key={a.text}
                  type="button"
                  onClick={() => toggleAddon(a.text)}
                  className={`text-xs px-3 py-1.5 rounded-full border flex items-center gap-1 transition-all duration-150 ${
                    active
                      ? "bg-primary/20 border-primary text-primary font-semibold"
                      : "bg-secondary/60 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {active ? "✓" : "+"} {a.text}
                  {a.preco != null && a.preco > 0 && (
                    <span className={`ml-1 font-semibold ${active ? "text-primary" : "text-muted-foreground"}`}>
                      €{a.preco}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {selectedAddons.length > 0 && (
            <p className="text-[11px] text-primary mt-2">
              {selectedAddons.length} addon{selectedAddons.length > 1 ? "s" : ""} selecionado{selectedAddons.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-heading font-semibold hover:brightness-110 transition-all"
        style={{ boxShadow: "0 0 22px hsl(145 100% 45% / 0.35)" }}
      >
        <FileText size={16} />
        Orçamento
      </button>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <OrcamentoModal
            planos={planos}
            defaultPlanoKey={plano.key}
            defaultAddons={selectedAddons}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PricingCard;
