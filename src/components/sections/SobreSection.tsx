import { motion } from "framer-motion";
import { Code, Server, Globe, ShieldCheck, Search, Image, ShoppingCart, Database } from "lucide-react";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const aiSkills = [
  { label: "Claude AI / API" },
  { label: "MCP (Model Context Protocol)" },
  { label: "n8n Automação" },
  { label: "OpenAI API" },
  { label: "Supabase Vector DB" },
  { label: "Prompt Engineering" },
  { label: "AI Agents & Workflows" },
  { label: "LangChain" },
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
            { label: "Idade", value: "28" },
            { label: "Nacionalidade", value: "Brasil" },
            { label: "Residência", value: "Leiria, Portugal" },
            { label: "Freelancer", value: "Disponível" },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-secondary/40 border border-border">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-heading font-semibold text-sm mt-0.5">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* AI & Automation Skills */}
        <motion.div custom={2} variants={fadeUp} className="mt-10">
          <h3 className="text-xl font-heading font-semibold mb-4">
            Skills em IA &amp; Automação
          </h3>
          <div className="flex flex-wrap gap-2">
            {aiSkills.map((skill, i) => (
              <motion.span
                key={skill.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                whileHover={{ scale: 1.06, borderColor: "hsl(145 100% 45% / 0.7)" }}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/25 cursor-default transition-colors"
              >
                {skill.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Services with pricing */}
        <motion.h3 custom={3} variants={fadeUp} className="text-xl font-heading font-semibold mt-10 mb-5">
          Planos &amp; Serviços
        </motion.h3>

        <div
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i + 4}
              variants={fadeUp}
              whileHover={{ scale: 1.02, borderColor: "hsl(145 100% 45% / 0.4)" }}
              className="p-5 rounded-xl bg-secondary/30 border border-border transition-all group cursor-default flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <service.icon className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm">{service.title}</h4>
                  <p className="text-primary font-bold text-xs mt-0.5">{service.price}</p>
                </div>
              </div>
              <ul className="space-y-1.5 mt-1">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="text-primary text-[10px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <motion.a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="mt-4 text-center text-xs font-semibold py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors block"
              >
                Saber Mais
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SobreSection;
