import ModernHeroSection from "@/components/portfolio/ModernHeroSection";
import ModernAboutSection from "@/components/portfolio/ModernAboutSection";
import StatsSection from "@/components/portfolio/StatsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import EnhancedProjectsSection from "@/components/portfolio/EnhancedProjectsSection";
import GitHubSection from "@/components/portfolio/GitHubSection";
import MediumSection from "@/components/portfolio/MediumSection";
import LinkedInPostsSection from "@/components/portfolio/LinkedInPostsSection";
import EnhancedLinkedInSection from "@/components/portfolio/EnhancedLinkedInSection";
import EnhancedCredlySection from "@/components/portfolio/EnhancedCredlySection";
import ContactSection from "@/components/portfolio/ContactSection";
import ReviewsSection from "@/components/portfolio/ReviewsSection";
import FloatingNav from "@/components/ui/floating-nav";

const ModernPortfolio = () => {
  return (
    <main className="min-h-screen relative">
      <FloatingNav />
      
      <div id="hero">
        <ModernHeroSection />
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
        <EnhancedProjectsSection />
      </div>
      
      <div id="github">
        <GitHubSection />
      </div>
      
      <div id="blog">
        <MediumSection />
      </div>
      
      <LinkedInPostsSection />
      <EnhancedLinkedInSection />
      <EnhancedCredlySection />
      
      <div id="reviews">
        <ReviewsSection />
      </div>
      
      <div id="contact">
        <ContactSection />
      </div>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2025 Victor Mungai • Built with React & TypeScript
          </p>
        </div>
      </footer>
    </main>
  );
};

export default ModernPortfolio;