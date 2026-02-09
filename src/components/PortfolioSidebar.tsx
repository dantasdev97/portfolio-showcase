import { Home, User, Monitor, BookOpen, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface PortfolioSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "resumo", label: "Resumo", icon: Home },
  { id: "sobre", label: "Sobre", icon: User },
  { id: "portfolio", label: "Portfólio", icon: Monitor },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "contato", label: "Contato", icon: Mail },
];

const PortfolioSidebar = ({ activeSection, onSectionChange }: PortfolioSidebarProps) => {
  return (
    <motion.nav
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-3 flex flex-col gap-1 w-[90px] shrink-0"
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <item.icon size={22} />
            <span className="text-[11px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </motion.nav>
  );
};

export default PortfolioSidebar;
