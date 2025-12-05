import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react";
import { getS3CVUrl, fetchLinkedInProfile } from "@/services/api";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { data: profile } = useQuery({
    queryKey: ['linkedin-profile'],
    queryFn: fetchLinkedInProfile,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-neon-magenta rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Hi, I'm{" "}
            <span className="text-gradient glow-effect">
              {profile?.fullName || "Victor Mungai"}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            {profile?.headline || "A passionate DevOps Engineer & Cloud Engineer dedicated to building scalable, secure, and efficient cloud solutions."}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href="#projects" tabIndex={-1}>
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl glow-effect"
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            </a>
            <a href={getS3CVUrl('your-cv-bucket', 'victor-mungai-cv.pdf')} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
            <Button
              variant="outline"
              size="lg"
              className="group font-semibold px-8 py-3 rounded-xl border-border hover:border-primary hover:bg-primary/10"
            >
              <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Download CV
            </Button>
            </a>
            <a href="mailto:mungaivictor2781@gmail.com" tabIndex={-1}>
            <Button
              variant="outline"
              size="lg"
              className="font-semibold px-8 py-3 rounded-xl border-border hover:border-primary hover:bg-primary/10"
            >
              Get In Touch
            </Button>
            </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          <a href="https://github.com/victor-mungai" target="_blank" rel="noopener noreferrer" className="group text-muted-foreground hover:text-primary transition-all duration-300 p-3 rounded-full hover:bg-primary/10 hover:scale-110 transform">
            <Github className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          </a>
          <a href="https://www.linkedin.com/in/victor-mungai-a998942a2" target="_blank" rel="noopener noreferrer" className="group text-muted-foreground hover:text-primary transition-all duration-300 p-3 rounded-full hover:bg-primary/10 hover:scale-110 transform">
            <Linkedin className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          </a>
          <a href="mailto:mungaivictor2781@gmail.com" className="group text-muted-foreground hover:text-primary transition-all duration-300 p-3 rounded-full hover:bg-primary/10 hover:scale-110 transform">
            <Mail className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;