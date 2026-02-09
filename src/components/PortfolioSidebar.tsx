import { useEffect, useState, useCallback } from "react";
import { Home, User, Monitor, Mail } from "lucide-react";

const navItems = [
  { id: "resumo", label: "Resumo", icon: Home },
  { id: "sobre", label: "Sobre", icon: User },
  { id: "portfolio", label: "Portfólio", icon: Monitor },
  { id: "contato", label: "Contato", icon: Mail },
];

interface PortfolioSidebarProps {
  activeSection: string;
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const useActiveSection = () => {
  const [active, setActive] = useState("resumo");

  const handleScroll = useCallback(() => {
    const sections = navItems.map((n) => document.getElementById(n.id));
    const scrollY = window.scrollY + 200;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = sections[i];
      if (el && el.offsetTop <= scrollY) {
        setActive(navItems[i].id);
        return;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return active;
};

const PortfolioSidebar = ({ activeSection }: PortfolioSidebarProps) => {
  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 glass-card p-3 flex-col gap-1 w-[90px] hidden lg:flex">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
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
    </nav>
  );
};

export const MobileNav = ({ activeSection }: PortfolioSidebarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden glass-card rounded-none border-x-0 border-t-0">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <div className="w-10 h-10 rounded-full border-2 border-primary bg-secondary flex items-center justify-center shrink-0">
          <span className="text-xs font-heading font-bold text-primary">AD</span>
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
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-md transition-all ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon size={18} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default PortfolioSidebar;
