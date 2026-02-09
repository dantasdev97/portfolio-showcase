import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  { title: "Como criar um portfólio profissional", date: "Jan 2024", excerpt: "Dicas essenciais para montar um portfólio que impressiona recrutadores." },
  { title: "React vs Next.js: Qual escolher?", date: "Dez 2023", excerpt: "Comparação entre as duas ferramentas mais populares do ecossistema React." },
  { title: "Design responsivo em 2024", date: "Nov 2023", excerpt: "Tendências e boas práticas para criar interfaces adaptáveis." },
];

const BlogSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-8 h-full overflow-auto"
    >
      <h2 className="text-2xl font-heading font-bold mb-1">Blog</h2>
      <div className="h-0.5 bg-primary/30 mb-8" />

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.title}
            className="p-5 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-all cursor-pointer group"
          >
            <p className="text-xs text-primary font-medium mb-2">{post.date}</p>
            <h3 className="font-heading font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>
            <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
              Ler mais <ArrowRight size={12} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogSection;
