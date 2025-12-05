import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Download, MapPin, Users } from "lucide-react";
import { getS3CVUrl, fetchLinkedInProfile, optimizeImageUrl } from "@/services/api";

const ModernHeroSection = () => {
  const { data: profile } = useQuery({
    queryKey: ['linkedin-profile-v2'],
    queryFn: fetchLinkedInProfile,
    staleTime: 0,
    refetchOnMount: true,
  });

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with LinkedIn background image */}
      <div className="absolute inset-0 z-0">
        {profile?.backgroundPic ? (
          <img 
            src={optimizeImageUrl(profile.backgroundPic, 1920, 1080)} 
            alt="Background" 
            className="w-full h-full object-cover opacity-15"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-indigo-900/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/80 rounded-full animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Content */}
        <div className="text-center lg:text-left space-y-6 lg:space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Available for opportunities
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {profile?.firstName || "Victor"}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
              {profile?.headline || "DevOps Engineer & Cloud Architect building scalable, secure solutions"}
            </p>

            {profile && (
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {profile.addressWithoutCountry}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {profile.connections}+ connections
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#projects" tabIndex={-1}>
              <Button size="lg" className="group px-8 py-4 text-lg">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            
            <a href="https://vpc-s3-1.s3.us-east-1.amazonaws.com/victor-mungai-DevOps-resume.docx" download="Victor-Mungai-DevOps-Resume.docx" tabIndex={-1}>
              <Button variant="outline" size="lg" className="group px-8 py-4 text-lg">
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Download CV
              </Button>
            </a>
          </div>

          <div className="flex justify-center lg:justify-start gap-3 sm:gap-4">
            <a href="https://github.com/victor-mungai" target="_blank" rel="noopener noreferrer" 
               className="p-3 sm:p-4 rounded-full glass">
              <Github className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href={profile?.linkedinUrl || "https://www.linkedin.com/in/victor-mungai-a998942a2"} target="_blank" rel="noopener noreferrer"
               className="p-3 sm:p-4 rounded-full glass">
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="mailto:mungaivictor2781@gmail.com"
               className="p-3 sm:p-4 rounded-full glass">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
              <img
                src={optimizeImageUrl(profile?.profilePicHighQuality || profile?.profilePic, 400, 400)}
                alt={profile?.fullName || "Victor Mungai"}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            
            {/* Floating stats */}
            {profile && (
              <>
                <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 glass-card rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg">
                  <div className="text-lg sm:text-2xl font-bold text-primary">{profile.followers}</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                
                <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 glass-card rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg">
                  <div className="text-lg sm:text-2xl font-bold text-primary">{profile.experiences?.length || 0}</div>
                  <div className="text-xs text-muted-foreground">Experiences</div>
                </div>
              </>
            )}
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-primary/20 rounded-full blur-lg" />
          </div>
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

export default ModernHeroSection;