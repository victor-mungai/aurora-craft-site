import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExternalLink, Github } from "lucide-react";
import { fetchMediumPosts } from "@/services/api";
import ImageProxy from "@/components/ui/image-proxy";

const ProjectsSection = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['medium-posts'],
    queryFn: () => fetchMediumPosts('mungaivictor2781'),
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-12 flex justify-center items-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  const projects = posts.map(post => ({
    title: post.title,
    description: post.description,
    image: post.thumbnail,
    tags: ["Medium", "Article", "DevOps"],
    liveUrl: post.link,
    githubUrl: "#",
    featured: false
  }));

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Latest insights and technical articles from my Medium blog
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="glass-card card-glow group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <ImageProxy
                  src={project.image || ''}
                  alt={project.title}
                  className="group-hover:scale-110 transition-transform duration-500"
                  fallbackIcon={<ExternalLink className="h-12 w-12 text-white/40" />}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-white/60 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="text-xs glass border-white/20 text-white/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    size="sm" 
                    className="w-full glass bg-white/10 hover:bg-white/20 text-white border-0"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Article
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="glass border-white/20 text-white hover:bg-white/10 font-medium px-8 py-3 rounded-2xl"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;