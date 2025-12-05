import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExternalLink, Heart, MessageCircle, Share2 } from "lucide-react";
import { fetchLinkedInPosts } from "@/services/api";
import ImageProxy from "@/components/ui/image-proxy";

const LinkedInPostsSection = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['linkedin-posts'],
    queryFn: () => fetchLinkedInPosts(),
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest <span className="text-gradient">Posts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recent thoughts and updates from my professional journey
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 6).map((post) => (
            <a 
              key={post.id} 
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="glass-card card-glow group border-0 cursor-pointer hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs glass border-white/20 text-white/60">
                    {post.timeSincePosted}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Images */}
                {post.images && post.images.length > 0 && (
                  <div className={`grid gap-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {post.images.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative aspect-video overflow-hidden rounded-xl">
                        <ImageProxy
                          src={image}
                          alt={`Post image ${index + 1}`}
                          className="hover:scale-105 transition-all duration-500 rounded-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Text Content */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {post.text}
                  </p>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.numLikes || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.numComments || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="h-4 w-4" />
                      <span>{post.numShares || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://www.linkedin.com/in/victor-mungai-/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border-0"
          >
            View All Posts
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LinkedInPostsSection;