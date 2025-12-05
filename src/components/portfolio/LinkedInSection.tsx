import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Heart, MessageCircle, Share2 } from "lucide-react";

const LinkedInSection = () => {
  const mockPosts = [
    {
      id: 1,
      content: "Last Friday, I had the privilege of attending 𝐀 𝐃𝐚𝐲 𝐢𝐧 𝐭𝐡𝐞 𝐋𝐢𝐟𝐞: 𝐂𝐲𝐛𝐞𝐫𝐬𝐞𝐜𝐮𝐫𝐢𝐭𝐲 𝐚𝐧𝐝 𝐃𝐚𝐭𝐚 𝐏𝐫𝐢𝐯𝐚𝐜𝐲 hosted by Safaricom PLC in collaboration with SheHacks KE",
      timestamp: "2 days ago",
      likes: 30,
      comments: 0,
      shares: 8,
      url: "https://www.linkedin.com/posts/victor-mungai-_last-friday-i-had-the-privilege-of-attending-activity-7365685689696366594-YZTT?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEkZ-hUB5eSk2_LRThrvCV6NZfOe29ZaCp4"
    },
    {
      id: 2,
      content: "Wrapped up an epic Terraform learning sprint with the AWS UG AI/ML Kenya community! 🚀",
      timestamp: "1 month ago",
      likes: 89,
      comments: 23,
      shares: 12,
      url: "https://www.linkedin.com/posts/victor-mungai-_terraform-devops-awsugkenya-activity-7347895711214047233-X238?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEkZ-hUB5eSk2_LRThrvCV6NZfOe29ZaCp4"
    },
    {
      id: 3,
      content: "Had a great time at Amazon Community Day Kenya!Lots of learning, inspiration, and amazing talks — including insights from Werner Vogels Amazon CTO.",
      timestamp: "2 Months ago",
      likes: 156,
      comments: 31,
      shares: 18,
      url: "https://www.linkedin.com/posts/victor-mungai-_buildinnovateinspire-amazoncommunityday-awskenya-activity-7339752267853508608-1_hZ?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEkZ-hUB5eSk2_LRThrvCV6NZfOe29ZaCp4"
    }
  ];

  return (
    <section id="linkedin" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts and updates from my professional journey on LinkedIn
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="card-glow hover:scale-[1.02] transition-transform duration-300 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-magenta rounded-lg p-2">
                      <Linkedin className="h-full w-full text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold">Victor Mungai</CardTitle>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-foreground/90 line-clamp-4">
                  {post.content}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 px-2 text-xs hover:text-primary group-hover:bg-primary/10"
                    asChild
                  >
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      View Post
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-[#0077B5] hover:bg-[#005582] text-white font-semibold px-8 py-3 rounded-xl"
            asChild
          >
            <a href="https://www.linkedin.com/in/victor-mungai-a998942a2" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-5 w-5" />
              Follow on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LinkedInSection;