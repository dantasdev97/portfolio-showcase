import { useState, useEffect, useMemo } from "react";
import Seo from "@/components/Seo";
import { DEFAULT_TITLE, personJsonLd } from "@/lib/seo";
import PortfolioSidebar, { MobileNav } from "@/components/PortfolioSidebar";
import ProfileCard from "@/components/ProfileCard";
import ResumoSection from "@/components/sections/ResumoSection";
import SobreSection from "@/components/sections/SobreSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContatoSection from "@/components/sections/ContatoSection";

const SECTIONS = ["resumo", "sobre", "portfolio", "contato"];

const Index = () => {
  const [activeSection, setActiveSection] = useState("resumo");

  // Track active section via IntersectionObserver on mobile
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    if (!mql.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -75% 0px", threshold: 0 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const sectionContent = useMemo(() => {
    switch (activeSection) {
      case "sobre":    return <SobreSection />;
      case "portfolio": return <PortfolioSection />;
      case "contato":  return <ContatoSection />;
      default:         return <ResumoSection />;
    }
  }, [activeSection]);

  const handleSelect = (id: string) => {
    if (window.innerWidth < 1024) {
      // Mobile: smooth scroll to section with offset for fixed nav
      const el = document.getElementById(id);
      if (el) {
        const offset = 112;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      // Desktop: switch section and scroll to top
      setActiveSection(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Seo title={DEFAULT_TITLE} path="/" jsonLd={personJsonLd} />
      <MobileNav activeSection={activeSection} onSelect={handleSelect} />

      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] px-4 pt-28 lg:pt-10 pb-12 mx-auto flex flex-col lg:grid lg:grid-cols-[90px_320px_minmax(0,700px)] lg:justify-center gap-6">
          <PortfolioSidebar activeSection={activeSection} onSelect={handleSelect} />

          <div className="lg:sticky lg:top-10">
            <ProfileCard />
          </div>

          {/* Mobile: all sections stacked, scroll-driven */}
          <div className="space-y-5 lg:hidden">
            <ResumoSection />
            <SobreSection />
            <PortfolioSection />
            <ContatoSection />
          </div>

          {/* Desktop: one section at a time, painel com altura fixa + scroll interno */}
          <div className="space-y-5 hidden lg:block content-panel">
            {sectionContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
