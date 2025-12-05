import PremiumHeroSection from "@/components/portfolio/PremiumHeroSection";
import ModernAboutSection from "@/components/portfolio/ModernAboutSection";
import StatsSection from "@/components/portfolio/StatsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import LinkedInPostsSection from "@/components/portfolio/LinkedInPostsSection";
import ReviewsSection from "@/components/portfolio/ReviewsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import GlassNav from "@/components/ui/glass-nav";

const PremiumPortfolio = () => {
  return (
    <main className="min-h-screen relative">
      <GlassNav />
      
      <div id="hero">
        <PremiumHeroSection />
      </div>
      
      <div id="about">
        <ModernAboutSection />
      </div>
      
      <div id="stats">
        <StatsSection />
      </div>
      
      <div id="skills">
        <SkillsSection />
      </div>
      
      <div id="projects">
        <ProjectsSection />
      </div>
      
      <LinkedInPostsSection />
      
      <div id="reviews">
        <ReviewsSection />
      </div>
      
      <div id="contact">
        <ContactSection />
      </div>
      
      {/* Footer */}
      <footer className="glass-card border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
          <p className="text-white/60">
            © 2025 Victor Mungai • Built with React & TypeScript
          </p>
        </div>
      </footer>
    </main>
  );
};

export default PremiumPortfolio;