import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const ResumoSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-8 h-full overflow-auto"
    >
      <h2 className="text-2xl font-heading font-bold mb-1">Resumo</h2>
      <div className="h-0.5 bg-primary/30 mb-8 green-border-top" />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Experiência */}
        <div className="green-border-left pl-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <Briefcase className="text-primary" size={20} />
            </div>
            <h3 className="text-xl font-heading font-semibold">Experiência</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-primary">2022–2024</p>
              <p className="font-medium mt-1">O Novo Nível</p>
              <p className="text-sm text-muted-foreground">Portugal</p>
              <p className="text-sm text-muted-foreground mt-1">
                Soluções personalizadas para o sucesso do seu negócio.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">2020–2022</p>
              <p className="font-medium mt-1">Freelancer</p>
              <p className="text-sm text-muted-foreground">Brasil</p>
              <p className="text-sm text-muted-foreground mt-1">
                Desenvolvimento de sites e aplicações web para clientes diversos.
              </p>
            </div>
          </div>
        </div>

        {/* Cursos */}
        <div className="green-border-left pl-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <GraduationCap className="text-primary" size={20} />
            </div>
            <h3 className="text-xl font-heading font-semibold">Cursos</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-primary">2019–2020</p>
              <p className="font-medium mt-1">Análise e Desenvolvimento de Sistemas</p>
              <p className="text-sm text-muted-foreground">Barra Funda – São Paulo</p>
              <p className="text-sm text-muted-foreground mt-1">
                Soluções personalizadas para o sucesso do seu negócio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Habilidades */}
      <h3 className="text-xl font-heading font-semibold mt-10 mb-4">Habilidades</h3>
      <div className="flex flex-wrap gap-2">
        {["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "WordPress", "Figma", "Git", "Tailwind CSS"].map((skill) => (
          <span
            key={skill}
            className="px-4 py-1.5 text-sm rounded-full bg-secondary text-foreground font-medium border border-border hover:border-primary/40 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ResumoSection;
