import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { fetchLinkedInProfile, fetchSkills } from "@/services/api";
import { 
  Cloud, 
  Server, 
  Database, 
  Code, 
  Shield, 
  GitBranch,
  Container,
  Settings,
  Monitor,
  Zap
} from "lucide-react";

const SkillsSection = () => {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['linkedin-profile'],
    queryFn: fetchLinkedInProfile,
    staleTime: 10 * 60 * 1000,
  });

  const { data: skillsData, isLoading: skillsLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
    staleTime: 10 * 60 * 1000,
  });

  const isLoading = profileLoading || skillsLoading;

  const iconMap = {
    Cloud: <Cloud className="h-6 w-6" />,
    Settings: <Settings className="h-6 w-6" />,
    Code: <Code className="h-6 w-6" />,
    Shield: <Shield className="h-6 w-6" />
  };

  const staticSkillCategories = [
    {
      title: "Cloud Platforms",
      icon: "Cloud",
      skills: [
        { name: "AWS", level: 90, color: "bg-orange-500" }
      ]
    }
  ];

  const linkedinSkills = profile?.skills?.slice(0, 16).map(skill => skill.title) || [];
  
  const apiSkillCategories = skillsData?.skillCategories || staticSkillCategories;
  const skillCategories = apiSkillCategories.map(category => ({
    ...category,
    icon: iconMap[category.icon] || <Code className="h-6 w-6" />,
    skills: category.skills.map(skill => ({
      ...skill,
      // Boost level if skill is in LinkedIn profile
      level: linkedinSkills.includes(skill.name) ? Math.min(skill.level + 10, 100) : skill.level
    }))
  }));

  const certifications = profile?.licenseAndCertificates?.map(cert => cert.name) || 
    skillsData?.certifications || [
      "AWS Certified Solutions Architect",
      "AWS Certified DevOps Engineer",
      "Kubernetes Administrator (CKA)",
      "Docker Certified Associate",
      "Terraform Associate"
    ];

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to build scalable, secure solutions
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 mb-16">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              {/* LinkedIn Skills */}
              {linkedinSkills.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-2xl font-bold mb-8 text-center text-white">LinkedIn Skills</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {linkedinSkills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="px-4 py-2 text-sm glass border-white/20 text-white/80 hover:bg-white/10 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {skillCategories.map((category, index) => (
              <Card key={category.title} className="glass-card card-glow border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl text-white">
                    <div className="p-2 rounded-lg glass text-white/80">
                      {category.icon}
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{skill.name}</span>
                        <span className="text-sm text-white/60">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2 glass"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Certifications */}
        <div className="glass-card rounded-3xl p-8 text-center mb-16">
          <h3 className="text-2xl font-bold mb-8 text-white">Certifications & Achievements</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <Badge 
                key={cert} 
                variant="outline" 
                className="px-4 py-2 text-sm glass border-white/20 text-white/80 hover:bg-white/10 transition-colors"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="glass-card rounded-3xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(skillsData?.quickStats || [
              { label: "Years Experience", value: "5+", description: "Years Experience" },
              { label: "Projects Completed", value: "50+", description: "Projects Completed" },
              { label: "Technologies Mastered", value: "10+", description: "Technologies Mastered" },
              { label: "Uptime Achieved", value: "99%", description: "Uptime Achieved" }
            ]).map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;