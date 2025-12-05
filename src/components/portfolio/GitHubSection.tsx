import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { fetchGitHubRepos, fetchGitHubProfile } from "@/services/api";

const GitHubSection = () => {
  const username = "victor-mungai";
  
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['github-profile', username],
    queryFn: () => fetchGitHubProfile(username),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: repos, isLoading: reposLoading } = useQuery({
    queryKey: ['github-repos', username],
    queryFn: () => fetchGitHubRepos(username),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const isLoading = profileLoading || reposLoading;

  return (
    <section id="github" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest repositories and contributions from my GitHub profile
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* GitHub Profile Stats */}
            {profile && (
              <div className="mb-12">
                <Card className="max-w-2xl mx-auto card-glow">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <img 
                        src={profile.avatar_url} 
                        alt={profile.name}
                        className="w-20 h-20 rounded-full border-4 border-primary/20"
                      />
                    </div>
                    <CardTitle className="text-2xl">{profile.name}</CardTitle>
                    <CardDescription className="text-lg">{profile.bio}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center gap-8 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{profile.public_repos}</div>
                        <div className="text-sm text-muted-foreground">Repositories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{profile.followers}</div>
                        <div className="text-sm text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{profile.following}</div>
                        <div className="text-sm text-muted-foreground">Following</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recent Repositories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos?.map((repo) => (
                <Card key={repo.id} className="card-glow group hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {repo.name}
                      </CardTitle>
                      <Github className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription className="line-clamp-2">
                      {repo.description || "No description available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {repo.language && (
                        <Badge variant="secondary" className="text-xs">
                          {repo.language}
                        </Badge>
                      )}
                      {repo.topics?.slice(0, 2).map((topic: string) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {repo.stargazers_count}
                        </div>
                      </div>
                      <div className="text-xs">
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </div>
                    </div>

                    <Button 
                      size="sm" 
                      className="w-full"
                      asChild
                    >
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Repository
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2" />
                  View All Repositories
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GitHubSection;