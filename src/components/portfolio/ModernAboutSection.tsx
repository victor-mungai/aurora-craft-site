import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchLinkedInProfile, optimizeImageUrl } from "@/services/api";
import { MapPin, Calendar, Award, Users, Building, Briefcase } from "lucide-react";

const ModernAboutSection = () => {
  const { data: profile } = useQuery({
    queryKey: ['linkedin-profile'],
    queryFn: fetchLinkedInProfile,
    staleTime: 10 * 60 * 1000,
  });

  const currentJob = profile?.experiences?.[0];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate about building scalable systems and automating workflows
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 h-fit sticky top-8">
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <img
                    src={optimizeImageUrl(profile?.profilePicHighQuality || profile?.profilePic, 200, 200)}
                    alt={profile?.fullName || "Profile"}
                    className="w-32 h-32 rounded-2xl object-cover mx-auto"
                  />
                  {profile?.isPremium && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-white p-1 rounded-full">
                      <Award className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold">{profile?.fullName || "Victor Mungai"}</h3>
                  <p className="text-muted-foreground">{profile?.headline}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {profile?.addressWithCountry || "Nairobi, Kenya"}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {profile?.connections || 1000}+ connections
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="h-4 w-4" />
                    {profile?.licenseAndCertificates?.length || 0} certifications
                  </div>
                </div>

                {/* Current Job */}
                {currentJob && (
                  <Card className="p-4 bg-primary/5">
                    <div className="flex items-start gap-3">
                      {currentJob.logo && (
                        <img src={currentJob.logo} alt="Company" className="w-10 h-10 rounded" />
                      )}
                      <div className="text-left">
                        <div className="font-medium text-sm">{currentJob.title}</div>
                        <div className="text-xs text-muted-foreground">{currentJob.companyName}</div>
                        <div className="text-xs text-muted-foreground">{currentJob.currentJobDuration}</div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                My Story
              </h3>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  {profile?.about || "I'm a passionate DevOps engineer and software developer with hands-on experience building scalable systems, automating workflows, and delivering cloud-native solutions. My journey started with curiosity for how systems work and has evolved into a deep love for crafting efficient, reliable, and secure infrastructures."}
                </p>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Core Skills
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {(profile?.skills?.slice(0, 12).map(skill => skill.title) || 
                  ["DevOps", "AWS", "Kubernetes", "Docker", "Terraform", "Ansible", "Python", "CI/CD", "Linux", "Jenkins", "Monitoring", "Security"]
                ).map((skill) => (
                  <Badge 
                    key={skill}
                    variant="secondary"
                    className="justify-center py-2 hover:bg-primary/10 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Experience Timeline */}
            {profile?.experiences && profile.experiences.length > 0 && (
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Building className="h-6 w-6 text-primary" />
                  Experience
                </h3>
                <div className="space-y-6">
                  {profile.experiences.slice(0, 3).map((exp, index) => (
                    <div key={index} className="flex gap-4 pb-6 border-b border-border last:border-0">
                      {exp.logo && (
                        <img src={exp.logo} alt="Company" className="w-12 h-12 rounded flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold">{exp.title}</h4>
                        <p className="text-primary font-medium">{exp.companyName}</p>
                        <p className="text-sm text-muted-foreground">
                          {exp.jobLocation} • {exp.employmentType}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exp.jobStartedOn} - {exp.jobStillWorking ? 'Present' : exp.jobEndedOn}
                        </p>
                        {exp.jobDescription && (
                          <p className="text-sm mt-2 text-muted-foreground">{exp.jobDescription}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAboutSection;