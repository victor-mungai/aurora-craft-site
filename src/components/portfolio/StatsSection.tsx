import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  Code, 
  Users, 
  Award, 
  Zap,
  GitBranch,
  Cloud,
  Shield,
  Rocket
} from "lucide-react";
import { fetchStats } from "@/services/api";

const StatsSection = () => {
  const { data: apiStats = [], isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    staleTime: 10 * 60 * 1000,
  });

  const staticStats = [
    {
      icon: "Award",
      value: 2,
      suffix: "",
      label: "Years Experience",
      description: "DevOps & Cloud Engineering"
    },
    {
      icon: "Code",
      value: 50,
      suffix: "+",
      label: "Projects Completed",
      description: "Successful deployments"
    },
    {
      icon: "Cloud",
      value: 15,
      suffix: "+",
      label: "Cloud Platforms",
      description: "AWS, Azure, GCP"
    },
    {
      icon: "Rocket",
      value: 100,
      suffix: "+",
      label: "Deployments",
      description: "CI/CD pipelines"
    },
    {
      icon: "Shield",
      value: 25,
      suffix: "+",
      label: "Security Configs",
      description: "Infrastructure hardening"
    },
    {
      icon: "GitBranch",
      value: 200,
      suffix: "+",
      label: "Git Commits",
      description: "Code contributions"
    }
  ];

  const iconMap = {
    Code: <Code className="h-8 w-8" />,
    Users: <Users className="h-8 w-8" />,
    Award: <Award className="h-8 w-8" />,
    Zap: <Zap className="h-8 w-8" />,
    GitBranch: <GitBranch className="h-8 w-8" />,
    Cloud: <Cloud className="h-8 w-8" />,
    Shield: <Shield className="h-8 w-8" />,
    Rocket: <Rocket className="h-8 w-8" />
  };

  const stats = (apiStats.length > 0 ? apiStats : staticStats).map(stat => ({
    ...stat,
    icon: iconMap[stat.icon] || <Code className="h-8 w-8" />
  }));

  if (isLoading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-12 flex justify-center items-center">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Impact by <span className="text-gradient">Numbers</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Measurable results from my DevOps and cloud engineering work
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 lg:p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label} 
                className="glass-card card-glow text-center border-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full glass text-white/80">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    <AnimatedCounter 
                      end={typeof stat.icon === 'string' ? stat.value : stat.value} 
                      suffix={stat.suffix}
                      duration={2000}
                    />
                  </div>
                  <div className="font-semibold mb-1 text-white">{stat.label}</div>
                  <div className="text-sm text-white/60">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;