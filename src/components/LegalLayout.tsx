import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";

interface LegalLayoutProps {
  title: string;
  description: string;
  path: string;
  lastUpdated: string;
  children: ReactNode;
}

const LegalLayout = ({ title, description, path, lastUpdated, children }: LegalLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto min-h-screen max-w-[800px] px-4 py-8">
      <Seo title={`${title} | Augusto Dantas`} description={description} path={path} />

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft size={18} />
        Voltar
      </motion.button>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-6 md:p-10"
      >
        <h1 className="text-3xl font-heading font-bold md:text-4xl">{title}</h1>
        <div className="mt-4 h-0.5 w-16 bg-primary/40" />
        <p className="mt-4 text-sm text-muted-foreground">
          Última atualização: {lastUpdated}
        </p>

        <div className="legal-content mt-8 space-y-8">{children}</div>
      </motion.article>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const LegalSection = ({ title, children }: SectionProps) => (
  <section className="space-y-3">
    <h2 className="text-xl font-heading font-semibold text-foreground">{title}</h2>
    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline">
      {children}
    </div>
  </section>
);

export default LegalLayout;
