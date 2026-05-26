import { Home, User, Monitor, Mail } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { id: "resumo",    label: "Resumo",    icon: Home },
  { id: "sobre",     label: "Sobre",     icon: User },
  { id: "portfolio", label: "Portfólio", icon: Monitor },
  { id: "contato",   label: "Contato",   icon: Mail },
];

interface PortfolioSidebarProps {
  activeSection: string;
  onSelect: (id: string) => void;
}

const PortfolioSidebar = ({ activeSection, onSelect }: PortfolioSidebarProps) => {
  return (
    <nav className="glass-card accent-card p-3 flex-col gap-2 w-[90px] hidden lg:flex lg:sticky lg:top-10 h-fit">
      <div className="flex items-center justify-center pb-2">
        <div className="w-12 h-12 rounded-full border-2 border-primary bg-secondary overflow-hidden">
          <img src="/perfil.jpg" alt="Foto de perfil" className="w-full h-full object-cover" />
        </div>
      </div>
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => onSelect(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <item.icon size={22} />
            <span className="text-[11px] font-medium">{item.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
};

export const MobileNav = ({ activeSection, onSelect }: PortfolioSidebarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden glass-card rounded-none border-x-0 border-t-0">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <div className="w-10 h-10 rounded-full border-2 border-primary bg-secondary overflow-hidden shrink-0">
          <img src="/perfil.jpg" alt="Foto de perfil" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-heading font-semibold text-sm">Augusto Dantas</p>
          <p className="text-xs text-primary">Desenvolvedor Full Stack</p>
        </div>
      </div>
      <div className="flex justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onSelect(item.id)}
              whileTap={{ scale: 0.88 }}
              className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-lg transition-all duration-200 relative ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon size={18} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default PortfolioSidebar;
