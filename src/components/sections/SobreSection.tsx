import { motion } from "framer-motion";
import { Globe, ShieldCheck, Search, Image, ShoppingCart, Database } from "lucide-react";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const aiSkills = [
  "Claude AI / API",
  "MCP (Model Context Protocol)",
  "n8n Automação",
  "OpenAI API",
  "Supabase Vector DB",
  "Prompt Engineering",
  "AI Agents & Workflows",
  "LangChain",
];

const services = [
  {
    title: "Landing Page",
    price: "A partir de €170",
    icon: Globe,
    items: ["Design responsivo", "SEO básico incluído", "Formulário de contacto", "Até 5 páginas"],
  },
  {
    title: "Loja Online",
    price: "A partir de €300",
    icon: ShoppingCart,
    items: ["WooCommerce / Shopify", "Gateway de pagamento", "Catálogo de produtos", "Painel de gestão"],
  },
  {
    title: "Segurança",
    price: "A combinar",
    icon: ShieldCheck,
    items: ["Certificado SSL", "Firewall WAF", "Backups automáticos", "Monitorização 24/7"],
  },
  {
    title: "SEO",
    price: "A combinar",
    icon: Search,
    items: ["Pesquisa de palavras-chave", "Otimização on-page", "Google Analytics", "Relatórios mensais"],
  },
  {
    title: "Edição de Imagem",
    price: "A combinar",
    icon: Image,
    items: ["Fotos de produto", "Banners e capas", "Social media kit", "Retoque profissional"],
  },
  {
    title: "Base de Dados",
    price: "A combinar",
    icon: Database,
    items: ["Design de esquema", "API REST", "Backups automáticos", "Documentação técnica"],
  },
];

const SobreSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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

        <motion.div custom={0} variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Olá, tudo bem?</p>
          <p>
            Sou um entusiasta da tecnologia, atuando como Programador e Web Designer.
            Atualmente, moro em Leiria, Portugal, onde continuo a aprimorar minhas habilidades no desenvolvimento web.
          </p>
          <p>
            Com uma formação robusta e experiência adquirida no Brasil, destaco-me por criar soluções inovadoras que
            otimizam processos e elevam a experiência do usuário.
          </p>
          <p>
            Trabalho também com ferramentas de Inteligência Artificial e automação — desde integração de LLMs
            (Claude API, OpenAI) a agentes com MCP (Model Context Protocol), workflows n8n e soluções com
            bases de dados vetoriais.
          </p>
          <p>
            Sempre comprometido com a inovação e excelência, busco desafios que me permitam aplicar minhas habilidades
            em ambientes dinâmicos e colaborativos.
          </p>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: "Idade",        value: "28" },
            { label: "Nacionalidade", value: "Brasil" },
            { label: "Residência",   value: "Leiria, Portugal" },
            { label: "Freelancer",   value: "Disponível" },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-secondary/40 border border-border">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-heading font-semibold text-sm mt-0.5">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* AI & Automation Skills */}
        <motion.div custom={2} variants={fadeUp} className="mt-10">
          <h3 className="text-xl font-heading font-semibold mb-4">Skills em IA &amp; Automação</h3>
          <div className="flex flex-wrap gap-2">
            {aiSkills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                whileHover={{ scale: 1.06 }}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/25 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Services — horizontal scroll with gradient fade */}
        <motion.h3 custom={3} variants={fadeUp} className="text-xl font-heading font-semibold mt-10 mb-5">
          Planos &amp; Serviços
        </motion.h3>

        <div className="relative">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-3 w-10 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(var(--card)), transparent)" }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-3 w-10 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, hsl(var(--card)), transparent)" }}
          />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-3 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i + 4}
                variants={fadeUp}
                whileHover={{ scale: 1.03, borderColor: "hsl(145 100% 45% / 0.45)" }}
                className="shrink-0 snap-start min-w-[210px] sm:min-w-[230px] p-5 rounded-2xl border border-border bg-secondary/30 transition-all flex flex-col gap-3"
              >
                {/* Icon + title row */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <service.icon className="text-primary" size={20} />
                  </div>
                  <h4 className="font-heading font-semibold text-sm leading-tight">{service.title}</h4>
                </div>

                {/* Divider */}
                <div className="h-px bg-primary/20" />

                {/* Price */}
                <p className="text-primary font-bold text-base font-heading">{service.price}</p>

                {/* Feature list */}
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground leading-snug">
                      <span className="text-primary shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SobreSection;
