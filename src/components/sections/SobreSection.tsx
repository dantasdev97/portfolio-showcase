import { motion } from "framer-motion";
import { Code, Server, Globe, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const services = [
  { title: "Front End", desc: "Site moderno e pronto para dispositivos móveis que ajudará você a alcançar todo o seu marketing.", icon: Code },
  { title: "Back End", desc: "UI/UX focado no usuário; backend robusto focado em segurança e dados.", icon: Server },
  { title: "Desenvolvimento WordPress", desc: "Serviços especializados para melhorar sites de negócios com WordPress.", icon: Globe },
  { title: "E-commerce & Segurança", desc: "Soluções para lojas virtuais com foco em segurança e performance.", icon: ShieldCheck },
];

const SobreSection = () => {
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

        <motion.h3 custom={2} variants={fadeUp} className="text-xl font-heading font-semibold mt-10 mb-5">
          Meus Serviços
        </motion.h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i + 3}
              variants={fadeUp}
              whileHover={{ scale: 1.02, borderColor: "hsl(145 100% 45% / 0.4)" }}
              className="p-5 rounded-xl bg-secondary/30 border border-border transition-all group cursor-default"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                  <service.icon className="text-primary" size={18} />
                </div>
                <h4 className="font-heading font-semibold">{service.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SobreSection;
