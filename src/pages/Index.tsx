import { useMemo, useState } from "react";
import PortfolioSidebar, { MobileNav } from "@/components/PortfolioSidebar";
import ProfileCard from "@/components/ProfileCard";
import ResumoSection from "@/components/sections/ResumoSection";
import SobreSection from "@/components/sections/SobreSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContatoSection from "@/components/sections/ContatoSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("resumo");

  const sectionContent = useMemo(() => {
    switch (activeSection) {
      case "sobre":
        return <SobreSection />;
      case "portfolio":
        return <PortfolioSection />;
      case "contato":
        return <ContatoSection />;
      case "resumo":
      default:
        return <ResumoSection />;
    }
  }, [activeSection]);

  const handleSelect = (id: string) => {
    setActiveSection(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen">
      <MobileNav activeSection={activeSection} onSelect={handleSelect} />

      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] px-4 pt-28 lg:pt-10 pb-12 mx-auto flex flex-col lg:grid lg:grid-cols-[90px_320px_minmax(0,700px)] lg:justify-center gap-6">
          <PortfolioSidebar activeSection={activeSection} onSelect={handleSelect} />

          <div className="lg:sticky lg:top-10">
            <ProfileCard />
          </div>

          <div className="space-y-5">
            {sectionContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;