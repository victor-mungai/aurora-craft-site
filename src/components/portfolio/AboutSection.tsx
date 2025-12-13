import { Card } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
           I design, automate, and optimize systems — from cloud infrastructure to backend development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
            <div className="text-center lg:text-left animate-slide-up">
            <div className="relative inline-block">
              <div className="w-80 h-80 bg-card rounded-2xl shadow-lg card-glow flex items-center justify-center">
              <div className="text-muted-foreground text-center">
                {/* Replace the div below with your image */}
                <img
                src="/profile.jpeg"
                alt="Profile"
                className="w-60 h-60 rounded-full mx-auto mb-4 object-cover"
                />
              </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-blue/20 rounded-full blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-magenta/20 rounded-full blur-sm" />
            </div>
            </div>

          {/* Bio Content */}
          <div className="space-y-6 animate-slide-up delay-200">
            <Card className="p-8 card-glow">
              <h3 className="text-2xl font-semibold mb-4 text-gradient">Hello!</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I’m a passionate DevOps engineer and software developer with hands-on experience building scalable systems, 
                  automating workflows, and delivering cloud-native solutions.
                   My journey started with curiosity for how systems work and has evolved into a deep love for crafting efficient, reliable, and secure infrastructures.
                </p>
                <p>
                  I specialize in modern technologies like AWS, Docker, Kubernetes, Terraform, Ansible, and Python, always staying at the forefront of industry trends. 
                  When I’m not coding or automating, you’ll find me exploring new tools, experimenting with AI/LLMs, or sharing knowledge with the tech community.
                </p>
                <p>
                  My approach combines technical expertise with creative problem-solving to deliver solutions that not only work flawlessly but also empower teams to move faster and smarter.
                </p>
              </div>
            </Card>

            {/* Skills/Tech Stack */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Kubernetes","Linux","Ansible", "Python", "AWS", "Docker"].map((skill) => (
                <div 
                  key={skill}
                  className="bg-card border border-border rounded-lg p-3 text-center hover:border-primary transition-colors duration-200 hover:bg-card/80"
                >
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;