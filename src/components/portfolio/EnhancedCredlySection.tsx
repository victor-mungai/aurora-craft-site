import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { fetchLinkedInProfile } from "@/services/api";

const EnhancedCredlySection = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['linkedin-profile'],
    queryFn: fetchLinkedInProfile,
    staleTime: 10 * 60 * 1000,
  });

  const staticCertifications = [
    {
      id: 1,
      title: "AWS Cloud Quest: Cloud Practitioner",
      issuer: "Amazon Web Services",
      dateEarned: "2025",
      credlyUrl: "https://www.credly.com/badges/c40e0e5b-bcb8-4c43-aaa8-cd850645cb18/public_url",
      description: "Practitioner-level certification demonstrating expertise in designing distributed systems on AWS",
      skills: ["Cloud Architecture", "AWS Services", "Security", "AWS Cloud Computing"],
      level: "Practitioner"
    },
    {
      id: 2,
      title: "Cisco Networking",
      issuer: "Cisco",
      dateEarned: "2025",
      credlyUrl: "https://www.credly.com/badges/8a09d450-a981-4de4-bcb0-3d5475f074c7/public_url",
      description: "Professional certification in networking concepts, protocols, and infrastructure management",
      skills: ["Networking", "Routing & Switching", "Network Security", "Infrastructure"],
      level: "Practitioner"
    },
    {
      id: 3,
      title: "OPSWAT Critical Infrastructure Protection (ICIP)",
      issuer: "OPSWAT",
      dateEarned: "2022",
      credlyUrl: "https://www.credly.com/badges/10ac8317-8b0b-48d7-a550-e248560e3690/public_url",
      description: "Certification focused on cybersecurity best practices for protecting critical infrastructure",
      skills: ["Cybersecurity", "Critical Infrastructure", "Risk Management", "Threat Mitigation"],
      level: "Fundamental"
    }
  ];

  const linkedinCertifications = profile?.licenseAndCertificates?.map((cert, index) => ({
    id: `linkedin-${index}`,
    title: cert.name,
    issuer: cert.authority,
    dateEarned: cert.startedOn?.year?.toString() || "2025",
    credlyUrl: cert.url || "#",
    description: `Professional certification from ${cert.authority}`,
    skills: [],
    level: "Professional"
  })) || [];

  const allCertifications = [...linkedinCertifications, ...staticCertifications];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Professional":
        return "bg-neon-magenta/20 text-neon-magenta border-neon-magenta/30";
      case "Associate":
        return "bg-neon-blue/20 text-neon-blue border-neon-blue/30";
      default:
        return "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30";
    }
  };

  return (
    <section id="certifications" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Certifications</span> & Badges
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional certifications from LinkedIn and industry leaders
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCertifications.map((cert, index) => (
              <Card 
                key={cert.id}
                className="card-glow group relative overflow-hidden hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Level Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={getLevelColor(cert.level)} variant="outline">
                    {cert.level}
                  </Badge>
                </div>

                <CardHeader className="text-center pb-4">
                  {/* Certificate Icon */}
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-neon-blue/20 to-neon-magenta/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors leading-tight">
                    {cert.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{cert.issuer}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3" />
                    <span>Earned {cert.dateEarned}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  {cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          className="text-xs bg-card hover:bg-secondary/80 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* View Certificate Button */}
                  <Button 
                    size="sm" 
                    className="w-full bg-primary hover:bg-primary/90 mt-4"
                    asChild
                  >
                    <a href={cert.credlyUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Certificate
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="font-semibold px-8 py-3 rounded-xl hover:bg-primary/10"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Award className="mr-2 h-5 w-5" />
              View All Badges on Credly
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCredlySection;