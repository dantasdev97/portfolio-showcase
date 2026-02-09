import { useState } from "react";
import PortfolioSidebar from "@/components/PortfolioSidebar";
import ProfileCard from "@/components/ProfileCard";
import ResumoSection from "@/components/sections/ResumoSection";
import SobreSection from "@/components/sections/SobreSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import BlogSection from "@/components/sections/BlogSection";
import ContatoSection from "@/components/sections/ContatoSection";

const sections: Record<string, React.FC> = {
  resumo: ResumoSection,
  sobre: SobreSection,
  portfolio: PortfolioSection,
  blog: BlogSection,
  contato: ContatoSection,
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("resumo");
  const ActiveComponent = sections[activeSection];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="flex gap-5 w-full max-w-[1200px] min-h-[600px] max-h-[85vh]">
        {/* Sidebar */}
        <div className="hidden md:block">
          <PortfolioSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>

        {/* Profile Card */}
        <div className="hidden lg:block">
          <ProfileCard />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <ActiveComponent />
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden glass-card rounded-none border-x-0 border-b-0 px-2 py-2 flex justify-around z-50">
        {[
          { id: "resumo", label: "Resumo" },
          { id: "sobre", label: "Sobre" },
          { id: "portfolio", label: "Portfólio" },
          { id: "blog", label: "Blog" },
          { id: "contato", label: "Contato" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`text-[11px] py-2 px-3 rounded-md font-medium transition-colors ${
              activeSection === item.id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;
