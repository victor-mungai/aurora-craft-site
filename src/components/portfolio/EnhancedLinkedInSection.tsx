import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExternalLink, Linkedin, MapPin, Users, Award, Building, Star, Calendar } from "lucide-react";
import { fetchLinkedInProfile } from "@/services/api";

const EnhancedLinkedInSection = () => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['linkedin-profile'],
    queryFn: fetchLinkedInProfile,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  return (
    <section id="linkedin" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Network</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Live data from my LinkedIn profile
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error || !profile ? (
          <div className="max-w-4xl mx-auto text-center py-12">
            <Linkedin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unable to load LinkedIn data</h3>
            <p className="text-muted-foreground mb-6">Visit my LinkedIn profile directly</p>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <a href="https://www.linkedin.com/in/victor-mungai-a998942a2" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 mr-2" />
                Visit LinkedIn Profile
              </a>
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Card */}
            <Card className="card-glow overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-800">
                {profile.backgroundPic && (
                  <img src={profile.backgroundPic} alt="Background" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80" />
              </div>
              
              <CardContent className="relative -mt-16 pb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="relative">
                    <img 
                      src={profile.profilePic || profile.profilePicHighQuality} 
                      alt={profile.fullName}
                      className="w-32 h-32 rounded-full border-4 border-card object-cover"
                    />
                    {profile.isPremium && (
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-white p-1 rounded-full">
                        <Star className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{profile.fullName}</h3>
                      <p className="text-lg text-muted-foreground mb-3">{profile.headline}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {profile.addressWithCountry}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {profile.connections} connections
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {profile.followers} followers
                        </div>
                      </div>
                    </div>
                    
                    {profile.about && (
                      <p className="text-sm text-muted-foreground line-clamp-3">{profile.about}</p>
                    )}
                    
                    <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                      <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        Connect on LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Job */}
            {profile.experiences?.[0] && (
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Current Position
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    {profile.experiences[0].logo && (
                      <img src={profile.experiences[0].logo} alt="Company" className="w-12 h-12 rounded" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold">{profile.experiences[0].title}</h4>
                      <p className="text-muted-foreground">{profile.experiences[0].companyName}</p>
                      <p className="text-sm text-muted-foreground">
                        {profile.experiences[0].jobLocation} • {profile.experiences[0].employmentType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {profile.experiences[0].jobStartedOn} - {profile.experiences[0].jobStillWorking ? 'Present' : profile.experiences[0].jobEndedOn}
                      </p>
                      {profile.experiences[0].jobDescription && (
                        <p className="text-sm mt-2">{profile.experiences[0].jobDescription}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {profile.skills?.length > 0 && (
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.slice(0, 12).map((skill: any, index: number) => (
                      <Badge key={index} variant="secondary">{skill.title}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {profile.licenseAndCertificates?.length > 0 && (
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Recent Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profile.licenseAndCertificates.slice(0, 3).map((cert: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.authority}</p>
                          <p className="text-xs text-muted-foreground">
                            {cert.startedOn?.month}/{cert.startedOn?.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EnhancedLinkedInSection;