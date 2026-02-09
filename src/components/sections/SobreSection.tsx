import { motion } from "framer-motion";

const SobreSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-8 h-full overflow-auto"
    >
      <h2 className="text-2xl font-heading font-bold mb-1">Sobre Mim</h2>
      <div className="h-0.5 bg-primary/30 mb-8" />

      <div className="space-y-5 text-muted-foreground leading-relaxed">
        <p>Olá, tudo bem?</p>
        <p>
          Sou um entusiasta da tecnologia, atuando como Programador e Web Designer.
          Atualmente, moro em Leiria, Portugal, onde continuo a aprimorar minhas
          habilidades no desenvolvimento web.
        </p>
        <p>
          Com uma formação robusta e experiência adquirida no Brasil, destaco-me por
          criar soluções inovadoras que otimizam processos e elevam a experiência do
          usuário.
        </p>
        <p>
          Sempre comprometido com a inovação e excelência, busco desafios que me
          permitam aplicar minhas habilidades em ambientes dinâmicos e colaborativos.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        {[
          { label: "Idade", value: "28" },
          { label: "Nacionalidade", value: "Brasil" },
          { label: "Residência", value: "Leiria, Portugal" },
          { label: "Freelancer", value: "Disponível" },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-sm text-muted-foreground">{item.label}:</p>
            <p className="font-medium">{item.value}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-heading font-semibold mt-10 mb-4">Meus Serviços</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { title: "Web Design", desc: "Criação de layouts modernos e responsivos." },
          { title: "Desenvolvimento", desc: "Aplicações web completas e performáticas." },
          { title: "WordPress", desc: "Sites profissionais com CMS WordPress." },
          { title: "SEO", desc: "Otimização para mecanismos de busca." },
        ].map((service) => (
          <div key={service.title} className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
            <h4 className="font-heading font-semibold text-sm mb-1">{service.title}</h4>
            <p className="text-xs text-muted-foreground">{service.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SobreSection;
