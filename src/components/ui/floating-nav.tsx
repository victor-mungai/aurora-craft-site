import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home, 
  User, 
  Code, 
  Github, 
  BookOpen, 
  Mail,
  Award,
  BarChart3,
  Star
} from "lucide-react";

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Home", icon: <Home className="h-4 w-4" /> },
    { id: "about", label: "About", icon: <User className="h-4 w-4" /> },
    { id: "stats", label: "Stats", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "skills", label: "Skills", icon: <Award className="h-4 w-4" /> },
    { id: "projects", label: "Projects", icon: <Code className="h-4 w-4" /> },
    { id: "github", label: "GitHub", icon: <Github className="h-4 w-4" /> },
    { id: "blog", label: "Blog", icon: <BookOpen className="h-4 w-4" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="h-4 w-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Floating Nav */}
      <nav className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="glass-card rounded-full p-2 shadow-lg">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "w-12 h-12 rounded-full p-0 transition-all duration-300",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-white/60"
                )}
                onClick={() => scrollToSection(item.id)}
                title={item.label}
              >
                {item.icon}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Sidebar */}
      <nav className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 lg:hidden">
        <div className="glass-card rounded-2xl p-3">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "w-10 h-10 rounded-xl p-0 transition-all duration-300",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-white/60"
                )}
                onClick={() => scrollToSection(item.id)}
                title={item.label}
              >
                {item.icon}
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default FloatingNav;