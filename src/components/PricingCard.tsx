import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";

interface Feature {
  label: string;
  novo?: boolean;
}

interface Tier {
  tab: string;
  title: string;
  price: number;
  features: Feature[];
  addons: string[];
}

const tiers: Tier[] = [
  {
    tab: "Landing",
    title: "Landing Page",
    price: 170,
    features: [
      { label: "Design responsivo" },
      { label: "SEO básico incluído" },
      { label: "Formulário de contacto" },
      { label: "Até 5 páginas" },
    ],
    addons: ["SEO Pro", "Blog completo"],
  },
  {
    tab: "Loja Online",
    title: "Loja Online",
    price: 300,
    features: [
      { label: "Tudo da Landing Page" },
      { label: "WooCommerce / Shopify" },
      { label: "Gateway de pagamento" },
      { label: "Catálogo de produtos" },
      { label: "Painel de gestão" },
    ],
    addons: ["SEO Pro", "Multi-idioma"],
  },
  {
    tab: "App / Auto.",
    title: "App / Automação",
    price: 650,
    features: [
      { label: "Tudo do Loja Online" },
      { label: "Workflow IA / n8n", novo: true },
      { label: "Integrações via MCP", novo: true },
      { label: "Painel custom", novo: true },
      { label: "Suporte prioritário", novo: true },
      { label: "Multi-idioma incluído", novo: true },
    ],
    addons: ["SEO Pro", "Blog completo", "Multi-idioma", "Integração IA"],
  },
];

const PricingCard = () => {
  const [index, setIndex] = useState(2);
  const tier = tiers[index];
  const pct = (index / (tiers.length - 1)) * 100;

  const waLink = `https://wa.me/351913821065?text=${encodeURIComponent(
    `Olá Augusto! Tenho interesse no plano ${tier.title} (a partir de €${tier.price}).`
  )}`;

  return (
    <div>
      {/* Price */}
      <div className="text-center">
        <p className="text-[11px] tracking-[0.2em] text-muted-foreground font-medium">A PARTIR DE</p>
        <div className="h-[68px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={tier.price}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.3 }}
              className="text-5xl font-heading font-bold text-primary"
              style={{ textShadow: "0 0 28px hsl(145 100% 45% / 0.4)" }}
            >
              €{tier.price}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="text-sm text-muted-foreground -mt-1">{tier.title}</p>
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
          max={tiers.length - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          aria-label="Selecionar plano"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 mt-5">
        {tiers.map((t, i) => (
          <button
            key={t.tab}
            type="button"
            onClick={() => setIndex(i)}
            className={`text-[11px] sm:text-xs font-heading font-semibold uppercase tracking-wide py-1.5 rounded-lg transition-all ${
              i === index
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.tab}
          </button>
        ))}
      </div>

      {/* Features */}
      <div className="mt-4 space-y-2">
        <AnimatePresence mode="popLayout">
          {tier.features.map((f, i) => (
            <motion.div
              key={`${tier.title}-${f.label}`}
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
              <span className="text-sm flex-1">{f.label}</span>
              {f.novo && (
                <span className="text-[10px] font-heading font-bold tracking-wide text-primary">NOVO</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add-ons */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tier.addons.map((a) => (
          <span
            key={a}
            className="text-xs px-3 py-1 rounded-full bg-secondary/60 border border-border text-muted-foreground"
          >
            + {a}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-heading font-semibold hover:brightness-110 transition-all"
        style={{ boxShadow: "0 0 22px hsl(145 100% 45% / 0.35)" }}
      >
        <MessageCircle size={16} />
        Pedir orçamento
      </a>
    </div>
  );
};

export default PricingCard;
