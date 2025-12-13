import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExternalLink, Github, Star, Calendar } from "lucide-react";
import { fetchGitHubRepos } from "@/services/api";

const EnhancedProjectsSection = () => {
  const { data: githubRepos, isLoading } = useQuery({
    queryKey: ['featured-repos'],
    queryFn: () => fetchGitHubRepos('victor-mungai'),
    staleTime: 5 * 60 * 1000,
  });

  const staticProjects = [
    {
      title: "Terraform-AWS-Infrastructure-Project",
      description: "Infrastructure as Code project using Terraform to deploy a scalable web application on AWS with EC2, S3, RDS, and VPC.",
      image: null,
      tags: ["Terraform", "AWS", "Infrastructure as Code", "DevOps"],
      liveUrl: "#",
      githubUrl: "https://github.com/victor-mungai/Terraform-AWS-Infrastructure-Project",
      featured: true
    },
    {
      title: "Ansible-projects",
      description: "Automation of server configuration and application deployment using Ansible playbooks and roles for consistent environments.",
      image: null,
      tags: ["Ansible", "Automation", "Configuration Management"],
      liveUrl: "#",
      githubUrl: "https://github.com/victor-mungai/Ansible-projects",
      featured: true
    },
    {
      title: "Production-Ready CI/CD Pipeline Deployment",
      description: "End-to-end CI/CD pipeline setup using Jenkins, Docker, Sonarqube, Nexus and Slack for automated testing, building, and deployment.",
      image: null,
      tags: ["CI/CD", "Jenkins", "Docker", "Automation"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Scalable AWS Backend Infrastructure",
      description: "Designed and implemented a scalable, secure backend infrastructure using several AWS services including EC2, S3, RDS, and VPC to support a high-traffic web application.",
      image: null,
      tags: ["AWS", "Cloud Architecture", "Security"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  // Combine static projects with dynamic GitHub repos
  const dynamicProjects = githubRepos?.slice(0, 2).map(repo => ({
    title: repo.name,
    description: repo.description || 'GitHub repository showcasing my development work',
    image: null,
    tags: [repo.language, ...(repo.topics?.slice(0, 2) || [])].filter(Boolean),
    liveUrl: repo.html_url,
    githubUrl: repo.html_url,
    featured: false,
    isGithubRepo: true,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at
  })) || [];

  const allProjects = [...staticProjects, ...dynamicProjects];

  return (
    <section id="projects" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and the technologies I'm passionate about
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {allProjects.map((project, index) => (
              <Card 
                key={project.title}
                className={`card-glow group relative overflow-hidden hover:scale-105 transition-all duration-300 ${
                  project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  </div>
                )}
                
                {/* Project Image */}
                {project.image ? (
                  <div className="relative h-48 md:h-56 bg-muted overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="relative h-48 md:h-56 bg-gradient-to-br from-primary/10 to-secondary/20 overflow-hidden flex items-center justify-center">
                    <div className="text-center">
                      <Github className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">GitHub Repository</p>
                    </div>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tags and Stats */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="text-xs bg-secondary/50 hover:bg-secondary/80 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {project.isGithubRepo && (
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {project.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {project.isGithubRepo ? 'View Repo' : 'Live Demo'}
                      </a>
                    </Button>
                    {project.githubUrl !== project.liveUrl && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 hover:bg-secondary/80"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="font-semibold px-8 py-3 rounded-xl hover:bg-primary/10" asChild>
            <a href="https://github.com/victor-mungai" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 mr-2" />
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedProjectsSection;