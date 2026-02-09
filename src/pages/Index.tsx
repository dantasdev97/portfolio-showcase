import PortfolioSidebar, { MobileNav, useActiveSection } from "@/components/PortfolioSidebar";
import ProfileCard from "@/components/ProfileCard";
import ResumoSection from "@/components/sections/ResumoSection";
import SobreSection from "@/components/sections/SobreSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContatoSection from "@/components/sections/ContatoSection";

const Index = () => {
  const activeSection = useActiveSection();

  return (
    <div className="min-h-screen">
      <PortfolioSidebar activeSection={activeSection} />
      <MobileNav activeSection={activeSection} />

      <div className="flex justify-center">
        <div className="hidden lg:block fixed left-[130px] top-1/2 -translate-y-1/2 z-40">
          <ProfileCard />
        </div>

        <main className="w-full max-w-[700px] space-y-5 pt-32 lg:pt-8 pb-12 px-4 lg:ml-[480px]">
          <div className="lg:hidden">
            <ProfileCard />
          </div>

          <ResumoSection />
          <SobreSection />
          <PortfolioSection />
          <ContatoSection />
        </main>
      </div>
    </div>
  );
};

export default Index;
