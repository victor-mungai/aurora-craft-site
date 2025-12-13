import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExternalLink, Calendar, BookOpen } from "lucide-react";
import { fetchMediumPosts } from "@/services/api";

const MediumSection = () => {
  const username = "mungaivictor2781";
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['medium-posts-v2', username],
    queryFn: () => fetchMediumPosts(username),
    staleTime: 0,
    refetchOnMount: true,
    retry: 2,
  });

  return (
    <section id="blog" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights and tutorials from my Medium blog
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error || !posts?.length ? (
          <div className="text-center py-12">
            <img 
              src="/medium.png" 
              alt="Medium Blog" 
              className="w-32 h-32 mx-auto mb-6 opacity-60"
            />
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              I'm working on sharing insights about DevOps, Cloud Architecture, and Infrastructure as Code. Stay tuned for technical deep-dives and best practices!
            </p>
            <Button variant="outline" asChild>
              <a href={`https://medium.com/@${username}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Medium Profile
              </a>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div key={index} className="glass-card rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
                  {/* Thumbnail - Always Medium Logo */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="/medium.png"
                      alt="Medium Blog"
                      className="w-full h-full object-contain bg-gray-900 p-8 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.pubDate).toLocaleDateString()}
                    </div>
                    
                    <p className="text-muted-foreground line-clamp-3 text-sm">
                      {post.description}
                    </p>
                    
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-medium hover:glass-card transition-all duration-300">
                      <ExternalLink className="h-4 w-4" />
                      Read Article
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <a href={`https://medium.com/@${username}`} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-5 w-5 mr-2" />
                  View All Articles
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MediumSection;